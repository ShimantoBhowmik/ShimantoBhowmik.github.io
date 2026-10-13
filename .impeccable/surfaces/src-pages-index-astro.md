---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/404.astro"]
---

# Homepage

Scope: the single-page personal site (src/pages/index.astro) plus the 404. Visitor mode: Persuade.

Audience and job: engineers, hiring managers and collaborators arriving from LinkedIn, GitHub, a resume or the paper; they want to know in seconds what he builds and how strong he is, then write to him or open the resume.

Primary action: email (bhowmikshimanto@gmail.com). Secondary: resume PDF, GitHub, LinkedIn.

Proof: measured outcomes from the resume set beside each place (days to minutes, 60% faster release, 85% faster onboarding), the Bengali LLM paper, awards.

Constraints: no job titles anywhere; reads as mid-level; years only on dates; two type families max; no imagery.

## Direction contract

THESIS: One horizontal line, the matra, crosses the page and everything hangs from it, the way Bangla letters hang from their headstroke. Refuses the centred single column, the dark dev template, and the row of equal cards.

OWN-WORLD: Cool paper white ground, near-black ink, one bottle green (Bangladesh flag green) that owns every structural line: the full-bleed matra rules and the vertical stems that drop from them. Anek Bangla for the Bangla name, Anek Latin for all Latin text, tabular figures for dates and numbers. No icons, photos, cards, shadows, or gradients; depth only by flat overlap.

STORY: Visitor reads who he is and what he builds in one line, sees his name in Bangla sitting on the line, scans the work hanging below with results, keeps scrolling through work, projects, research, recognition, then writes to him.

FIRST VIEWPORT: Top row: one-sentence lede at left, Email (emphasised) / Resume / GitHub / LinkedIn at right. Name সীমান্ত ভৌমিক set very large in green, its headstroke fused with a full-bleed green matra at about 40% height. From the matra hang four stems: AWS, FinPilot, Amazon AGI, Stanford AI Lab, each with years and one measured line. Latin name hangs directly under the Bangla.

FORM: Matra, rank 1 of the grounded list (shown as IMPECCABLE'S PICK, chosen by the user over the roll), seed key 6722888c. Signature interaction: as in handwritten Bangla, the letters appear first and the headstroke is drawn across them last, once, on load; hovering an entry thickens its stem. Kept disciplines: type and line carry every value; one axis everything aligns to; each place shows its measured result; tabular numerals on one strict column.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Decisions made at finish review

- The Latin name leads the lede rather than hanging under the Bangla name. The lede is first in reading order, so a visitor who cannot read Bangla has the name before meeting সীমান্ত ভৌমিক; a second Latin name under the Bangla would repeat it, and the space under the name belongs to the hanging stems.
- Section order is Work, Research, Projects (the STORY line above lists projects before research). The published paper is stronger evidence of a mid-level engineer than side projects, and Stanford AI Lab already appears in the first viewport, so Research follows Work directly.
- Awards stay complete (the user asked to keep them) but RIT leadership/service awards and scholarships are grouped into one row each, so the three distinguishing awards lead and the list does not read as a new-grad page.
