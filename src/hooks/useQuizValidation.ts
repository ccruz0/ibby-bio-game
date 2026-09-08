import type { DragLabelZone, MatchPair, ScenarioOption } from "../types";

export interface Point {
  x: number;
  y: number;
}

/** Battle 1: is a dropped label within tolerance of its target zone? */
export function isWithinDragZone(zone: DragLabelZone, dropPoint: Point, diagramSize: number): boolean {
  const tolerancePx = diagramSize * zone.toleranceRatio;
  const dx = dropPoint.x - zone.x;
  const dy = dropPoint.y - zone.y;
  return Math.sqrt(dx * dx + dy * dy) <= tolerancePx;
}

/** Battle 2: did the player connect the correct pair of molecule/bond ids? */
export function isCorrectMatch(attempt: { fromId: string; toId: string }, answerKey: MatchPair[]): boolean {
  return answerKey.some(
    (pair) =>
      (pair.fromId === attempt.fromId && pair.toId === attempt.toId) ||
      (pair.fromId === attempt.toId && pair.toId === attempt.fromId)
  );
}

/** Battle 3: did the player pick the correct scenario option? */
export function isCorrectScenarioChoice(optionId: string, options: ScenarioOption[]): boolean {
  return options.find((o) => o.id === optionId)?.correct ?? false;
}

/** Shared scoring: percentage of correct answers, rounded to nearest int. */
export function scoreBattle(correctCount: number, totalCount: number): number {
  if (totalCount === 0) return 0;
  return Math.round((correctCount / totalCount) * 100);
}
