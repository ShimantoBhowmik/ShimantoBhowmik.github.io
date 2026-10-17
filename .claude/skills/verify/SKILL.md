---
name: verify
description: Build and serve Shimanto Bhowmik's personal site (Astro, static, one page plus a 404) on a private port and drive it in headless Chrome with real scroll, mouse and keyboard input, capturing screenshots, accessibility trees and page errors as proof. Use to prove a change to src/, public/ or the build works the way a visitor sees it, to check layout at desktop and phone widths, or to check the scroll-reveal and timeline motion.
---

# Verify the site

The site is one static page (`/`) and a 404 page, built by Astro from `src/data/profile.ts` and the
components in `src/components/`. The only client script is the inline scroll-reveal observer in
`src/layouts/Base.astro`. A visitor touches it in a browser, so every proof here is a browser proof
against the production build, never `astro dev`.

Two helpers do the work, both run from the repo root:

- `.claude/skills/verify/scripts/site.sh` builds, serves, checks and stops one isolated instance.
- `.claude/skills/verify/scripts/drive.mjs` drives that instance in headless Chrome.

Read [features/README.md](features/README.md) before driving, then the feature file for what you
changed.

## Launch

```bash
sh .claude/skills/verify/scripts/site.sh up
```

This runs the same build CI runs (`scripts/check-bangla.mjs`, `astro check`, `astro build`) into
`.verify/<run>/state/dist`, then serves it with `astro preview --ignore-lock` on a free port bound
to `127.0.0.1`. It is ready when it prints:

```text
RUN=20261017-114800-93951
URL=http://127.0.0.1:52581
EVIDENCE=/…/.verify/20261017-114800-93951/evidence
```

Carry `RUN` into every later command; shell state does not persist between calls. Pass a name
(`site.sh up hero-fix`) to pick the run id yourself. A build failure prints the tail of
`.verify/<run>/state/build.log` and exits 1; fix the build before verifying anything.

Isolation: each run has its own port, build directory and Chrome profile, so runs can go side by
side. `--ignore-lock` keeps the run away from `.astro/preview.json`, the lock behind
`npm run preview` and `astro preview stop`. Never run `astro preview stop`: it stops whatever
preview the user has open. Never write to `dist/`; it belongs to the user's own build.

The server serves a snapshot. After editing `src/` or `public/`, run `site.sh down <run>` and
`site.sh up` again; doctor fails until you do.

## Doctor

Run this first, and again whenever a result looks wrong:

```bash
sh .claude/skills/verify/scripts/site.sh doctor <run>
```

It is read-only and checks that the server pid is alive, that it owns the port, that `/` serves the
home page, that `/resume.pdf` is served, that unknown paths answer 404, that no source file changed
after the build, and that HEAD has not moved since the build. Any `FAIL` line exits 1. Do not drive
an instance that fails doctor; restart it.

`site.sh list` shows every run on disk and whether its server is up.

## Drive

```bash
node .claude/skills/verify/scripts/drive.mjs --run <run> --name <label> [options] -- <step> ...
```

Each call launches a fresh headless Chrome (system Chrome, or `CHROME=/path`), runs the steps in
order, stops at the first failure, and closes Chrome. Options:

- `--viewport WxH` sets the size; the default is `1440x900`.
- `--mobile` emulates a 390x844 phone at 3x with touch and an iPhone user agent.
- `--dpr N` sets the device pixel ratio.
- `--reduced-motion` emulates `prefers-reduced-motion: reduce` before the first load.
- `--allow-errors` records page errors without failing the run.

Steps are `verb:arg`, split on the first colon. Quote any step that has spaces or shell characters.

