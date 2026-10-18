# Hero and career timeline

The first screen shows the name in English and Bangla, the contact and profile links, the statement
and lede, and a career timeline drawn to scale from January 2022 to today. Each timeline stop links
to its entry in Work or Research. On desktop the timeline is a horizontal strip map with angled
labels; at 640px and below it becomes a vertical list, newest first.

## Sub-features

- `hero-bar` shows `Shimanto Bhowmik`, the Bangla signature, and the `Email me`, `Resume`,
  `Google Scholar`, `GitHub` and `LinkedIn` links.
- `hero-copy` shows the statement and lede from `person` in `src/data/profile.ts`.
- `timeline-stops` lists one stop per `timeline` entry, labelled with its name and years.
- `timeline-now` marks the last open stop with a larger dot and a `Now` tag.
- `timeline-anchor` jumps to the matching entry when a stop is clicked.
- `timeline-entrance` draws the track, then the stops, then the `Now` stop, after the words arrive.
- `timeline-phone` stacks the stops vertically, newest first, with no year axis.

## How to get to it (user POV)

- Load `/`. The hero is the first screen.
- Click or tab to a timeline stop to jump to that entry.

## Driving it with drive.mjs

Preconditions:

- A healthy run from `site.sh up` (see [README](./README.md)).

- **First screen.** Load the page and wait for the entrance to finish.
  Run `node .claude/skills/verify/scripts/drive.mjs --run <run> --name hero -- goto:/ wait:3000 shot:hero.png aria:hero.aria.txt`.
  `hero.png` shows the name bar, statement, lede and the full timeline with `NOW` under the last
  stop. `hero.aria.txt` has `navigation "Contact and profiles"` with five links and
  `list "Career timeline"` with one link per stop, the last ending in `– now`.
- **Stop count.** Add
  `"assert:document.querySelectorAll('ol[aria-label=\"Career timeline\"] > li').length === 8"`
  and `"assert:document.querySelectorAll('.stop.now').length === 1"`. Change `8` when `timeline`
  in `src/data/profile.ts` changes length.
- **Anchor jump.** Click the current stop and confirm the page moved to its entry with the entry
  heading in view.
  Steps: `goto:/ wait:3000 "click:.stop.now a" wait:1500 "assert:location.hash === '#aws'" "assert:document.querySelector('#aws-org').getBoundingClientRect().top >= 0" shot:anchor.png`.
  `anchor.png` shows `Amazon Web Services` at the top of the viewport, fully visible. Repeat with
  `--reduced-motion`.
- **Keyboard.** From a fresh load, press `Tab` six times:
  `goto:/ wait:3000 key:Tab key:Tab key:Tab key:Tab key:Tab key:Tab shot:focus.png`. The transcript
  names each focused link: `Email me`, `Resume`, `Google Scholar`, `GitHub`, `LinkedIn`, then
  `RIT Computer Science 2022`. `focus.png` shows the focus style on the first stop.
- **Entrance motion.** Steps `goto:/ shot:t0.png wait:700 shot:t700.png wait:2300 shot:t3000.png`.
  `t0.png` has no track; `t700.png` has the statement in and the track partly drawn; `t3000.png`
  matches `hero.png`.
- **Phone.** Repeat the first screen with `--mobile` and a full-page shot:
  `--mobile -- goto:/ wait:1500 shot:hero-phone.png "assert:getComputedStyle(document.querySelector('ol.years')).display === 'none'"`.
  `hero-phone.png` shows the stops as a vertical list with `AWS Security` first.

## Gotchas

- `Amazon AGI` appears three times in the timeline; all three link to the single `#amazon-agi`
  entry. Assert by stop text or index, not by `href` alone.
- Known failure (October 2026): with motion allowed, the anchor jump lands the entry about 23px
  too high and clips its heading, because the entry is still shifted down by its reveal when the
  browser scrolls to it. The heading assert fails until that is fixed; under `--reduced-motion`
  it passes at top 0.
- After a click the mouse stays where the stop was, which can hover an entry and thicken its stem
  in the screenshot. That is the hover style, not a regression.
- Screenshots taken before about 2.8s catch the entrance mid-draw. That is a valid motion proof
  but not a layout proof.
- The track ends at today's month, computed at build time. A build from an earlier month draws
  a shorter line; rebuild before comparing to an old screenshot.
