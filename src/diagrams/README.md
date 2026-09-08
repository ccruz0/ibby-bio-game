# Diagram trace map (Water A1.1)

Hand-traced production SVGs (pass 1) — organic notebook paths in Ibby's locked palette,
with the group IDs the GSAP timelines and battle validators already target. Original
placeholders backed up in `placeholders-backup/`.

| SVG file | Status | Battle / scene | Source page (in `note-previews/`) |
|---|---|---|---|
| `molecule.svg` | **HAND-TRACED** | Battle 1 — drag-label / Setup reveal | `biology-notes-02.png` (Water a1.1 — O+2H overlapping covalent) |
| `hbond.svg` | **HAND-TRACED** | Battle 2 — matching / Battle 3 reveal | `biology-notes-03.png` + `notes-p-06.png` |
| `cohesion.svg` | **HAND-TRACED** | Battle 3 — scenario, teach-back | `notes-p-05.png` (1 bond = weak / many bonds = strong) |
| `strider.svg` | **HAND-TRACED** | ResolutionScene hero | `notes-p-06.png` (water strider on wavy surface) |
| `xylem.svg` | **HAND-TRACED** | ResolutionScene recap / hint | `notes-p-04.png`, `notes-p-07.png` |
| `solute.svg` | **HAND-TRACED** (future stub) | Out of scope for MVP | `notes-p-08.png` (solvent/solute/solution) |

Full-resolution source: `source-pdfs-ib/Biology Notes.pdf` and
`source-pdfs-ib/IB Biology A1.1 Water 2-15.pdf` (symlinked at the project root).

Palette (locked, do not deviate): oxygen `#e84393`, hydrogen `#f4d03f`, water fill
`#87ceeb`, keyword red `#e74c3c`, heading purple `#8e44ad`, ink `#2c3e50`, h-bonds dashed.

## ID stability notes (hand-trace pass 1)
- All required group/element ids preserved (see timelines + Battle1 dropzones).
- `#molecule_1_bonds line` and `#hbond_1_dashes line` remain `<line>` for GSAP draw/fade.
- Dropzone centers unchanged: `(200,150)`, `(130,220)`, `(270,220)`.
- `xylem_1_water` is now a soft path fill (was a rect); id kept.
- Optional Figma upload still useful for Ibby visual review / polish — not blocking MVP.
