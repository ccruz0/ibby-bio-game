import { mystery1Cells } from "./mystery-1-cells";
import { mystery2Molecules } from "./mystery-2-molecules";
import { mystery3Genetics } from "./mystery-3-genetics";
import { mystery4Ecology } from "./mystery-4-ecology";
import { mystery5Evolution } from "./mystery-5-evolution";
import { mystery6Physiology } from "./mystery-6-physiology";
import { mystery7Plants } from "./mystery-7-plants";
import { mystery8NucleicAcids } from "./mystery-8-nucleic-acids";
import type { EpisodeConfig } from "./types";

// IB Biology Core Curriculum - 8 Complete Mysteries
export const episodeRegistry: EpisodeConfig[] = [
  mystery1Cells,
  mystery2Molecules,
  mystery3Genetics,
  mystery4Ecology,
  mystery5Evolution,
  mystery6Physiology,
  mystery7Plants,
  mystery8NucleicAcids,
];

// Aliases for backward compatibility
export const episodeList = episodeRegistry;

// Utility functions for episode navigation
export function getEpisodeById(id: string): EpisodeConfig | undefined {
  return episodeRegistry.find((ep) => ep.id === id);
}

export function getEpisode(id: string): EpisodeConfig | undefined {
  return getEpisodeById(id);
}

export function getEpisodeIndex(id: string): number {
  return episodeRegistry.findIndex((ep) => ep.id === id);
}

export function getNextEpisode(currentId: string): EpisodeConfig | undefined {
  const currentIndex = getEpisodeIndex(currentId);
  if (currentIndex === -1 || currentIndex >= episodeRegistry.length - 1) {
    return undefined;
  }
  return episodeRegistry[currentIndex + 1];
}

export function getPreviousEpisode(currentId: string): EpisodeConfig | undefined {
  const currentIndex = getEpisodeIndex(currentId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return episodeRegistry[currentIndex - 1];
}

export function getTotalEpisodes(): number {
  return episodeRegistry.length;
}

export function getEpisodeProgress(currentId: string): { current: number; total: number } {
  return {
    current: getEpisodeIndex(currentId) + 1,
    total: getTotalEpisodes(),
  };
}
