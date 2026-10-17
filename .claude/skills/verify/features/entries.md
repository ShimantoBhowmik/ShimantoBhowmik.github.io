# Work and research entries

Work and Research list one article per place, from `work` and `research` in
`src/data/profile.ts`. Each article has the organisation (linked when it has a site), its years
and location, and one or more stints with a focus line, optional citation and detail, a row of
results, and an optional link. A green stem runs down each section; the stretch beside an entry
thickens while the visitor hovers or focuses inside it.

## Sub-features

- `entries-work` shows `#aws`, `#finpilot`, `#amazon-agi` (3 stints) and `#sage-ai` under `#work`.
- `entries-research` shows `#stanford` and `#rit-cs` (2 stints) under `#research`.
- `entries-stint` shows each stint's years, focus, detail, results (`dl.results`) and link.
- `entries-stem` thickens the entry's stem from `scaleX(0.375)` to `scaleX(1)` on hover or
  focus-within.
- `entries-phone` stacks the rail above the body at 640px and below.

## How to get to it (user POV)

- Scroll down from the hero to `Work`, then `Research`.
- Click a timeline stop to jump to its entry (see [hero-timeline](./hero-timeline.md)).

## Driving it with drive.mjs

Preconditions:

- A healthy run from `site.sh up` (see [README](./README.md)).

- **Placement.** Load the page and read where each entry sits:
  `goto:/ "eval:[...document.querySelectorAll('article.entry')].map(a => a.id + ':' + a.closest('section').querySelector('h2').id + ':' + a.querySelectorAll('.stint').length)"`.
  Today this logs `aws:work:1`, `finpilot:work:1`, `amazon-agi:work:3`, `sage-ai:work:1`,
  `stanford:research:1`, `rit-cs:research:2`. Update the list when `profile.ts` changes.
- **Read an entry.** Scroll to it and capture it:
  `goto:/ wait:2500 scrollto:#amazon-agi wait:1200 shot:amazon-agi.png aria:page.aria.txt`.
  `page.aria.txt` has `article "Amazon AGI"` with one `heading` per stint focus and the result
  values; `amazon-agi.png` shows all three stints.
- **Stem on hover.** Scroll to an entry, read the stem, hover the org name, read it again:
  `goto:/ wait:2500 scrollto:#finpilot wait:1000 "assert:getComputedStyle(document.querySelector('#finpilot'), '::before').transform === 'matrix(0.375, 0, 0, 1, 0, 0)'" hover:#finpilot-org wait:400 "assert:getComputedStyle(document.querySelector('#finpilot'), '::before').transform === 'matrix(1, 0, 0, 1, 0, 0)'" shot:hover.png`.
  `hover.png` shows the thicker stem beside FinPilot only.
- **Stem on focus.** Tab into an entry link instead of hovering: after the scroll, press `Tab`
  until the transcript names a link inside the entry, then assert the same `matrix(1, …)`.
- **Phone.** `--mobile -- goto:/ wait:1500 scrollto:#aws wait:1200 shot:aws-phone.png "eval:document.documentElement.scrollWidth <= innerWidth"`.
  The eval logs `true` (no sideways scroll) and the screenshot shows the org above its stint.

## Gotchas

- Entries are `.reveal` blocks. Screenshot only after `scrollto` plus about 1s, or they are
  captured mid-rise at reduced opacity.
- A mouse left over an entry from an earlier `click` or `hover` keeps its stem thick. Start each
  stem proof from a fresh `goto:/`.
- `#amazon-agi` is the target of three timeline stops; it is still one article.
