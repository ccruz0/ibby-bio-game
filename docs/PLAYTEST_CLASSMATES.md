# Slice C — Classmate Playtest Pack (Facilitator Guide)

**Episode:** Water A1.1 — *The Water Strider Mystery*  
**Audience:** Ibby + 5–10 classmates (private playtest)  
**Mode:** Docs-only pack — no AWS/Vercel deploy. Host locally (`npm run dev`) or via a hosting URL **only after Carlos OK**.  
**Session length:** ~30–60 min total (intro + 5–10 min play + form + debrief)

Related: [PLAYTEST_FORM_QUESTIONS.md](./PLAYTEST_FORM_QUESTIONS.md) (paste into Google Forms).

---

## Purpose

Validate that the hybrid quiz-story loop works for real classmates — not just the builder:

- Do players finish the mystery path without blockers?
- Do they learn Water A1.1 ideas (polarity → H-bonds → cohesion / surface tension → strider)?
- Do Ibby's hand-traced diagrams feel authentic (notebook notes, not stock art)?
- Is the 5–10 minute flow fun and clear enough for a school-year playtest?

Success targets come from the approved design (`design-hybrid-water-a11-2026-09-08.md` → Playtest Success Criteria).

---

## Facilitator script (2–3 min intro)

Say roughly this before they open the game:

> Hi — thanks for helping Ibby playtest her biology game. Today you're co-investigators with Ibby: there's a mystery at the pond — **why can water striders walk on water?** You'll play a short episode on the laptop or iPad: a quick setup, three short "evidence" battles, tiny story bridges between them, then a resolution. It should take about **five to ten minutes**. There are no grades — we're watching whether the diagrams and story make sense, where people get stuck, and whether it feels like Ibby's notes came to life. When you finish the mystery (or if you get stuck), fill out the short Google Form. Think out loud if you want; I'll take notes. Ready? Open the link / start the local server and hit **Start the investigation**.

Optional one-liner if someone asks "is this a test?":

> It's a playtest of the *game*, not a quiz of *you*. Wrong answers and stuck moments are useful data.

---

## 5–10 min play flow

Guide players through this path (matches the in-app route):

| Step | Screen | What happens |
|------|--------|----------------|
| 1 | **Setup** | Mystery premise + molecule tease → *Start the investigation* |
| 2 | **B1** — Label | Drag O / H labels onto the water molecule (touch matters here) |
| 3 | **Bridge 1** | Teach-back tease → H-bonds next |
| 4 | **B2** — Match | Click pairs of molecules to draw hydrogen bonds |
| 5 | **Bridge 2** | Cohesion / surface-tension tease → pond prediction |
| 6 | **B3** — Scenario | Multiple choice: why the strider doesn't sink |
| 7 | **Resolution** | Mystery solved recap + score chip |

Facilitator tips during play:

- Let them struggle ~30–60s before a gentle hint; note the stuck point first.
- Don't spoil B3's correct option; if needed, point back to Evidence 2 language ("what holds water together at the surface?").
- If someone finishes early, ask them to wait quietly or jot one thing they liked before the form.

---

## Device notes

| Device | Expectation |
|--------|-------------|
| **Laptop / desktop** | Primary path. Chrome or Safari preferred. Window ≥ ~1280×800 if possible. |
| **iPad** | Supported target (portrait + landscape). Watch **Battle 1 drag-label** closely — touch drag was called out as an early risk in design. |
| **Phones** | Not a success target for this slice; note if someone tries anyway. |

Practical checklist before the session:

1. Run `npm install && npm run dev` (or open the Carlos-approved host URL).
2. Smoke the full path once on the same WiFi the class will use.
3. Confirm touch drag works on at least one iPad for B1.
4. Have the Google Form link ready (build from [PLAYTEST_FORM_QUESTIONS.md](./PLAYTEST_FORM_QUESTIONS.md)).
5. Progress uses `localStorage` — each browser/device is a separate player; clearing site data resets.

**Hosting / deploy:** AWS SAM and Vercel remain **undeployed** until Carlos OK. Prefer localhost or a temporary share Carlos has approved. Do not `sam deploy` or push production hosting as part of this playtest pack.

---

## What to observe (live notes)

Use a simple grid (player initials × row). Mark ✓ / ~ / ✗ or free notes.

1. **Diagram clarity** — Can they parse molecule, H-bond dashes, cohesion chain, strider without asking "what am I looking at?"
2. **Stuck points** — Where do they pause, spam click, or ask for help? (Setup CTA, B1 drop zones, B2 pairing, B3 wording, bridges.)
3. **Text clarity** — Do keywords (*hydrogen bonds*, *cohesion*, *surface tension*) land? Any jargon that needs a glossary?
4. **Fun / narrative authenticity** — Do they smile, lean in, talk about the mystery? Does it feel like Ibby's notebook, or generic edtech?
5. **Device / touch** — Especially B1 on iPad: missed drops, finger vs chip offset, accidental scrolls.
6. **Completion** — Did they finish ≥2 of 3 battles without a hard blocker?

Capture exact quotes when possible ("the dashed lines looked like Ibby's notes").

---

## Success criteria (from design)

### Learning & engagement

| Criterion | Target |
|-----------|--------|
| **Comprehension** | ≥ **3/5** correct on post-play Water A1.1 questions (Google Form) |
| **Fun** | Mean **≥ 7/10** |
| **Narrative clarity** | **≥ 80%** yes — story helped them see why the mystery mattered |

### Usability & technical

| Criterion | Target |
|-----------|--------|
| **Zero blockers** | All players complete **≥ 2 of 3** battles without getting stuck |
| **iPad comfort** | No horizontal scroll; readable text; B1 touch usable |
| **Loading** | No perceptible lag on typical school/home WiFi |

### Design fidelity

| Criterion | Target |
|-----------|--------|
| **Diagram authenticity** | **≥ 80%** "yes" or "kinda" on "Do these look like they're from Ibby's notes?" (not "no") |
| **Palette / hand-drawn feel** | Qualitative — connected to biology learning? |

### Iteration signals (after the form)

- **&lt;70%** hit comprehension → revise quiz difficulty or teach-back clarity.
- **&lt;7/10** fun → faster pacing, stronger visual feedback, or narrative reframing.
- Confusion on one concept → re-trace that diagram or add hints.

---

## Session outline (facilitator clock)

| Time | Activity |
|------|----------|
| 0:00–0:03 | Intro script |
| 0:03–0:15 | Play (5–10 min typical; allow buffer) |
| 0:15–0:25 | Google Form (comprehension + Likert + free text) |
| 0:25–0:40 | Optional group debrief (what felt like Ibby's notes? where stuck?) |
| After | Facilitation notes → Carlos / builder for Slice C iteration |

---

## After the session

1. Export Google Form responses (CSV).
2. Tally comprehension (3/5+), fun mean, narrative %, authenticity %.
3. List top 3 stuck points and any B1-iPad issues.
4. Do **not** treat this pack as permission to deploy — hosting/AWS still need Carlos OK.
