#!/usr/bin/env node
// Drives a verification run's site in headless Chrome over the DevTools protocol, with real
// wheel, mouse and keyboard input. No dependencies: Node 22+ ships WebSocket.
//
//   node drive.mjs --run <id> --name <label> [options] -- <step> [<step> ...]
//
// Options:
//   --viewport WxH      default 1440x900
//   --mobile            390x844 at 3x with touch and a mobile user agent
//   --dpr N             device pixel ratio (default 1, or 3 with --mobile)
//   --reduced-motion    emulate prefers-reduced-motion: reduce before the first load
//   --allow-errors      record page errors without failing the run
//
// Steps (verb:arg, split on the first colon):
//   goto:<path>          load a path on the run's server and wait for load and fonts
//   wait:<ms>            pause
//   waitfor:<js>         poll a page expression until truthy (5s timeout)
//   wheel:<dy>           one mouse-wheel scroll by dy pixels at the viewport centre
//   scrollto:<selector>  wheel until the element's centre is near the viewport centre
//   readthrough[:<ms>]   wheel down the whole page 600px at a time, pausing ms (default 150)
//   hover:<selector>     scroll to and move the mouse over the element's centre
//   click:<selector>     scroll to and click the element's centre with the left button
//   key:<Key>            press and release one key (Tab, Enter, Escape, End, Home, PageDown, ...)
//   shot:<file.png>      viewport screenshot
//   fullshot:<file.png>  full-page screenshot
//   aria:<file.txt>      accessibility tree as indented `role "name"` lines
//   text:<selector>      log the element's innerText
//   eval:<js>            log the JSON value of a page expression
//   assert:<js>          fail the run unless the page expression is truthy
//
// Evidence goes to .verify/<run>/evidence/<label>/: the files the steps name, transcript.md with
// every step and its result, and errors.jsonl with page exceptions, console errors and failed
// requests. The run exits 1 when an assert fails or, unless --allow-errors, the page errored.

import { spawn } from 'node:child_process';
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
  rmSync,
  existsSync,
} from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../..');

const argv = process.argv.slice(2);
const split = argv.indexOf('--');
const flags = split === -1 ? argv : argv.slice(0, split);
const steps = split === -1 ? [] : argv.slice(split + 1);
const flag = (name) => flags.includes(`--${name}`);
const option = (name, fallback) => {
  const i = flags.indexOf(`--${name}`);
  return i === -1 ? fallback : flags[i + 1];
};

const run = option('run');
const name = option('name');
if (!run || !name || steps.length === 0) {
  console.error('usage: drive.mjs --run <id> --name <label> [options] -- <step> [<step> ...]');
  process.exit(2);
}

const state = join(root, '.verify', run, 'state');
if (!existsSync(join(state, 'env'))) {
  console.error(`no running server for run '${run}'; start one with site.sh up`);
  process.exit(2);
}
const env = Object.fromEntries(
  readFileSync(join(state, 'env'), 'utf8')
    .trim()
    .split('\n')
    .map((line) => line.split(/=(.*)/s).slice(0, 2)),
);
const base = env.URL;
const out = join(root, '.verify', run, 'evidence', name);
mkdirSync(out, { recursive: true });
const transcript = join(out, 'transcript.md');
const errorsFile = join(out, 'errors.jsonl');
writeFileSync(errorsFile, '');

const mobile = flag('mobile');
const [width, height] = option('viewport', mobile ? '390x844' : '1440x900')
  .split('x')
  .map(Number);
const dpr = Number(option('dpr', mobile ? 3 : 1));
const reducedMotion = flag('reduced-motion');

writeFileSync(
  transcript,
  `# ${name}\n\n- server: ${base} (run ${run}, built from ${env.BUILT_HEAD})\n` +
    `- viewport: ${width}x${height} @${dpr}x${mobile ? ', mobile' : ''}` +
    `${reducedMotion ? ', prefers-reduced-motion: reduce' : ''}\n\n## Steps\n\n`,
);
const log = (line) => {
  console.log(line);
  appendFileSync(transcript, `${line}\n`);
};

