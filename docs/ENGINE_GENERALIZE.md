# Engine Generalization

Platform step from `docs/ACADEMIC_YEAR_MAP.md`: the game engine no longer hardcodes
`water-a1.1` or a fixed `battle_1/2/3` set. Any episode is a plain config object;
the routes, progress tracking, and scene/battle components are generic over it.

## EpisodeConfig schema

Defined in `src/episodes/types.ts`. Shape:

```ts
interface EpisodeConfig {
  id: string;              // used in routes: /e/:id/...
  title: string;
  tier: "flagship" | "fast-lane";
  setup: SceneCopy & { cta: string };
  battles: BattleConfig[]; // ordered — defines progression
  bridges: Partial<Record<string /* battleId */, BridgeConfig>>;
  resolution: SceneCopy;
}
```

- `battles` is an ordered array. Finishing `battles[i]` advances to `bridges[battles[i].id]`
  if one exists, otherwise straight to `battles[i + 1]`, or to `resolution` if it was the
  last battle. This logic lives in `src/episodes/navigation.ts` and is the same for every
  episode — episodes never need to know their own routes.
- `BattleConfig` is a discriminated union on `type`: `"drag-label" | "match" | "scenario"`.
  Each variant (`LabelBattleConfig`, `MatchBattleConfig`, `ScenarioBattleConfig`) carries the
  data a generic battle component needs (zones/answer keys/options, diagrams as raw SVG
  strings, teach-back copy, hint copy) — no episode-specific JSX or logic.
- `SceneCopy` (setup/resolution) is `{ heading, body, diagramSvg, playRevealAnimation? }`.

Progress (`src/types/index.ts`) is keyed generically too: `PlayerProgress.episode: string` and
`PlayerProgress.battles: Record<string, BattleProgress>` (previously a fixed `"water-a1.1"` /
`BattleId` union). `useProgress(episodeId, totalBattles)` persists to
`localStorage["ibby-bio-game:progress:<episodeId>"]`, so different episodes' progress never
collide.

## Routes

| Path | Scene |
|---|---|
| `/episodes` | Episode picker (lists everything in the registry) |
| `/e/:episodeId/setup` | `SetupScene` |
| `/e/:episodeId/battle/:battleId` | `EpisodeBattleScene` — dispatches to `LabelBattle` / `MatchBattle` / `ScenarioBattle` by `battle.type` |
| `/e/:episodeId/bridge/:bridgeId` | `StoryBridge` |
| `/e/:episodeId/resolution` | `ResolutionScene` |

Legacy routes redirect to the `water-a1.1` episode so old links/bookmarks keep working:
`/` → `/e/water-a1.1/setup`, `/battle/1|2|3` → `/e/water-a1.1/battle/battle_1|2|3`,
`/bridge/:id` → `/e/water-a1.1/bridge/:id`, `/resolution` → `/e/water-a1.1/resolution`.
See `src/App.tsx`.

## How to add an episode

1. Create `src/episodes/<episode-id>.tsx` exporting an `EpisodeConfig` (see
   `src/episodes/water-a1.1.tsx` for a full flagship example with all three battle types and
   two bridges, or `src/episodes/cells-a2.1-demo.tsx` for a minimal one-battle Fast-Lane shape).
2. Import raw SVG diagrams with the `?raw` Vite suffix, or reuse an existing one from
   `src/diagrams/` as a placeholder for a quick Fast-Lane draft.
3. Register it in `src/episodes/registry.ts` (add to the `episodes` map).
4. It's now playable at `/e/<episode-id>/setup` and listed at `/episodes`. No route, engine,
   or progress-tracking code needs to change.

Fast-Lane episodes are just `EpisodeConfig`s with `tier: "fast-lane"`, 1–2 battles, and no
(or few) `bridges` entries — the same schema as Flagship, just thinner content.

## What stayed hardcoded on purpose

- The three battle *component* implementations (`LabelBattle`, `MatchBattle`, `ScenarioBattle`)
  are generic renderers, not per-episode code — adding an episode never means writing a new
  battle component, only new config data of an existing `BattleConfig` shape.
- If a future episode needs a genuinely new interaction (not label/match/scenario), that's a
  new `BattleConfig` variant + generic component, following the same pattern.
