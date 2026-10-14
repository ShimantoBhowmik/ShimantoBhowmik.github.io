# shimantobhowmik.github.io

Personal website, built with [Astro](https://astro.build). Static output; the only client JavaScript
is a few inline lines that reveal content as it scrolls into view.

## Editing content

Everything the site says lives in [`src/data/profile.ts`](src/data/profile.ts): work, research,
projects, awards, links. Layout code never hard-codes content.

If you add or change any Bangla text, regenerate the font subset (needs Python with `fonttools`):

```sh
npm run fonts
```

The build fails with a clear message if a Bangla character is missing from the subset.

The resume is served from [`public/resume.pdf`](public/resume.pdf).

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # font check, type check, static build into dist/
npm run lint     # prettier + astro check
```

## Deployment

Pushing to `mainline` builds and deploys through GitHub Actions
([`.github/workflows/site.yml`](.github/workflows/site.yml)). Pull requests run the same checks
without deploying.

One-time setup: in the repository's **Settings**, then **Pages**, set **Source** to **GitHub Actions**.

## Images

`public/og.png` (link previews) and `public/apple-touch-icon.png` are rendered from
[`scripts/og.html`](scripts/og.html) and the favicon geometry:

```sh
sh scripts/render-images.sh
```
