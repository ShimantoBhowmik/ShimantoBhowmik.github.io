---
name: Shimanto Bhowmik
description: Personal site of a software engineer; everything hangs from one green headstroke.
colors:
  ground: "#f2f4f4"
  ink: "#121614"
  ink-2: "#434c47"
  ink-3: "#5c6661"
  rule: "#d3d8d4"
  green: "#006a4e"
  green-soft: "color-mix(in oklab, #006a4e 32%, #f2f4f4)"
typography:
  statement:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, min(5.4vw, 8.6vh), 5.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Anek Bangla Matra, Noto Sans Bengali, Bangla Sangam MN, sans-serif"
    fontSize: "min(4.25rem, (100vw - 2 * var(--pad)) * 0.0545)"
    fontWeight: 600
    lineHeight: 1
  headline-latin:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "min(4.25rem, (100vw - 2 * var(--pad)) * 0.055)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 0.95rem + 1.05vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.35
  name:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  signature:
    fontFamily: "Anek Bangla Matra, Noto Sans Bengali, Bangla Sangam MN, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.1rem + 0.8vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  value:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontFeature: "\"tnum\", \"lnum\""
  body:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"tnum\", \"lnum\""
  stop:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1
  stop-wide:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1
  stop-current:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  tag:
    fontFamily: "Anek Latin Variable, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  focus: "2px"
  track: "10px"
  branch: "16px"
  stop: "50%"
spacing:
  pad: "clamp(16px, 5vw, 96px)"
  gutter: "clamp(16px, 2.2vw, 32px)"
  hang: "18px"
  section-gap: "clamp(104px, 11vw, 176px)"
  stem: "1.5px"
  stem-active: "4px"
  matra-top: "0.1815em"
  matra-bottom: "0.278em"
  matra-bleed-top: "0.014em"
  matra-bleed: "0.006em"
components:
  link:
    textColor: "{colors.ink}"
  link-primary:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  section-head:
    textColor: "{colors.green}"
    typography: "{typography.headline}"
  section-title:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  hero-name:
    textColor: "{colors.ink}"
    typography: "{typography.name}"
  hero-signature:
    textColor: "{colors.green}"
    typography: "{typography.signature}"
  hero-statement:
    textColor: "{colors.ink}"
    typography: "{typography.statement}"
  hero-lede:
    textColor: "{colors.ink-2}"
    typography: "{typography.lede}"
  entry:
    padding: "clamp(28px, 3.2vw, 44px) 0"
  result-figure:
    textColor: "{colors.ink}"
    typography: "{typography.value}"
  contact-email:
    textColor: "{colors.ink}"
    typography: "{typography.headline-latin}"
  timeline-track:
    backgroundColor: "{colors.green}"
    rounded: "{rounded.track}"
    height: "10px"
  timeline-stop:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.stop}"
    rounded: "{rounded.stop}"
    size: "22px"
  timeline-stop-hover:
    backgroundColor: "{colors.green}"
    textColor: "{colors.green}"
  timeline-stop-current:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.stop-current}"
    rounded: "{rounded.stop}"
    size: "40px"
  timeline-now-tag:
    textColor: "{colors.green}"
    typography: "{typography.tag}"
  timeline-branch:
    textColor: "{colors.green-soft}"
    rounded: "{rounded.branch}"
---

# Design System: Shimanto Bhowmik

## Overview

**Creative North Star: "The Matra"**

One horizontal line, the matra, crosses the page and everything hangs from it, the way Bangla letters hang from their headstroke. The line is not drawn beside the type; it is the type. Every green rule on the page is the headstroke of a Bangla word, measured from the font and run edge to edge, and every vertical green line is a stem dropped from that headstroke down the edge of the content it carries. The one horizontal green line that is not a headstroke is the career timeline's track, which closes the hero: a route line inside the page margins, measuring time at one scale. It is the world's line put to work, not a decorative stripe, and it is the hero's only green line.

The world is light only, flat, cool paper and near-black ink with one bottle green (Bangladesh flag green) that owns every structural line. Type and line carry every value: there are no cards, icons, photographs, shadows or gradients, and there is no depth at all. Density is moderate and editorial; results are set as figures on a strict tabular column, never as badges.

Motion is the line being drawn: on load the timeline track draws left to right at a constant speed, once, and each stop arrives as the line reaches it. Reading an entry thickens the stretch of stem beside it.

