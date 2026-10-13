#!/bin/sh
# Renders public/og.png from scripts/og.html and public/apple-touch-icon.png from public/favicon.svg.
# Needs Google Chrome and ImageMagick.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --hide-scrollbars --force-prefers-reduced-motion --window-size=1200,630 \
  --screenshot="$PWD/public/og.png" "file://$PWD/scripts/og.html" >/dev/null 2>&1
# Same geometry as favicon.svg (a headstroke with one hanging stem) on a 32-unit grid, scaled 4.5x.
magick -size 180x180 xc:'#f2f4f4' -fill '#006a4e' \
  -draw 'rectangle 27,50 153,72' -draw 'rectangle 99,50 121,135' public/apple-touch-icon.png
