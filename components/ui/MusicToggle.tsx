"use client";

import { useRef } from "react";
import StartButton from "@/components/ui/StartButton";
import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";

export function MusicToggle() {
  const { progress, updateSettings } = useGameStore();
  const { unlockAudio } = useAudio();
  const lastVolume = useRef(progress.settings.bgmVolume || 0.35);
  const musicEnabled = !progress.settings.muted && progress.settings.bgmVolume > 0;

  const toggleMusic = () => {
    unlockAudio();
    if (musicEnabled) {
      lastVolume.current = progress.settings.bgmVolume;
      updateSettings({ bgmVolume: 0 });
      return;
    }

    updateSettings({
      muted: false,
      bgmVolume: lastVolume.current || 0.35,
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <StartButton
        color="green"
        compact
        aria-pressed={musicEnabled}
        aria-label={musicEnabled ? "Matikan musik" : "Nyalakan musik"}
        onClick={toggleMusic}
        className="min-w-[220px]"
      >
        <span className="whitespace-nowrap">
          Musik: {musicEnabled ? "Nyala" : "Mati"}
        </span>
      </StartButton>
    </div>
  );
}