**Key Characteristics:**
- One green, used only for structural lines, the Bangla words those lines belong to, and emphasis underlines.
- Every full-bleed horizontal green line is a Bangla headstroke; every vertical green line in a section is a stem hanging from one; the timeline's track (turned vertical on phones) is the only other green line, and it lives in the hero.
- A single axis: the left edge of the content column, with all read content indented 18px off its stem.
- Two families: Anek Bangla (subset) for Bangla, Anek Latin for all Latin; tabular lining figures for every date and number.
- Flat. No borders between items, no shadows, no gradients, no icons, no imagery.

## Colors

Cool paper, green-tinted near-black ink in three strengths, and one bottle green that is structure, not decoration. Light only: one palette, `color-scheme: light`, and the browser theme colour is Cool Paper. There is no dark scheme. (The favicon alone keeps a lighter green for dark browser tab bars; that adapts to the browser chrome, not to the site.)

### Primary
- **Bottle Green** (`green`): the matra lines, the stems, the section words, the Bangla signature beside the name, the emphasised link underline, the hover underline of every link, focus outlines, text selection background, the per-stint years inside an entry, the timeline's track, its NOW tag, and a timeline stop's fill and name on hover or focus. Nothing else.
- **Soft Green** (`green-soft`, 32% Bottle Green mixed into Cool Paper in oklab): the timeline's branches only, so a concurrent stint reads as a spur off the line rather than a second line.

### Neutral
- **Cool Paper** (`ground`): the only background, and the fill of a resting timeline stop.
- **Ink** (`ink`): the name in the hero bar, the hero statement, names of places, titles, result figures, the contact address, timeline stop names and the rings of its stops.
- **Ink Two** (`ink-2`): running prose: the lede, detail paragraphs, summaries, notes.
- **Ink Three** (`ink-3`): metadata: years, locations, result labels, stacks, sub-labels, footer, the timeline's year scale.
- **Rule Grey** (`rule`): the resting underline of ordinary links and the scrollbar thumb. It is never a divider.

### Named Rules
**The One Green Rule.** Green belongs to the line system and the Bangla words it comes from. It may underline the primary action and appear on hover and focus; it never fills a surface, a button, or a badge. The only green fill is a timeline stop, a dot on the line itself, under hover or focus.

**The No Grey Divider Rule.** Items are separated by space alone. Rule Grey exists only under resting links; there are no borders, hairlines or dividers anywhere.

## Typography

**Display Font:** Anek Bangla Matra (a build-time subset of Anek Bangla 600, with Noto Sans Bengali, Bangla Sangam MN fallback)
**Body Font:** Anek Latin Variable (with system-ui fallback)

**Character:** One superfamily in two scripts. The Bangla is green and structural, large in section heads and small as the signature beside the name; the Latin is semibold for names and the one hero statement and regular for prose, so beyond that statement the line does the shouting.

### Hierarchy
- **Statement** (Latin 600, `clamp(2.5rem, min(5.4vw, 8.6vh), 5.5rem)`, line-height 1.02, -0.025em, max 30ch, balanced): the hero's one sentence of what he does, Ink. The largest type on the page; the vh term keeps the first screen whole on short laptops.
- **Headline** (Bangla 600, `--sh-size`, line-height 1): the Bangla word of each section head, green, in the rail. Sized from the rail so the widest word (যোগাযোগ, 4.2em) always fits; on narrow screens `clamp(2.5rem, 10vw, 3.75rem)`.
- **Headline Latin** (600, sized from the content column, line-height 1.1, -0.02em): the contact email address only, sized so it never breaks.
- **Lede** (400, fluid 1.25-1.75rem, line-height 1.35, max 62ch, balanced): the hero's supporting sentence under the statement, Ink Two.
- **Name** (Latin 650, 1.25rem, line-height 1.2, -0.005em): the h1 in the hero bar, Ink.
- **Signature** (Bangla 600, 1.375rem): the Bangla name set beside the h1 on its baseline, 14px after it, Bottle Green.
- **Title** (600, fluid 1.375-1.75rem, line-height 1.2, -0.01em): place names, English section titles.
- **Focus** (600, 1.1875rem, line-height 1.3, max 44ch, balanced): what was built in each stint.
- **Value** (600, 1.375rem, line-height 1.15, tabular): result figures, set above their label.
- **Body** (400, 1.0625rem, line-height 1.55, max 66ch): detail prose.
- **Label** (400, 0.875rem): years, locations, result labels, stacks, sub-labels, in Ink Three.
- **Stop** (600, 1.0625rem, line-height 1, no-wrap): timeline stop names, Ink, angled above the track below 1200px and listed on phones.
- **Stop Wide** (600, 1.125rem, line-height 1): timeline stop names at 1200px and wider.
- **Stop Current** (700, 1.5rem, line-height 1, -0.01em): the current stop's name at 1200px and wider; below that it keeps Stop's size at 700.
- **Tag** (700, 0.75rem, 0.12em, uppercase): the NOW tag under the current stop, Bottle Green. The only uppercase in the system, and only attached to that stop.

