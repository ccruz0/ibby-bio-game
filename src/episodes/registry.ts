import { cellsA21Demo } from "./cells-a2.1-demo";
import type { EpisodeConfig } from "./types";
import { waterA11 } from "./water-a1.1";

const episodes: Record<string, EpisodeConfig> = {
  [waterA11.id]: waterA11,
  [cellsA21Demo.id]: cellsA21Demo,
};

export const episodeList: EpisodeConfig[] = Object.values(episodes);

export function getEpisode(id: string): EpisodeConfig | undefined {
  return episodes[id];
}
