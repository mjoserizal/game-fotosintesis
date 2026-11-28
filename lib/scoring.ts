import { LEVEL_IDS } from "@/data/levels";
import type { Level, PersistedProgress, StarCount } from "@/types/game";

export function normalizePercent(earned: number, possible: number): number {
  if (possible <= 0) return 0;
  return Math.round((earned / possible) * 100);
}

export function maxChallengeScore(level: Level): number {
  switch (level.challenge.kind) {
    case "drag":
    case "flow":
      return level.challenge.targets.length * 10;
    case "label":
      return level.challenge.slots.length * 10;
    case "sequence":
      return level.challenge.items.length * 20;
    case "mixed":
      return 0;
  }
}

export function starsFromPercent(percent: number, thresholds: [number, number, number]): StarCount {
  if (percent >= thresholds[2]) return 3;
  if (percent >= thresholds[1]) return 2;
  if (percent >= thresholds[0]) return 1;
  return 0;
}

export function totalStars(progress: PersistedProgress): number {
  return LEVEL_IDS.reduce((sum, id) => sum + (progress.stars[id] ?? 0), 0);
}

export function completedCount(progress: PersistedProgress): number {
  return progress.completedLevelIds.length;
}

export function overallPercent(progress: PersistedProgress): number {
  return normalizePercent(completedCount(progress), LEVEL_IDS.length);
}

export function totalScore(progress: PersistedProgress): number {
  return LEVEL_IDS.reduce((sum, id) => sum + (progress.bestScores[id] ?? 0), 0);
}