// Chrome
const chromePath =
  process.env.CHROME ??
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find(existsSync);
if (!chromePath) {
  console.error('no Chrome found; set CHROME to a Chrome or Chromium binary');
  process.exit(2);
}
const profile = join(state, `chrome-${process.pid}`);
const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    '--remote-debugging-port=0',
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    '--mute-audio',
    `--window-size=${width},${height}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);
const chromeExited = new Promise((ok) => chrome.once('exit', ok));
// Chrome keeps writing its profile until it exits, so wait for the exit before removing it.
async function closeChrome() {
  if (chrome.exitCode === null && chrome.signalCode === null) chrome.kill();
  await chromeExited;
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
process.on('exit', () => chrome.kill());

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function devtoolsPort() {
  const file = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100; i++) {
    if (existsSync(file)) {
      const port = readFileSync(file, 'utf8').split('\n')[0];
      if (port) return port;
    }
    await sleep(100);
  }
  throw new Error('Chrome did not open a DevTools port');
}

const port = await devtoolsPort();
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok, fail) => {
  ws.onopen = ok;
  ws.onerror = fail;
});

let nextId = 0;
const pending = new Map();
const listeners = new Map();
ws.onmessage = ({ data }) => {
  const msg = JSON.parse(data);
  if (msg.id !== undefined) {
    const { ok, fail } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? fail(new Error(`${msg.error.message} ${msg.error.data ?? ''}`)) : ok(msg.result);
  } else {
    for (const fn of listeners.get(msg.method) ?? []) fn(msg.params);
  }
};
const send = (method, params = {}) =>
  new Promise((ok, fail) => {
    const id = nextId++;
    pending.set(id, { ok, fail });
    ws.send(JSON.stringify({ id, method, params }));
  });
const on = (method, fn) => listeners.set(method, [...(listeners.get(method) ?? []), fn]);
const once = (method) =>
  new Promise((ok) => {
    const fn = (params) => {
      listeners.set(
        method,
        listeners.get(method).filter((f) => f !== fn),
      );
      ok(params);
    };
    on(method, fn);
  });

// Page errors: uncaught exceptions, console errors, and failed or 4xx/5xx subresources. The
// top-level document is excluded so goto:/missing can prove the 404 page.
let errorCount = 0;
const pageError = (entry) => {
  errorCount++;
  appendFileSync(errorsFile, `${JSON.stringify(entry)}\n`);
  log(`  ! ${entry.kind}: ${entry.text}`);
};
on('Runtime.exceptionThrown', ({ exceptionDetails: d }) =>
  pageError({ kind: 'exception', text: d.exception?.description ?? d.text }),
);
on('Runtime.consoleAPICalled', ({ type, args }) => {
  if (type === 'error' || type === 'assert')
    pageError({
      kind: `console.${type}`,
      text: args.map((a) => a.value ?? a.description).join(' '),
    });
});
const requests = new Map();
on('Network.requestWillBeSent', ({ requestId, request, type }) =>
  requests.set(requestId, { url: request.url, type }),
);
on('Network.responseReceived', ({ requestId, response, type }) => {
  if (response.status >= 400 && type !== 'Document')
    pageError({ kind: 'http', text: `${response.status} ${response.url}` });
});
on('Network.loadingFailed', ({ requestId, errorText, canceled, type }) => {
  if (!canceled && type !== 'Document')
    pageError({ kind: 'network', text: `${errorText} ${requests.get(requestId)?.url}` });
});

await send('Page.enable');
await send('Runtime.enable');
await send('Network.enable');
await send('Accessibility.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: dpr,
  mobile,
});
if (mobile) {
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Emulation.setUserAgentOverride', {
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  });
}
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }],
});

async function evaluate(expression) {
  const { result, exceptionDetails } = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (exceptionDetails)
    throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
  return result.value;
}

const rectOf = async (selector) => {
  const rect = await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height };
  })()`);
  if (!rect) throw new Error(`no element matches ${selector}`);
  if (rect.w === 0 && rect.h === 0) throw new Error(`${selector} has no box (hidden?)`);
  return rect;
};

const mouse = { x: width / 2, y: height / 2 };
const wheel = async (dy) => {
  await send('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    x: mouse.x,
    y: mouse.y,
    deltaX: 0,
    deltaY: dy,
  });
  await sleep(60);
};

async function scrollTo(selector) {
  for (let i = 0; i < 60; i++) {
    const { y } = await rectOf(selector);
    const off = y - height / 2;
    if (Math.abs(off) < height / 4) return rectOf(selector);
    const before = await evaluate('scrollY');
    await wheel(Math.max(-600, Math.min(600, off)));
    // A wheel that moves nothing means the page cannot scroll further toward the element.
    if ((await evaluate('scrollY')) === before) return rectOf(selector);
  }
  return rectOf(selector);
}

async function moveTo(selector) {
  const { x, y } = await scrollTo(selector);
  if (x < 0 || y < 0 || x > width || y > height)
    throw new Error(`${selector} centre (${x}, ${y}) is outside the viewport`);
  mouse.x = x;
  mouse.y = y;
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  return { x, y };
}

const keyCodes = {
  Tab: 9,
  Enter: 13,
  Escape: 27,
  Space: 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
};

async function capture(file, full) {
  const params = { format: 'png' };
  if (full) {
    const { cssContentSize } = await send('Page.getLayoutMetrics');
    params.captureBeyondViewport = true;
    params.clip = { x: 0, y: 0, width, height: Math.ceil(cssContentSize.height), scale: 1 };
  }
  const { data } = await send('Page.captureScreenshot', params);
  writeFileSync(join(out, file), Buffer.from(data, 'base64'));
  return join(out, file);
}

