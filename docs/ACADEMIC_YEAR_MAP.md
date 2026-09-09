# Ibby Academic Year Map
**Model:** Flagship + Fast-Lane (D1 A / D2 A)
**Source:** 40 IB DP Biology topic PDFs in `source-pdfs-ib/` (+ Biology Notes.pdf)
**Status:** Draft after office-hours; codes match PDF filenames (corrected from Haiku drift)

## Premises
1. Full year = cover as much of the 40-topic syllabus as effort allows; not 40× Water-A1.1 MVP quality.
2. Hand-trace-everything does not scale → tiered content.
3. Reuse engine = generalize hardcoded `water-a1.1` / `BattleId` into config-driven episodes first.
4. No prod/AWS deploy without Carlos OK.

## Tiers
- **Flagship (19 topics):** full Water-A1.1 treatment (hand-trace SVGs, 3 battles, bridges, GSAP).
- **Fast-Lane (21 topics):** lighter 1–2 battle template, icon/reuse diagrams, thinner story.

## Flagship topics
- `A1.1` Water
- `A1.2` Nucleic Acids
- `A2.2` Cell Structure
- `A4.1` Evolution and speciation
- `B1.1` Carbohydrates and lipids
- `B1.2` Proteins
- `B2.1` Membranes and membrane transport
- `B3.2` Transport
- `C1.1` Enzymes and metabolism
- `C1.2` Cell respiration
- `C1.3` Photosynthesis
- `C2.2` Neural signalling
- `C3.2` Defence against disease
- `D1.1` DNA Replication
- `D1.2` Protein synthesis
- `D2.1` Cell and nuclear division
- `D3.2` Inheritance
- `D3.3` Homeostasis
- `D4.1` Natural selection

## Fast-Lane topics
- `A2.1` Origins of cells
- `A2.3` Viruses
- `A3.1` Diversity of organisms
- `A3.2` Classification and cladistics
- `A4.2` Conservation of biodiversity
- `B2.2` Organelles and compartmentalization
- `B2.3` Cell specialization
- `B3.1` Gas exchange
- `B3.3` Muscle and motility
- `B4.1` Adaptation to environment
- `B4.2` Ecological niches
- `C2.1` Chemical signalling
- `C3.1` Integration of body systems
- `C4.1` Populations and communities
- `C4.2` Transfers of energy and matter
- `D1.3` Mutation and gene editing
- `D2.2` Gene expression
- `D2.3` Water potential
- `D3.1` Reproduction
- `D4.2` Stability and change
- `D4.3` Climate change

## Next 12 priorities (after engine generalization)
1. A1.1 Water (done MVP)
2. A1.2 Nucleic Acids
3. A2.2 Cell Structure
4. B2.1 Membranes
5. B1.2 Proteins
6. C1.2 Cell respiration
7. C1.3 Photosynthesis
8. D1.1 DNA Replication
9. D1.2 Protein synthesis
10. D2.1 Cell division
11. D3.2 Inheritance
12. D4.1 Natural selection

## Platform vs content
- **Platform (once):** multi-episode schema, progress by episode id, Fast-Lane template, shared notebook UI, classmate Form pattern.
- **Per episode:** mystery hook, battles, diagrams from Ibby notes, teach-back copy.

## Success metrics
- ≥3/5 comprehension on Form for flagships; fun ≥7/10; diagram authenticity ≥80% Yes/Kinda.
- Year: all 40 topics have at least Fast-Lane playable; ≥8 Flagships shipped.

## Non-goals
- No AWS/Vercel prod without OK; no multiplayer; no full rewrite of A1.1 engine for each topic.
