# Scroll reveal

As the visitor scrolls, each section's Bangla headstroke line draws across, its stem drops, and
each `.reveal` block rises in, once, when it crosses a line 20% above the bottom of the screen.
When motion is reduced, or without IntersectionObserver, the page is static and fully visible
from the first paint.

## Sub-features

- `reveal-arm` adds `reveal-ready` to `html` only when motion is allowed and IntersectionObserver
  exists.
- `reveal-once` adds `is-in` to a `.reveal`, `.section` or `.sh` the first time it crosses the
  line, and never removes it.
- `reveal-hidden` keeps blocks below the line at opacity 0 until they are revealed.
- `reveal-static` shows everything at full opacity under `prefers-reduced-motion: reduce`.

## How to get to it (user POV)

- Load `/` and scroll down with the wheel, keyboard (`PageDown`, `Space`, `End`) or touch.
- Set the system to reduce motion and load `/`.

## Driving it with drive.mjs

Preconditions:

- A healthy run from `site.sh up` (see [README](./README.md)).

- **Armed.** `goto:/ "assert:document.documentElement.classList.contains('reveal-ready')"`.
- **Hidden before, shown after.** The Research heading is below the first screen at 1440x900:
  `goto:/ wait:3000 "assert:!document.querySelector('#research').closest('.sh').classList.contains('is-in')" scrollto:#research wait:1500 "assert:document.querySelector('#research').closest('.sh').classList.contains('is-in')" shot:research.png`.
  `research.png` shows the Research headstroke fully drawn and its first entry in place.
- **Once only.** Continue with `scrollto:#name wait:500 "assert:document.querySelector('#research').closest('.sh').classList.contains('is-in')"`.
- **Keyboard scroll.** `goto:/ wait:3000 key:End wait:1500 "assert:document.querySelector('#contact').closest('.sh').classList.contains('is-in')" shot:end.png`.
- **Nothing stranded.** Read the page top to bottom with the wheel, then list blocks still hidden:
  `goto:/ wait:3000 readthrough wait:1200 "assert:document.querySelectorAll('.reveal:not(.is-in)').length === 0"`.
  `key:End` is not a substitute here: it jumps past the middle of the page, and blocks it skips
  stay hidden until scrolled back to.
- **Reduced motion.** `--reduced-motion -- goto:/ "assert:!document.documentElement.classList.contains('reveal-ready')" "assert:[...document.querySelectorAll('.reveal')].every(e => getComputedStyle(e).opacity === '1')" fullshot:full.png`.
  `full.png` shows every section, project and ledger row.

## Gotchas

- With motion allowed, a `fullshot` taken without scrolling leaves every block below the first
  screen invisible. Use `--reduced-motion` for full-page layout shots.
- On the first screen at 1440x900 the top of the Work section is already past the line, so
  `#work`'s `section` is `is-in` at load. Use `#research` or later for before-and-after proof.
- `scrollto` stops when the page cannot scroll further, so elements near the bottom (Contact,
  footer) never reach the viewport centre. Assert visibility, not position, for those.