### Named Rules
**The Tabular Column Rule.** Every date and number uses tabular lining figures. Years read as a strict column.

**The Space-Owns-The-Line Rule.** The Bangla subset must contain U+0020. CSS takes line-box metrics from the first font that covers the space; if the subset lacks it, the Latin face sets the line box and every matra measurement drifts off the glyph bar. Re-run the subset script whenever Bangla text changes; the coverage check fails the build on a missing character.

## Layout

One 12-column grid inside page padding (`pad`, 16-96px) with a fluid `gutter` (16-32px). Columns 1-3 are the **rail**, holding what hangs at the left of each line (the Bangla section word, place name, years, location). Columns 4-12 are the **content**, holding everything read. At 860px and below the rail and content stack to full width and the section stem moves to the page edge.

Sections open with `section-gap` (104-176px) above the section head. Entries within a section are padded 28-44px top and bottom, first entry flush. Items in lists are separated by 8px of padding, never by a line.

The matra band is measured from the font: with line-height 1, the headstroke sits from `matra-top` (0.1815em) to `matra-bottom` (0.278em) below the top of the line box. Green lines extend past it by `matra-bleed-top` (0.014em, the larger bleed because the top edge lands on fractional pixels) and `matra-bleed` (0.006em) so the glyph bar's anti-aliased rim never shows.

Hero, top to bottom, across the full width inside the page padding (it does not use the rail and has no matra): a bar (top padding 20-40px) with the name and its Bangla signature at the left and the links at the right, baseline-aligned and wrapping with 12px by 32px gaps; then the statement (48-112px below the bar, tied to viewport height) and the lede 16-28px under it; then the timeline 8-24px under the lede (36px on phones), the hero's one green line.

The timeline runs at the full page width. It reserves 150px above the track for the angled stop names and keeps clamp(56px, 7vw, 110px) clear on the right so the last name never leaves the page. The track runs at one scale from the first start month to the month of the build; a monthly scheduled rebuild keeps its end at today. The Work section below holds only the detailed entries, each linked from its stop.

Breakpoints in use: 1200px (timeline: shallower name angle, Stop Wide names, large current name), 860px, 720px, 640px (timeline becomes a vertical list; its load motion runs only at 641px and wider).

### Named Rules
**The Headstroke Rule.** Every full-bleed horizontal green line is a Bangla word's headstroke, cut to the measured matra band and run edge to edge of the viewport. The single exception is the timeline's track in the hero, which stays inside the page padding and carries time. Never draw any other green line that is not attached to a Bangla word.

**The Hanging Rule.** Every section hangs a `stem` (1.5px) green line from the bottom of its matra down the left edge of the content column to the foot of the section. All content in the section sits `hang` (18px) to the right of it. On phones the stem moves to the page edge and the rail is indented 18px too. Outside sections, the only vertical green line is the phone timeline's own stem (its track turned vertical), with its stops indented `hang` beside it.

## Elevation & Depth

Fully flat. There is no shadow vocabulary and no layering: a section's matra runs under its Bangla word in the same green, so line and glyph bar fuse into one shape rather than one sitting on the other. The only stacking is a timeline dot sitting on its track.

### Named Rules
**The Flat Rule.** Nothing is lifted. No shadows, no blur, no gradients, no tonal surfaces; where a line meets a letter they fuse in the same green.

## Shapes

Square and linear. Everything is a line or a letter: full-bleed horizontal bands, 1.5px vertical stems that thicken to 4px on hover or focus, and underlines (1.5px resting, 3px on the primary action, 0.06em on the contact address). Headstrokes, stems and underlines stay square; the 2px focus outline is the only radius on them. The timeline alone has transit-map geometry: a fully rounded 10px track, circular stops, and branches that leave the line with a 16px curved elbow; on phones its stem is square like every other stem. The favicon is the system in miniature: a green headstroke bar with a stem dropping from it.

## Components

### Links
Underlined text, never buttons.
- **Default:** inherits text colour; 1.5px underline in Rule Grey, offset 0.22em.
- **Hover:** underline turns Bottle Green over 160ms.
- **Primary action (Email me):** weight 650, 3px Bottle Green underline at rest.
- **Focus:** 2px Bottle Green outline, 3px offset, 2px radius.

