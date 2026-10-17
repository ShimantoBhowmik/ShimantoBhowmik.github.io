# Not found page

Any unknown path answers HTTP 404 with a page titled `Not found · Shimanto Bhowmik`, the heading
`Nothing hangs here` beside the Bangla word, and a link back to the home page. It is kept out of
search results with `noindex`.

## Sub-features

- `404-status` answers HTTP 404 for unknown paths, nested ones included.
- `404-content` shows the heading, the sentence and the `Go back to Shimanto Bhowmik` link.
- `404-noindex` carries `<meta name="robots" content="noindex">` and no canonical link.
- `404-home` returns to `/` from the link.

## How to get to it (user POV)

- Open any path that does not exist, such as `/no/such/page`.

## Driving it with drive.mjs

Preconditions:

- A healthy run from `site.sh up` (see [README](./README.md)).

- **Load it.** `goto:/no/such/page wait:800 aria:404.aria.txt shot:404.png "assert:document.querySelector('meta[name=robots]')?.content === 'noindex'" "assert:!document.querySelector('link[rel=canonical]')"`.
  The `goto` line logs `HTTP 404`; `404.aria.txt` has `heading "Nothing hangs here"` and
  `link "Go back to Shimanto Bhowmik"`.
- **Go home.** Continue with `"click:main a" "assert:location.pathname === '/'" shot:home.png`.
- **Phone.** `--mobile -- goto:/no/such/page wait:800 shot:404-phone.png`.

## Gotchas

- `astro preview` serves `404.html` the way GitHub Pages does. `npm run dev` does not, so prove
  this only against `site.sh up`.
- The 404 document itself is not a page error; `drive.mjs` ignores the top-level document
  status and still fails on any broken asset the page loads.
