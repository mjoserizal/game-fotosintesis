"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { getTermsForLevel } from "@/data/glossary";
import { getNextLevelId, LEVELS, LEVEL_IDS } from "@/data/levels";
import type {
  GameSettings,
  IndicatorCorrect,
  LevelId,
  LevelResult,
  PersistedProgress,
  QuizAttemptResult,
  QuizIndicatorId,
} from "@/types/game";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "proses-fotosintesis:v1";

function createDefaultProgress(): PersistedProgress {
  return {
    version: 1,
    unlockedLevelIds: [1],
    completedLevelIds: [],
    stars: {},
    bestScores: {},
    bestIndicatorCorrect: {},
    latestResults: {},
    badges: [],
    unlockedGlossary: [],
    lastLevelId: 1,
    settings: {
      muted: false,
      bgmVolume: 0.35,
      sfxVolume: 0.6,
      timerEnabled: false,
    },
  };
}

function isLevelId(value: unknown): value is LevelId {
  return typeof value === "number" && LEVEL_IDS.includes(value as LevelId);
}

function volumeFrom(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(1, Math.max(0, value))
    : fallback;
}

function readIndicatorCorrect(value: unknown): IndicatorCorrect | null {
  if (typeof value !== "object" || value === null) return null;
  const raw = value as Record<QuizIndicatorId, unknown>;
  const ids: QuizIndicatorId[] = ["concept", "materials", "energy", "products"];
  const scores: IndicatorCorrect = {
    concept: 0,
    materials: 0,
    energy: 0,
    products: 0,
  };
  for (const id of ids) {
    const score = raw[id];
    if (typeof score !== "number" || !Number.isInteger(score) || score < 0 || score > 2) {
      return null;
    }
    scores[id] = score;
  }
  return scores;
}

function readBestIndicatorCorrect(
  value: unknown,
): Partial<Record<LevelId, IndicatorCorrect>> {
  if (typeof value !== "object" || value === null) return {};
  const raw = value as Record<string, unknown>;
  const result: Partial<Record<LevelId, IndicatorCorrect>> = {};
  for (const id of LEVEL_IDS) {
    const scores = readIndicatorCorrect(raw[String(id)]);
    if (scores) result[id] = scores;
  }
  return result;
}

function readLatestResults(
  value: unknown,
): Partial<Record<LevelId, QuizAttemptResult>> {
  if (typeof value !== "object" || value === null) return {};
  const raw = value as Record<string, unknown>;
  const result: Partial<Record<LevelId, QuizAttemptResult>> = {};
  for (const id of LEVEL_IDS) {
    const attempt = raw[String(id)];
    if (typeof attempt !== "object" || attempt === null) continue;
    const candidate = attempt as Record<string, unknown>;
    const indicatorCorrect = readIndicatorCorrect(candidate.indicatorCorrect);
    if (
      typeof candidate.score === "number" &&
      Number.isFinite(candidate.score) &&
      candidate.score >= 0 &&
      typeof candidate.correct === "number" &&
      Number.isInteger(candidate.correct) &&
      typeof candidate.total === "number" &&
      Number.isInteger(candidate.total) &&
      candidate.total > 0 &&
      candidate.correct >= 0 &&
      candidate.correct <= candidate.total &&
      indicatorCorrect
    ) {
      result[id] = {
        score: candidate.score,
        correct: candidate.correct,
        total: candidate.total,
        indicatorCorrect,
      };
    }
  }
  return result;
}

function reviveProgress(value: unknown): PersistedProgress | null {
  if (typeof value !== "object" || value === null) return null;
  const raw = value as Partial<PersistedProgress>;
  if (raw.version !== 1) return null;
  const base = createDefaultProgress();
  const settings = raw.settings ?? base.settings;
  return {
    version: 1,
    unlockedLevelIds: Array.from(
      new Set<LevelId>([
        ...base.unlockedLevelIds,
        ...(Array.isArray(raw.unlockedLevelIds)
          ? raw.unlockedLevelIds.filter(isLevelId)
          : []),
      ]),
    ),
    completedLevelIds: Array.isArray(raw.completedLevelIds)
      ? raw.completedLevelIds.filter(isLevelId)
      : [],
    stars: typeof raw.stars === "object" && raw.stars !== null ? raw.stars : {},
    bestScores:
      typeof raw.bestScores === "object" && raw.bestScores !== null
        ? raw.bestScores
        : {},
    bestIndicatorCorrect: readBestIndicatorCorrect(raw.bestIndicatorCorrect),
    latestResults: readLatestResults(raw.latestResults),
    badges: Array.isArray(raw.badges)
      ? raw.badges.filter((item): item is string => typeof item === "string")
      : [],
    unlockedGlossary: Array.isArray(raw.unlockedGlossary)
      ? raw.unlockedGlossary.filter((item): item is string => typeof item === "string")
      : [],
    lastLevelId: isLevelId(raw.lastLevelId) ? raw.lastLevelId : 1,
    settings: {
      muted: typeof settings.muted === "boolean" ? settings.muted : false,
      bgmVolume: volumeFrom(settings.bgmVolume, 0.35),
      sfxVolume: volumeFrom(settings.sfxVolume, 0.6),
      timerEnabled:
        typeof settings.timerEnabled === "boolean" ? settings.timerEnabled : false,
    },
  };
}

