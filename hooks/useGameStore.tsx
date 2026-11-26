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
  LevelId,
  LevelResult,
  PersistedProgress,
} from "@/types/game";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "petualangan-fotosintesis:v1";

function createDefaultProgress(): PersistedProgress {
  return {
    version: 1,
    unlockedLevelIds: [1],
    completedLevelIds: [],
    stars: {},
    bestScores: {},
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
  | { type: "complete"; result: LevelResult }
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
    case "complete": {
      if (!action.result.success) return state;
      const level = LEVELS.find((item) => item.id === action.result.levelId);
      if (!level) return state;
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
        bestScores: {
          ...state.bestScores,
          [level.id]: Math.max(
            state.bestScores[level.id] ?? 0,
            action.result.score,
          ),
        },
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
  completeLevel: (result: LevelResult) => void;
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

  const completeLevel = useCallback((result: LevelResult) => {
    dispatch({ type: "complete", result });
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
      completeLevel,
      resetProgress,
      updateSettings,
      isLevelUnlocked: (id) => progress.unlockedLevelIds.includes(id),
      starsFor: (id) => progress.stars[id] ?? 0,
      bestScoreFor: (id) => progress.bestScores[id] ?? 0,
    }),
    [
      progress,
      hydrated,
      completeLevel,
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
