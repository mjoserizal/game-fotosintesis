"use client";

import { Button } from "@/components/ui/Button";
import { useAudio } from "@/hooks/useAudio";
import { useGameStore } from "@/hooks/useGameStore";

export function AudioToggle({ showSliders = false }: { showSliders?: boolean }) {
  const { progress, updateSettings } = useGameStore();
  const { playSfx, unlockAudio } = useAudio();
  const { settings } = progress;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          aria-pressed={!settings.muted}
          onClick={() => {
            unlockAudio();
            updateSettings({ muted: !settings.muted });
            if (settings.muted) playSfx("sfxKlik");
          }}
        >
          {settings.muted ? "Suara mati" : "Suara aktif"}
        </Button>
        <label className="flex items-center gap-2 text-xs font-semibold text-ink-700">
          <input
            type="checkbox"
            checked={settings.timerEnabled}
            onChange={(event) =>
              updateSettings({ timerEnabled: event.target.checked })
            }
            className="focus-ring h-4 w-4 accent-leaf-600"
          />
          Tampilkan timer
        </label>
      </div>
      {showSliders ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-semibold text-ink-700">
            Volume musik
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={settings.bgmVolume}
              onPointerDown={unlockAudio}
              onChange={(event) =>
                updateSettings({ bgmVolume: Number(event.target.value) })
              }
              className="focus-ring accent-leaf-600"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-semibold text-ink-700">
            Volume efek
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={settings.sfxVolume}
              onPointerDown={unlockAudio}
              onChange={(event) =>
                updateSettings({ sfxVolume: Number(event.target.value) })
              }
              className="focus-ring accent-leaf-600"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
