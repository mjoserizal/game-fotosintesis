import clsx, { type ClassValue } from "clsx";
import type { CSSProperties } from "react";
import type { AccentColor } from "@/types/game";

const ACCENT_HEX: Record<AccentColor, string> = {
  leaf: "#16a34a",
  sun: "#ca8a04",
  sky: "#0284c7",
  violet: "#7c3aed",
  soil: "#a97c50",
  rose: "#e11d48",
};

export function cn(...values: ClassValue[]): string {
  return clsx(values);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function accentHex(accent: AccentColor): string {
  return ACCENT_HEX[accent];
}

export function accentStyle(accent: AccentColor): CSSProperties {
  const hex = ACCENT_HEX[accent];
  return {
    backgroundColor: `${hex}14`,
    borderColor: `${hex}59`,
    color: hex,
  };
}

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
