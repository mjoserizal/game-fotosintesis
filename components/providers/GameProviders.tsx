"use client";

import type { ReactNode } from "react";
import { AudioProvider } from "@/hooks/useAudio";
import { GameProvider } from "@/hooks/useGameStore";

export function GameProviders({ children }: { children: ReactNode }) {
  return (
    <GameProvider>
      <AudioProvider>{children}</AudioProvider>
    </GameProvider>
  );
}
