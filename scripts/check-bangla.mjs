// Fails the build when src/ uses a Bengali character the subset font does not cover.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const covered = new Set(
  readFileSync(join(root, 'src/fonts/anek-bangla-subset.txt'), 'utf8').trim(),
);

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (['.ts', '.astro', '.md'].includes(extname(path))) yield path;
  }
}

const missing = new Set();
for (const path of files(join(root, 'src'))) {
  for (const ch of readFileSync(path, 'utf8').match(/[ঀ-৿]/g) ?? []) {
    if (!covered.has(ch)) missing.add(ch);
  }
}

if (missing.size) {
  console.error(
    `Bengali characters missing from the font subset: ${[...missing].join(' ')}\n` +
      'Run: python3 scripts/subset-bangla.py',
  );
  process.exit(1);
}
