# Ibby Bio Game — Water A1.1 MVP

Web-first hybrid quiz-story game: the player + Ibby investigate "why do water striders
walk on water?" through 3 quiz battles built on Ibby's own hand-drawn biology notes
(`source-pdfs-ib/` — 41 topic PDFs + `Biology Notes.pdf`).

Spec: `/home/box/.gstack/projects/ibby-bio-game/specs/20260908-153738-213319-water-a11-mvp-spec.md`
Design: `/home/box/.gstack/projects/ibby-bio-game/design-hybrid-water-a11-2026-09-08.md`

Constraints (Carlos 2026-09-08):
- Build via Claude Code + gstack only (Haiku = cheap model)
- Pipeline: /office-hours → /spec → plan/build later
- No production deploy without OK
- HARD: Note-based animations from Ibby's Biology Notes.pdf diagrams (not generic stock art)

## Status: scaffold (no art polish yet)

This is the implementation scaffold for the locked tech stack — React Router shell,
stub scene/battle components, custom quiz-validation logic, placeholder SVG diagrams
(traced-page references in `src/diagrams/README.md`), and an **undeployed** AWS SAM
stack for anonymous progress sync. See `infrastructure/README.md` for the AWS cost
profile and the Conductor-OK gate before any `sam deploy`.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173 — Setup → Battle 1 → 2 → 3 → Resolution
npm test          # unit + integration tests (vitest)
```

No AWS credentials or backend needed to play locally — progress is stored in
`localStorage` until a backend is deployed (see `infrastructure/`).

## Structure

```
src/
  scenes/       SetupScene, ResolutionScene (story frame)
  battles/      Battle1_Label (drag), Battle2_Match (pair), Battle3_Scenario (MC)
  hooks/        useQuizValidation (scoring), useProgress (local + API)
  context/      GameContext (React Context session state)
  diagrams/     placeholder SVGs — see diagrams/README.md for trace-source map
  animations/   GSAP timelines per diagram
  api/          progress.ts — REST client for the (undeployed) AWS backend
infrastructure/ AWS SAM template + Lambda handlers (NOT deployed)
tests/          unit (quiz logic, API client) + integration (Setup→Battle1 flow)
```

## Next up (builder-owned, non-code)

Hand-trace the 5–8 diagrams in Figma from the exact source pages listed in
`src/diagrams/README.md`, preserving Ibby's palette and organic line weight, then
swap them into the existing SVG group IDs (animations and battle validators already
target those IDs, so no other code changes needed).