| Step                  | Does                                                                   |
| --------------------- | ---------------------------------------------------------------------- |
| `goto:<path>`         | load a path, wait for load and `document.fonts.ready`, log HTTP status |
| `wait:<ms>`           | pause, for animations to finish                                        |
| `waitfor:<js>`        | poll a page expression until truthy, 5s timeout                        |
| `wheel:<dy>`          | one real mouse-wheel scroll                                            |
| `scrollto:<selector>` | wheel until the element is near the viewport centre                    |
| `readthrough[:<ms>]`  | wheel down the whole page like a reader, pausing ms per wheel (150)    |
| `hover:<selector>`    | scroll to the element and move the mouse onto its centre               |
| `click:<selector>`    | scroll to the element and left-click its centre                        |
| `key:<Key>`           | press one key: `Tab`, `Enter`, `Escape`, `Space`, `End`, `PageDown`, … |
| `shot:<file.png>`     | viewport screenshot                                                    |
| `fullshot:<file.png>` | full-page screenshot                                                   |
| `aria:<file.txt>`     | accessibility tree as indented `role "name"` lines                     |
| `text:<selector>`     | log the element's `innerText`                                          |
| `eval:<js>`           | log a page expression's JSON value                                     |
| `assert:<js>`         | fail unless the page expression is truthy                              |

Scrolling, hovering, clicking and keys go through real input events, so the IntersectionObserver,
`:hover`, `:focus-visible` and anchor jumps behave as they do for a visitor. Use `eval` and `assert`
only to read state, never to change it.

Stable handles on this page:

- Section headings: `#work`, `#research`, `#projects`, `#recognition`, `#contact` (the `h2`s). Each
  sits in a `.sh` header inside a `section.section`.
- Entries: `article#aws`, `#finpilot`, `#amazon-agi`, `#sage-ai`, `#stanford`, `#rit-cs`.
- Hero: `h1#name`, `nav[aria-label="Contact and profiles"]`, `.statement`, `.lede`.
- Timeline: `ol[aria-label="Career timeline"]`, its stops `.stop a[href="#<entry id>"]`, the current
  stop `.stop.now`.
- Reveal state: `html.reveal-ready`, and `.is-in` on each `.reveal`, `.section` and `.sh` once
  revealed.

Example, proving the Research heading reveals on scroll:

```bash
node .claude/skills/verify/scripts/drive.mjs --run <run> --name research-reveal -- \
  goto:/ wait:3000 shot:hero.png \
  "assert:!document.querySelector('#research').closest('.sh').classList.contains('is-in')" \
  scrollto:#research wait:1500 \
  "assert:document.querySelector('#research').closest('.sh').classList.contains('is-in')" \
  shot:research.png aria:page.aria.txt
```

The built-in browser pane (`mcp__Claude_Browser__*`) can open the same `URL` for interactive looks.
Use `drive.mjs` for the proof, since its transcript and error log are what a reviewer reruns.

## Evidence

Every drive writes to `.verify/<run>/evidence/<label>/`:

- the screenshots and accessibility trees its steps named,
- `transcript.md`: server, build commit, viewport, every step with its result, and PASS or FAIL,
- `errors.jsonl`: uncaught exceptions, `console.error`s, and failed or 4xx/5xx subresource requests.

A run exits 1 on a failed step, a failed assert, or any page error (unless `--allow-errors`).
`.verify/` is gitignored. Open the PNGs and look at them: an assert proves state, not looks.

Proof standards for this site:

- Drive the built site through `site.sh up`, never `astro dev` or a stale `dist/`.
- Capture the action and its result: a screenshot or assert before the scroll, click or hover, and
  another after it.
- Prove layout at both `1440x900` and `--mobile`. The timeline and the projects and recognition grids
  change shape at 640, 720 and 860px.
- Treat content changes as unproven until the accessibility tree shows the new text where a visitor
  reads it.
- Do not set `.is-in` or scroll with `eval`. A reveal that only works when forced is broken.
- External links (GitHub, LinkedIn, Scholar, YouTube) are proven by their `href`. Do not follow them.
- A clean `errors.jsonl` is part of every proof.

## Cleanup

```bash
sh .claude/skills/verify/scripts/site.sh down <run>
```

This kills only the server pid the run recorded, after confirming its command line still points at
this run's build. It copies `build.log` and `preview.log` into `evidence/server/`, deletes
`.verify/<run>/state/`, and leaves `.verify/<run>/evidence/` in place. Each `drive.mjs` call
already closes its own Chrome and deletes its profile. Never kill processes by name (`pkill node`,
`pkill astro`, `pkill Chrome`); the user's own dev server and browser share those names.

Run `down` after a failed attempt too, so no server is stranded. `site.sh list` finds runs you lost
track of; one marked `dead` still needs `down` to clear its state. Delete an old run's evidence with
`rm -rf .verify/<run>` only once nobody needs that proof.
