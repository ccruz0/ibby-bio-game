import { describe, expect, it } from "vitest";
import { episodeList } from "../../src/episodes/registry";

/**
 * Guard rail: a new episode cannot ship without spoken names. The types already
 * make these fields required, but nothing stops someone passing an empty string.
 */
describe("every episode is describable out loud", () => {
  it("gives every diagram, drop zone and match node a non-empty spoken name", () => {
    const missing: string[] = [];

    for (const episode of episodeList) {
      for (const battle of episode.battles) {
        const where = `${episode.id}/${battle.id}`;
        if (battle.type === "drag-label") {
          if (!battle.diagramDescription.trim()) missing.push(`${where}: diagramDescription`);
          for (const zone of battle.zones) {
            if (!zone.accessibleLabel.trim()) missing.push(`${where}: zone ${zone.id}`);
          }
        }
        if (battle.type === "match") {
          if (!battle.diagramDescription.trim()) missing.push(`${where}: diagramDescription`);
          for (const node of battle.nodes) {
            if (!node.accessibleLabel.trim()) missing.push(`${where}: node ${node.id}`);
          }
        }
      }
    }

    expect(missing).toEqual([]);
  });
});
