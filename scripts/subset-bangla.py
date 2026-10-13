"""Subset Anek Bangla to the Bengali text the site actually uses.

Run after changing any Bangla text in src/:  python3 scripts/subset-bangla.py
Pins the variable font to a static weight, then writes src/fonts/anek-bangla-subset.woff2 and
src/fonts/anek-bangla-subset.txt (the covered characters, which scripts/check-bangla.mjs verifies
on every build).
"""

import pathlib
import re
import subprocess
import sys
import tempfile
import unicodedata

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "node_modules/@fontsource-variable/anek-bangla/files/anek-bangla-bengali-wght-normal.woff2"
OUT = ROOT / "src/fonts/anek-bangla-subset.woff2"
COVERED = ROOT / "src/fonts/anek-bangla-subset.txt"
BENGALI = re.compile(r"[ঀ-৿]")
WEIGHT = 600  # The Bangla only ever renders at this weight; a static instance is a fraction of the size.

chars = set()
for path in (ROOT / "src").rglob("*"):
    if path.suffix in {".ts", ".astro", ".md"}:
        chars.update(BENGALI.findall(path.read_text(encoding="utf-8")))

if not chars:
    sys.exit("No Bengali text found under src/.")


def with_parts(ch):
    """A character plus its canonical parts. Shapers draw split vowel signs (ো, ৌ) by decomposing
    them, so ৌ renders correctly only if ে and ৗ are in the font too."""
    parts = {ch}
    for code in unicodedata.decomposition(ch).split():
        if not code.startswith("<"):
            parts |= with_parts(chr(int(code, 16)))
    return parts


chars = set().union(*(with_parts(ch) for ch in chars))

text = "".join(sorted(chars))
# The space must be in the font: CSS takes line-box metrics from the first font covering U+0020,
# and the matra positions in global.css assume that font is Anek Bangla, not a system fallback.
glyph_text = " " + text
static = pathlib.Path(tempfile.mkdtemp()) / "anek-bangla-static.ttf"
instance = instantiateVariableFont(TTFont(SOURCE), {"wght": WEIGHT})
instance.flavor = None
instance.save(static)
subprocess.run(
    [
        sys.executable, "-m", "fontTools.subset", str(static),
        f"--text={glyph_text}",
        "--layout-features=*",
        "--no-hinting",
        "--desubroutinize",
        "--flavor=woff2",
        f"--output-file={OUT}",
    ],
    check=True,
)
COVERED.write_text(text + "\n", encoding="utf-8")
print(f"{OUT.relative_to(ROOT)}: {len(chars)} characters, {OUT.stat().st_size} bytes")