### Hero Bar
The name (Name style) with the Bangla signature beside it at the left; a single row of four text links at the right (Email me, Resume, GitHub, LinkedIn), 500 weight, 28px apart, Email me emphasised. When space runs out the links wrap below the name, left-aligned. No header chrome, no background, no menu.

### Hero Statement
The Statement sentence in Ink, then the Lede in Ink Two. No green, no line; the timeline below supplies the hero's one line.

### Section Head (signature)
The section's Bangla word sits green in the rail at `--sh-size`; its headstroke is extended edge to edge as the section's matra. The English title (Title style, Ink) sits in the content column just below the band. The section stem hangs from this matra.

### Entry
A place: name and "years · location" in the rail; one or more stints in the content. Each stint shows its focus line (prefixed with green tabular years when a place has several stints), an optional citation, a detail paragraph, results as figures over labels, and an optional green-underlined link. On hover or focus-within, the stretch of section stem beside the entry thickens from 1.5px to 4px (scaleX, 220ms, `cubic-bezier(0.16, 1, 0.3, 1)`).

### Result Figure
Value-style tabular figure stacked above an Ink Three label, laid out in a wrapping row with 28-56px between results. No box, no badge.

### Ledger
Two-column list for awards and background: a 6.5rem tabular years column, then name, optional note and source. Rows separated by 8px padding only.

### Timeline (signature)
A transit strip map of the career, oldest stop first, closing the hero at full page width.
- **Track:** a 10px Bottle Green line, fully rounded, from the first start month to the build month at one scale. Each stop sits at its start month.
- **Stops:** Cool Paper dots with an Ink ring, 22px with a 4px ring. The current stop is 40px with a 13px ring, with a Bottle Green NOW tag (Tag style) below it.
- **Names:** angled above the track from the dot: Stop Wide at -40deg at 1200px and wider, Stop at -55deg below, so neighbours three months apart never touch. The current stop's name is 700, Stop Current size at 1200px and wider, and starts from the shoulder of its larger dot.
- **Branches:** a longer stint that ran alongside other work hangs under the track to its end date as a 6px Soft Green left and bottom border with a 16px elbow radius.
- **Years:** a Label-size tabular year scale in Ink Three below the track, each year starting at its January.
- **Hover / Focus:** the dot fills Bottle Green and its name turns green over 160ms. Each stop links to its entry.
- **Load motion (signature; CSS only, 641px and wider, only with no reduced-motion preference):** the track draws left to right at constant speed (linear, `--draw` 1600ms after `--draw-delay` 250ms). Each stop fades and rises 6px into place (420ms, ease-out) when the line reaches it: delay = draw-delay + t x draw, where t is the stop's position 0-1 on the track. The year scale fades in (600ms) when the draw ends. Without motion everything is simply present.
- **Phones (640px and below):** the track turns vertical at the left as the timeline's own 1.5px square stem, content indented `hang` beside it, newest first: small dots (14px, 3px ring; the current one 20px, 6px ring) sit on the stem, names at Stop size with years inline in Ink Three, 18px between stops. Branches and year scale are hidden; no load motion.

## Do's and Don'ts

### Do:
- **Do** cut every full-bleed green horizontal line to the matra band (`matra-top` 0.1815em to `matra-bottom` 0.278em, plus bleeds) of a Bangla word set at line-height 1, and run it edge to edge.
- **Do** hang a 1.5px green stem from each section's matra down the content-column edge and indent all content 18px beside it.
- **Do** keep U+0020 in the Bangla subset and re-run the subset and coverage scripts whenever Bangla text changes.
- **Do** set every date and number in tabular lining figures.
- **Do** show each place by organisation, years and the work done, with its measured result as a figure.
- **Do** draw the timeline at one true time scale ending at the build month, and keep the monthly rebuild that moves its end to today.
- **Do** keep the timeline's load motion tied to the line: a constant-speed draw, each stop arriving when the line reaches its position, and full content without motion.

### Don't:
- **Don't** use grey dividers, borders or hairlines between items; separate with space.
- **Don't** use shadows, gradients, icons, photographs or other imagery.
- **Don't** use green for fills, buttons, badges or decorative lines; the only green lines are headstrokes, stems and the timeline track, and the only green fill is a hovered or focused timeline stop.
- **Don't** add a dark scheme or `prefers-color-scheme` styles; the site is light only.
- **Don't** add a third type family or set Latin in the Bangla face.
- **Don't** show job titles anywhere in content.
