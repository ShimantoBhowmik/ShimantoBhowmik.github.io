# Contact and links

The visitor reaches the owner by email or through the resume and profile links. The hero bar
links to email, resume, Google Scholar, GitHub and LinkedIn. The Contact section repeats them with
the email address set large, adds YouTube, and the footer carries the year, name and city.

## Sub-features

- `contact-email` links `bhowmikshimanto@gmail.com` with `mailto:` from `Email me` and the large
  address.
- `contact-resume` serves `/resume.pdf` from `Resume` and `Resume (PDF)`.
- `contact-profiles` links Google Scholar, GitHub, LinkedIn and YouTube to the URLs in `links`.
- `contact-footer` shows `© <build year> Shimanto Bhowmik · Arlington, VA.`
- `contact-fit` keeps the large address on one line without sideways scroll at every width.

## How to get to it (user POV)

- Use the links in the hero bar.
- Scroll to the end of the page to `Contact`.

## Driving it with drive.mjs

Preconditions:

- A healthy run from `site.sh up` (see [README](./README.md)).

- **Hrefs.** `goto:/ "eval:[...document.querySelectorAll('nav[aria-label=\"Contact and profiles\"] a, .contact a')].map(a => a.textContent.trim() + ' -> ' + a.getAttribute('href'))"`.
  Logs `mailto:bhowmikshimanto@gmail.com`, `/resume.pdf`, and the Scholar, GitHub, LinkedIn and
  YouTube URLs from `links` in `src/data/profile.ts`.
- **Resume opens.** `goto:/ wait:2500 "click:nav[aria-label=\"Contact and profiles\"] a[href=\"/resume.pdf\"]" wait:1500 "eval:location.pathname + ' ' + document.contentType"`.
  Logs `/resume.pdf application/pdf`. Add `--allow-errors` and expect exactly one entry in
  `errors.jsonl`, `404 …/favicon.ico` (see Gotchas).
- **Contact section.** `goto:/ wait:2500 key:End wait:1500 shot:contact.png "text:footer"`.
  `contact.png` shows the address on one line, the five links and the footer; the footer text
  names the current year.
- **Address fits.** For each of `--mobile`, `--viewport 860x1000` and the default:
  `goto:/ "assert:document.querySelector('a.email').getBoundingClientRect().height < 2 * parseFloat(getComputedStyle(document.querySelector('a.email')).fontSize)" "assert:document.documentElement.scrollWidth <= innerWidth"`.

## Gotchas

- Do not click `mailto:` or external links; a headless browser cannot prove a mail client or a
  third-party site. Prove the `href`.
- The footer year is the build year, not the visit year.
- After `click` on the resume the page is Chrome's PDF viewer, so later steps cannot read the
  site's DOM. End the drive or `goto:/` again.
- Known gap (October 2026): the site has no `/favicon.ico`. A PDF cannot declare an icon, so
  opening `/resume.pdf` makes the browser request `/favicon.ico`, which answers 404, and the
  resume tab shows a generic icon. The resume drive fails on that error without `--allow-errors`.
