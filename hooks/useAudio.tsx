"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { ASSETS, SFX_ASSETS, type SfxKey } from "@/lib/assets";
import { useGameStore } from "./useGameStore";

type AudioValue = {
  playSfx: (key: SfxKey) => void;
  unlockAudio: () => void;
};

const GameAudioContext = createContext<AudioValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const { progress } = useGameStore();
  const settingsRef = useRef(progress.settings);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<Partial<Record<SfxKey, HTMLAudioElement>>>({});
  const unlockedRef = useRef(false);

  const tryStartBgm = useCallback(() => {
    const audio = bgmRef.current;
    if (!audio || settingsRef.current.muted || settingsRef.current.bgmVolume <= 0) {
      return;
    }
    audio.volume = settingsRef.current.bgmVolume;
    void audio.play().catch(() => undefined);
  }, []);

  const unlockAudio = useCallback(() => {
    if (typeof window === "undefined") return;
    unlockedRef.current = true;
    tryStartBgm();
  }, [tryStartBgm]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const bgm = new Audio(ASSETS.bgm);
    bgm.loop = true;
    bgm.volume = settingsRef.current.bgmVolume;
    bgmRef.current = bgm;

    const onFirstInteraction = () => {
      unlockedRef.current = true;
      tryStartBgm();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };

    window.addEventListener("pointerdown", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      bgm.pause();
      bgmRef.current = null;
      sfxRef.current = {};
      unlockedRef.current = false;
    };
  }, [tryStartBgm]);

  useEffect(() => {
    settingsRef.current = progress.settings;
    const bgm = bgmRef.current;
    if (!bgm) return;
    bgm.volume = progress.settings.bgmVolume;
    if (progress.settings.muted || progress.settings.bgmVolume <= 0) {
      bgm.pause();
      return;
    }
    if (unlockedRef.current) void bgm.play().catch(() => undefined);
  }, [progress.settings]);

  const playSfx = useCallback((key: SfxKey) => {
    const source = SFX_ASSETS[key];
    if (
      typeof window === "undefined" ||
      !source ||
      settingsRef.current.muted ||
      settingsRef.current.sfxVolume <= 0
    ) {
      return;
    }
    let audio = sfxRef.current[key];
    if (!audio) {
      audio = new Audio(source);
      sfxRef.current[key] = audio;
    }
    audio.volume = settingsRef.current.sfxVolume;
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  }, []);

  const value = useMemo<AudioValue>(
    () => ({ playSfx, unlockAudio }),
    [playSfx, unlockAudio],
  );

  return (
    <GameAudioContext.Provider value={value}>
      {children}
    </GameAudioContext.Provider>
  );
}

export function useAudio(): AudioValue {
  const context = useContext(GameAudioContext);
  if (!context) {
    throw new Error("useAudio harus dipakai di dalam AudioProvider");
  }
  return context;
}