async function ariaTree(file) {
  const { nodes } = await send('Accessibility.getFullAXTree');
  const byId = new Map(nodes.map((n) => [n.nodeId, n]));
  const lines = [];
  // Text already spelled out by an enclosing link or heading name is left out.
  const walk = (node, depth, named) => {
    const role = node.role?.value;
    const label = node.name?.value?.trim();
    const skip = ['generic', 'none', 'InlineTextBox'].includes(role);
    const redundant = role === 'StaticText' && (!label || named.includes(label));
    const shown = !node.ignored && role && !skip && !redundant;
    if (shown) lines.push(`${'  '.repeat(depth)}${role}${label ? ` "${label}"` : ''}`);
    for (const child of node.childIds ?? []) {
      const c = byId.get(child);
      if (c) walk(c, shown ? depth + 1 : depth, label && role !== 'StaticText' ? label : named);
    }
  };
  walk(
    nodes.find((n) => !n.parentId),
    0,
    '',
  );
  writeFileSync(join(out, file), `${lines.join('\n')}\n`);
  return join(out, file);
}

const actions = {
  async goto(path) {
    const loaded = once('Page.loadEventFired');
    const { errorText } = await send('Page.navigate', { url: new URL(path, base).href });
    if (errorText) throw new Error(errorText);
    await loaded;
    await evaluate('document.fonts.ready.then(() => true)');
    const status = await evaluate(
      `performance.getEntriesByType('navigation')[0]?.responseStatus ?? null`,
    );
    return `${await evaluate('location.href')} (HTTP ${status}, title "${await evaluate('document.title')}")`;
  },
  wait: (ms) => sleep(Number(ms)).then(() => `${ms}ms`),
  async waitfor(js) {
    for (let i = 0; i < 50; i++) {
      if (await evaluate(js)) return 'true';
      await sleep(100);
    }
    throw new Error(`still falsy after 5s: ${js}`);
  },
  wheel: (dy) => wheel(Number(dy)).then(async () => `scrollY=${await evaluate('scrollY')}`),
  async readthrough(ms) {
    let wheels = 0;
    for (let last = -1; (await evaluate('scrollY')) !== last && wheels < 200; wheels++) {
      last = await evaluate('scrollY');
      await wheel(600);
      await sleep(Number(ms || 150));
    }
    return `${wheels} wheels to scrollY=${await evaluate('scrollY')}`;
  },
  scrollto: (sel) => scrollTo(sel).then(async () => `scrollY=${await evaluate('scrollY')}`),
  hover: (sel) => moveTo(sel).then(({ x, y }) => `mouse at ${Math.round(x)},${Math.round(y)}`),
  async click(sel) {
    const { x, y } = await moveTo(sel);
    for (const type of ['mousePressed', 'mouseReleased'])
      await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 });
    await sleep(150);
    return `clicked at ${Math.round(x)},${Math.round(y)}; now ${await evaluate('location.href')}`;
  },
  async key(key) {
    const code = keyCodes[key];
    const base = { key, code: key, windowsVirtualKeyCode: code, nativeVirtualKeyCode: code };
    await send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      ...base,
      text: key === 'Enter' ? '\r' : key === 'Space' ? ' ' : undefined,
    });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
    await sleep(80);
    return `focus on ${await evaluate(
      `(() => { const a = document.activeElement; return a ? a.tagName.toLowerCase() + (a.id ? '#' + a.id : '') + ' "' + (a.innerText ?? '').replace(/\\s+/g, ' ').trim().slice(0, 60) + '"' : 'none'; })()`,
    )}`;
  },
  shot: (file) => capture(file, false),
  fullshot: (file) => capture(file, true),
  aria: (file) => ariaTree(file),
  async text(sel) {
    return JSON.stringify(
      await evaluate(`document.querySelector(${JSON.stringify(sel)})?.innerText ?? null`),
    );
  },
  eval: async (js) => JSON.stringify(await evaluate(js)),
  async assert(js) {
    const value = await evaluate(js);
    if (!value) throw new Error(`assertion failed: ${js} -> ${JSON.stringify(value)}`);
    return `passed -> ${JSON.stringify(value)}`;
  },
};

let failed = false;
for (const step of steps) {
  const at = step.indexOf(':');
  const verb = at === -1 ? step : step.slice(0, at);
  const arg = at === -1 ? '' : step.slice(at + 1);
  if (!actions[verb]) {
    log(`- FAIL \`${step}\`: unknown step`);
    failed = true;
    break;
  }
  try {
    log(`- \`${step}\` -> ${await actions[verb](arg)}`);
  } catch (err) {
    log(`- FAIL \`${step}\`: ${err.message}`);
    failed = true;
    break;
  }
}

const erroredPage = errorCount > 0 && !flag('allow-errors');
log(
  `\n## Result\n\n${failed || erroredPage ? 'FAIL' : 'PASS'}: ${errorCount} page error(s)` +
    `${errorCount ? ' (see errors.jsonl)' : ''}. Evidence: ${out}`,
);
ws.close();
await closeChrome();
process.exit(failed || erroredPage ? 1 : 0);
