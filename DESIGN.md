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
  ground-dark: "#0d1210"
  ink-dark: "#e6ebe7"
  ink-2-dark: "#b2bcb6"
  ink-3-dark: "#8f9a94"
  rule-dark: "#2a332e"
  green-dark: "#3cb48a"
typography:
  display:
    fontFamily: "Anek Bangla Matra, Noto Sans Bengali, Bangla Sangam MN, sans-serif"
    fontSize: "clamp(3.25rem, 12.2vw, 12.5rem)"
    fontWeight: 600
    lineHeight: 1
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
    lineHeight: 1.3
    letterSpacing: "-0.01em"
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
rounded:
  focus: "2px"
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
    textColor: "{colors.green}"
    typography: "{typography.display}"
  entry:
    padding: "clamp(28px, 3.2vw, 44px) 0"
  result-figure:
    textColor: "{colors.ink}"
    typography: "{typography.value}"
  contact-email:
    textColor: "{colors.ink}"
    typography: "{typography.headline-latin}"
---

# Design System: Shimanto Bhowmik

## Overview

**Creative North Star: "The Matra"**

One horizontal line, the matra, crosses the page and everything hangs from it, the way Bangla letters hang from their headstroke. The line is not drawn beside the type; it is the type. Every green rule on the page is the headstroke of a Bangla word, measured from the font and run edge to edge, and every vertical green line is a stem dropped from that headstroke down the edge of the content it carries.

The world is flat, cool paper and near-black ink with one bottle green (Bangladesh flag green) that owns every structural line. Type and line carry every value: there are no cards, icons, photographs, shadows or gradients, and depth comes only from flat overlap where a stem passes behind a letter. Density is moderate and editorial; results are set as figures on a strict tabular column, never as badges.

Motion follows handwritten Bangla: the letters appear first, the headstroke is drawn across them last, once, on load, and the stems drop from it. Reading an entry thickens the stretch of stem beside it.

**Key Characteristics:**
- One green, used only for structural lines, the Bangla words those lines belong to, and emphasis underlines.
- Every horizontal green line is a Bangla headstroke run full-bleed; every vertical green line is a stem hanging from one.
- A single axis: the left edge of the content column, with all read content indented 18px off its stem.
- Two families: Anek Bangla (subset) for Bangla, Anek Latin for all Latin; tabular lining figures for every date and number.
- Flat. No borders between items, no shadows, no gradients, no icons, no imagery.

## Colors

Cool paper, green-tinted near-black ink in three strengths, and one bottle green that is structure, not decoration. Every colour has a dark-scheme counterpart set by `prefers-color-scheme`.

### Primary
- **Bottle Green** (`green`, dark `green-dark`): the matra lines, the stems, the Bangla name and section words, the emphasised link underline, the hover underline of every link, focus outlines, text selection background, and the per-stint years inside an entry. Nothing else.

### Neutral
- **Cool Paper** (`ground`, dark `ground-dark`): the only background. Also the colour of the text-stroke knockout that parts stems from glyphs.
- **Ink** (`ink`, dark `ink-dark`): names of places, titles, result figures, the lede's leading name, the contact address.
- **Ink Two** (`ink-2`, dark `ink-2-dark`): running prose: the lede, detail paragraphs, summaries, notes.
- **Ink Three** (`ink-3`, dark `ink-3-dark`): metadata: years, locations, result labels, stacks, sub-labels, footer.
- **Rule Grey** (`rule`, dark `rule-dark`): the resting underline of ordinary links and the scrollbar thumb. It is never a divider.

### Named Rules
**The One Green Rule.** Green belongs to the line system and the Bangla words it comes from. It may underline the primary action and appear on hover and focus; it never fills a surface, a button, or a badge.

**The No Grey Divider Rule.** Items are separated by space alone. Rule Grey exists only under resting links; there are no borders, hairlines or dividers anywhere.

## Typography

**Display Font:** Anek Bangla Matra (a build-time subset of Anek Bangla 600, with Noto Sans Bengali, Bangla Sangam MN fallback)
**Body Font:** Anek Latin Variable (with system-ui fallback)

**Character:** One superfamily in two scripts. The Bangla is large, green and structural; the Latin is quiet, semibold for names and regular for prose, so the line does the shouting.

### Hierarchy
- **Display** (Bangla 600, `clamp(3.25rem, 12.2vw, 12.5rem)`, line-height 1): the Bangla name in the hero only, green, no-wrap, full-bleed matra fused through its headstroke.
- **Headline** (Bangla 600, `--sh-size`, line-height 1): the Bangla word of each section head, green, in the rail. Sized from the rail so the widest word (যোগাযোগ, 4.2em) always fits; on narrow screens `clamp(2.5rem, 10vw, 3.75rem)`.
- **Headline Latin** (600, sized from the content column, line-height 1.1, -0.02em): the contact email address only, sized so it never breaks.
- **Lede** (400, fluid 1.25-1.75rem, line-height 1.3, -0.01em, max 34ch): the one-sentence introduction; the Latin name inside it is Ink at 600.
- **Title** (600, fluid 1.375-1.75rem, line-height 1.2, -0.01em): place names, hero column names, English section titles.
- **Focus** (600, 1.1875rem, line-height 1.3, max 44ch, balanced): what was built in each stint.
- **Value** (600, 1.375rem, line-height 1.15, tabular): result figures, set above their label.
- **Body** (400, 1.0625rem, line-height 1.55, max 66ch): detail prose.
- **Label** (400, 0.875rem): years, locations, result labels, stacks, sub-labels, in Ink Three.

### Named Rules
**The Tabular Column Rule.** Every date and number uses tabular lining figures. Years read as a strict column.

