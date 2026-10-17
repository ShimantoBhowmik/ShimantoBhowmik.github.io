# Site verification map

This directory is the maintained source for verifying what a visitor sees on the site. Read this
index before driving, then use the feature file for what changed. Each file is a recipe for
`drive.mjs`; the harness itself is documented in [../SKILL.md](../SKILL.md).

## Baseline preconditions

- Start one instance with `sh .claude/skills/verify/scripts/site.sh up` and note `RUN`.
- `sh .claude/skills/verify/scripts/site.sh doctor <run>` passes every line.
- The instance was built after your last edit to `src/`, `public/` or `astro.config.mjs`.
- Never drive an instance this verification run did not start, and never the user's `npm run dev`
  or `npm run preview`.

## Driving conventions

- Every `drive.mjs` call starts a fresh browser, so start each recipe with `goto:/` (or the path
  it names) and allow `wait:3000` for the hero and timeline entrance to finish before a hero
  screenshot.
- Drive at `1440x900` (the default) and again with `--mobile`. Add `--viewport 800x1000` when a
  change touches the 640 to 860px breakpoints.
- Prefer ids and ARIA names (`#research`, `nav[aria-label="Contact and profiles"]`,
  `ol[aria-label="Career timeline"]`) over class names, and class names over DOM position.
- Scroll, hover, click and press keys through steps, not through `eval`.
- Commands are literal; quote whole steps that contain spaces, quotes or brackets.

## Proof and skip reporting

- Capture the state before the action and after it, with a screenshot, an assert, or both.
- UI proof includes an accessibility tree (`aria:`) and a screenshot showing the changed region.
- Every proof includes a `transcript.md` that ends in `PASS` and an empty `errors.jsonl`.
- Record the evidence label and viewport with each artifact you cite.
- If an entry point cannot be reached (an external site, a mail client), say which and prove the
  `href` instead. Do not report a skipped entry point as verified through a different one.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the visible behavior. It
then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every way a visitor reaches it.
3. `Driving it with drive.mjs` starts with `Preconditions:` and pairs each visitor action with an
   exact step list and its observable result.
4. `Gotchas` lists traps that waste or invalidate a run.

## Features

- [Hero and career timeline](./hero-timeline.md) covers the name bar, profile links, statement, and
  the timeline's stops, anchors, entrance motion and phone layout.
- [Work and research entries](./entries.md) covers the entry articles, their stints and results,
  and the stem that thickens on hover and focus.
- [Scroll reveal](./scroll-reveal.md) covers section lines, stems and blocks revealing on scroll,
  and the static page under reduced motion.
- [Projects and recognition](./projects-recognition.md) covers the project grid, smaller things,
  awards and background ledgers at each breakpoint.
- [Contact and links](./contact-links.md) covers the email address, resume PDF, profile links and
  footer.
- [Not found page](./not-found.md) covers the 404 page for unknown paths.
