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

## Status: Water A1.1 playable locally; polish pass in progress

Water A1.1 runs end-to-end in the browser (Setup → B1 → bridge → B2 → bridge → B3 →
Resolution). Hand-trace pass 1 for the production SVGs is done (see
`src/diagrams/README.md`). Notebook UI chrome plus Slice B story bridges / teach-back
are in this polish pass. AWS SAM progress stack remains **undeployed** — see
`infrastructure/README.md` for the cost profile and Conductor-OK gate before any
`sam deploy`.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173 — Setup → B1 → bridge → B2 → bridge → B3 → Resolution
npm test          # unit + integration tests (vitest)
```

No AWS credentials or backend needed to play locally — progress is stored in
`localStorage` until a backend is deployed (see `infrastructure/`).

## Structure

```
src/
  scenes/       SetupScene, StoryBridge, ResolutionScene (story frame + bridges)
  battles/      Battle1_Label (drag), Battle2_Match (pair), Battle3_Scenario (MC)
  hooks/        useQuizValidation (scoring), useProgress (local + API)
  context/      GameContext (React Context session state)
  diagrams/     placeholder SVGs — see diagrams/README.md for trace-source map
  animations/   GSAP timelines per diagram
  api/          progress.ts — REST client for the (undeployed) AWS backend
infrastructure/ AWS SAM template + Lambda handlers (NOT deployed)
tests/          unit (quiz logic, API client) + integration (Setup→Battle1 flow)
```

## Next up (builder-owned)

Hand-trace pass 1 + Slice A chrome + Slice B bridges are in. Remaining: optional Figma
upload for Ibby visual review and playtest iteration — still no production deploy without
Conductor OK.
