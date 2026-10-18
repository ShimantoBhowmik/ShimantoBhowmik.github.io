# Projects and recognition

Projects shows the main projects as a two-column grid of name, summary, stack and links, then a
`Smaller things` list. Recognition shows two ledgers, `Awards` and `Background`, each with a years
column. Content comes from `projects`, `smallProjects`, `awards` and `background` in
`src/data/profile.ts`.

## Sub-features

- `projects-grid` shows 6 projects in two columns above 720px and one column at 720px and below.
- `projects-links` links each project name to its first link and lists extra links (`Code`,
  `Live`, `Devpost`) under projects that have more than one.
- `projects-small` shows 5 smaller projects as name, summary and stack rows, stacking at 720px.
- `recognition-ledgers` shows 5 awards and the background rows side by side above 860px and
  stacked at 860px and below.

## How to get to it (user POV)

- Scroll down past Research to `Projects`, then `Recognition`.

## Driving it with drive.mjs

Preconditions:

- A healthy run from `site.sh up` (see [README](./README.md)).

- **Desktop layout.** `goto:/ wait:2500 scrollto:#projects wait:1500 shot:projects.png scrollto:#recognition wait:1500 shot:recognition.png`.
  `projects.png` shows two project columns; `recognition.png` shows Awards and Background side by
  side.
- **Counts and columns at a tablet width.**
  `--viewport 800x1000 -- goto:/ "eval:({ proj: getComputedStyle(document.querySelector('.projects')).gridTemplateColumns, rec: getComputedStyle(document.querySelector('.recognition')).gridTemplateColumns, projects: document.querySelectorAll('.project').length, small: document.querySelectorAll('.small').length, awards: document.querySelectorAll('.recognition > div:first-child li').length })"`.
  At 800px this logs two project columns, one recognition column, and counts `6`, `5`, `5`.
- **Phone layout.** `--mobile -- goto:/ wait:1500 scrollto:#projects wait:1500 shot:projects-phone.png "assert:getComputedStyle(document.querySelector('.projects')).gridTemplateColumns.split(' ').length === 1"`.
- **Links.** `goto:/ "eval:[...document.querySelectorAll('.project a, .small a')].map(a => a.textContent.trim() + ' -> ' + a.getAttribute('href'))"`.
  Every link has an absolute `https://` href; `Gemstone Classifier` has no link and renders as
  plain text. Do not follow them.

## Gotchas

- Breakpoints sit at 720px (projects) and 860px (recognition). `--mobile` (390px) proves
  neither boundary; drive `--viewport 721x1000` and `720x1000`, or `861x1000` and `860x1000`,
  when a change touches them.
- Blocks here are `.reveal`; wait about 1.5s after `scrollto` before a screenshot.