**The Space-Owns-The-Line Rule.** The Bangla subset must contain U+0020. CSS takes line-box metrics from the first font that covers the space; if the subset lacks it, the Latin face sets the line box and every matra measurement drifts off the glyph bar. Re-run the subset script whenever Bangla text changes; the coverage check fails the build on a missing character.

## Layout

One 12-column grid inside page padding (`pad`, 16-96px) with a fluid `gutter` (16-32px). Columns 1-3 are the **rail**, holding what hangs at the left of each line (the Bangla section word, place name, years, location). Columns 4-12 are the **content**, holding everything read. At 860px and below the rail and content stack to full width and the section stem moves to the page edge.

Sections open with `section-gap` (104-176px) above the section head. Entries within a section are padded 28-44px top and bottom, first entry flush. Items in lists are separated by 8px of padding, never by a line.

The matra band is measured from the font: with line-height 1, the headstroke sits from `matra-top` (0.1815em) to `matra-bottom` (0.278em) below the top of the line box. Green lines extend past it by `matra-bleed-top` (0.014em, the larger bleed because the top edge lands on fractional pixels) and `matra-bleed` (0.006em) so the glyph bar's anti-aliased rim never shows.

Hero: lede in columns 1-7, actions in 9-12 right-aligned; then the Bangla name, offset by `hang`, with four columns hanging below it (two at 1080px, one at 560px). Each stem drops from the bottom of the matra to the foot of its column; stems for wrapped rows start just above their row and lose their root.

Breakpoints in use: 1080px, 860px, 720px, 560px.

### Named Rules
**The Headstroke Rule.** Every horizontal green line is a Bangla word's headstroke, cut to the measured matra band and run edge to edge of the viewport. Never draw a green line that is not attached to a Bangla word.

**The Hanging Rule.** Every section hangs a `stem` (1.5px) green line from the bottom of its matra down the left edge of the content column to the foot of the section. All content in the section sits `hang` (18px) to the right of it. On phones the stem moves to the page edge and the rail is indented 18px too.

## Elevation & Depth

Fully flat. There is no shadow vocabulary. The only depth is flat overlap: in the hero, stems pass behind the Bangla glyphs with a clean break, made by a ground-coloured text stroke (0.08em, `paint-order: stroke fill`) painted under each glyph, while the matra line sits on top of both. Each stem's root (0.08 of the name size tall) is painted above the glyphs so the knockout never parts a stem from its line.

### Named Rules
**The Flat Overlap Rule.** Depth is shown only by a line passing behind a letter. No shadows, no blur, no gradients, no tonal surfaces.

## Shapes

Square and linear. Everything is a line or a letter: full-bleed horizontal bands, 1.5px vertical stems that thicken to 4px on hover or focus, and underlines (1.5px resting, 3px on the primary action, 0.06em on the contact address). The only radius is the 2px on the focus outline. The favicon is the system in miniature: a green headstroke bar with a stem dropping from it.

## Components

### Links
Underlined text, never buttons.
- **Default:** inherits text colour; 1.5px underline in Rule Grey, offset 0.22em.
- **Hover:** underline turns Bottle Green over 160ms.
- **Primary action (Email me):** weight 650, 3px Bottle Green underline at rest.
- **Focus:** 2px Bottle Green outline, 3px offset, 2px radius.

### Navigation
A single row of four text links at the top right of the hero (Email me, Resume, GitHub, LinkedIn), 500 weight, 28px apart, wrapping and left-aligned below 860px. No header bar, no menu.

### Section Head (signature)
The section's Bangla word sits green in the rail at `--sh-size`; its headstroke is extended edge to edge as the section's matra. The English title (Title style, Ink) sits in the content column just below the band. The section stem hangs from this matra.

### Entry
A place: name and "years · location" in the rail; one or more stints in the content. Each stint shows its focus line (prefixed with green tabular years when a place has several stints), an optional citation, a detail paragraph, results as figures over labels, and an optional green-underlined link. On hover or focus-within, the stretch of section stem beside the entry thickens from 1.5px to 4px (scaleX, 220ms, `cubic-bezier(0.16, 1, 0.3, 1)`).

### Result Figure
Value-style tabular figure stacked above an Ink Three label, laid out in a wrapping row with 28-56px between results. No box, no badge.

### Ledger
Two-column list for awards and background: a 6.5rem tabular years column, then name, optional note and source. Rows separated by 8px padding only.

### Hero Name (signature)
The Bangla name at Display size, green, full-bleed, with the matra fused through its headstroke and four stems hanging to the recent-work columns. Load sequence (only with no reduced-motion preference): glyphs fade and settle 700ms; matra draws left to right 1200ms from 380ms; stems drop 800ms from 900ms, staggered 90ms. Hovering a column thickens its stem to 4px.

## Do's and Don'ts

### Do:
- **Do** cut every green horizontal line to the matra band (`matra-top` 0.1815em to `matra-bottom` 0.278em, plus bleeds) of a Bangla word set at line-height 1, and run it edge to edge.
- **Do** hang a 1.5px green stem from each section's matra down the content-column edge and indent all content 18px beside it.
- **Do** keep U+0020 in the Bangla subset and re-run the subset and coverage scripts whenever Bangla text changes.
- **Do** pass stems behind glyphs with a ground-coloured text-stroke knockout and paint their roots above the glyphs.
- **Do** set every date and number in tabular lining figures.
- **Do** show each place by organisation, years and the work done, with its measured result as a figure.

### Don't:
- **Don't** use grey dividers, borders or hairlines between items; separate with space.
- **Don't** use shadows, gradients, icons, photographs or other imagery.
- **Don't** use green for fills, buttons, badges or decorative lines not attached to a Bangla word.
- **Don't** add a third type family or set Latin in the Bangla face.
- **Don't** show job titles anywhere in content.