type ProgressAction =
  | { type: "hydrate"; payload: PersistedProgress }
  | { type: "record"; result: LevelResult }
  | { type: "reset" }
  | { type: "settings"; payload: Partial<GameSettings> };

function progressReducer(
  state: PersistedProgress,
  action: ProgressAction,
): PersistedProgress {
  switch (action.type) {
    case "hydrate":
      return reviveProgress(action.payload) ?? createDefaultProgress();
    case "reset":
      return createDefaultProgress();
    case "settings":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case "record": {
      const level = LEVELS.find((item) => item.id === action.result.levelId);
      if (!level) return state;
      const bestScores = {
        ...state.bestScores,
        [level.id]: Math.max(
          state.bestScores[level.id] ?? 0,
          action.result.score,
        ),
      };
      const currentIndicatorScores = state.bestIndicatorCorrect ?? {};
      const bestIndicatorCorrect =
        action.result.score >= (state.bestScores[level.id] ?? -1)
          ? {
              ...currentIndicatorScores,
              [level.id]: action.result.indicatorCorrect,
            }
          : currentIndicatorScores;
      const latestResults = {
        ...state.latestResults,
        [level.id]: {
            score: action.result.score,
            correct: action.result.correct,
            total: action.result.total,
            indicatorCorrect: action.result.indicatorCorrect,
        },
      };
      if (!action.result.success) {
        return { ...state, bestScores, bestIndicatorCorrect, latestResults };
      }

      const nextId = getNextLevelId(level.id);
      const termIds = getTermsForLevel(level.id).map((term) => term.id);
      return {
        ...state,
        unlockedLevelIds: nextId
          ? Array.from(new Set<LevelId>([...state.unlockedLevelIds, nextId]))
          : state.unlockedLevelIds,
        completedLevelIds: Array.from(
          new Set<LevelId>([...state.completedLevelIds, level.id]),
        ),
        stars: {
          ...state.stars,
          [level.id]: Math.max(state.stars[level.id] ?? 0, action.result.stars),
        },
        bestScores,
        bestIndicatorCorrect,
        latestResults,
        badges: Array.from(new Set([...state.badges, level.badge.id])),
        unlockedGlossary: Array.from(
          new Set([...state.unlockedGlossary, ...termIds]),
        ),
        lastLevelId: nextId ?? level.id,
      };
    }
    default:
      return state;
  }
}

type GameStoreValue = {
  progress: PersistedProgress;
  hydrated: boolean;
  recordLevelResult: (result: LevelResult) => void;
  resetProgress: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  isLevelUnlocked: (id: LevelId) => boolean;
  starsFor: (id: LevelId) => number;
  bestScoreFor: (id: LevelId) => number;
};

const GameStoreContext = createContext<GameStoreValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [stored, setStored, hydrated] = useLocalStorage(
    STORAGE_KEY,
    createDefaultProgress(),
    reviveProgress,
  );
  const [progress, dispatch] = useReducer(
    progressReducer,
    createDefaultProgress(),
  );
  const didHydrate = useRef(false);
  const skipNextWrite = useRef(false);

  useEffect(() => {
    if (hydrated && !didHydrate.current) {
      dispatch({ type: "hydrate", payload: stored });
      didHydrate.current = true;
      skipNextWrite.current = true;
    }
  }, [hydrated, stored]);

  useEffect(() => {
    if (!hydrated || !didHydrate.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    setStored(progress);
  }, [progress, hydrated, setStored]);

  const recordLevelResult = useCallback((result: LevelResult) => {
    dispatch({ type: "record", result });
  }, []);

  const resetProgress = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const updateSettings = useCallback((settings: Partial<GameSettings>) => {
    dispatch({ type: "settings", payload: settings });
  }, []);

  const value = useMemo<GameStoreValue>(
    () => ({
      progress,
      hydrated,
      recordLevelResult,
      resetProgress,
      updateSettings,
      isLevelUnlocked: (id) => progress.unlockedLevelIds.includes(id),
      starsFor: (id) => progress.stars[id] ?? 0,
      bestScoreFor: (id) => progress.bestScores[id] ?? 0,
    }),
    [
      progress,
      hydrated,
      recordLevelResult,
      resetProgress,
      updateSettings,
    ],
  );

  return (
    <GameStoreContext.Provider value={value}>{children}</GameStoreContext.Provider>
  );
}

export function useGameStore(): GameStoreValue {
  const context = useContext(GameStoreContext);
  if (!context) {
    throw new Error("useGameStore harus dipakai di dalam GameProvider");
  }
  return context;
}
