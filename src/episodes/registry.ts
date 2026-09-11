import { cellStructureA22 } from "./cell-structure-a2.2";
import { cellsA21Demo } from "./cells-a2.1-demo";
import { nucleicAcidsA12 } from "./nucleic-acids-a1.2";
import type { EpisodeConfig } from "./types";
import { waterA11 } from "./water-a1.1";

const episodes: Record<string, EpisodeConfig> = {
  [waterA11.id]: waterA11,
  [nucleicAcidsA12.id]: nucleicAcidsA12,
  [cellStructureA22.id]: cellStructureA22,
  [cellsA21Demo.id]: cellsA21Demo,
};

export const episodeList: EpisodeConfig[] = Object.values(episodes);

export function getEpisode(id: string): EpisodeConfig | undefined {
  return episodes[id];
}
