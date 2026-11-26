"use client";

import { motion } from "framer-motion";
import { useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import { useAudio } from "@/hooks/useAudio";
import { clamp } from "@/lib/utils";
import type { AssetKey } from "@/lib/assets";
import type {
  ChallengeOutcome,
  FeedbackTone,
  RateFactors,
  SimulatorMission,
} from "@/types/game";

type SliderConfig = {
  key: keyof RateFactors;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  assetKey: AssetKey;
};

const SLIDERS: SliderConfig[] = [
  { key: "light", label: "Intensitas cahaya", min: 0, max: 100, step: 1, unit: "%", assetKey: "matahari" },
  { key: "co2", label: "Konsentrasi CO2", min: 0, max: 1000, step: 10, unit: "ppm", assetKey: "co2" },
  { key: "temperature", label: "Suhu", min: 5, max: 45, step: 1, unit: "°C", assetKey: "ikonSuhu" },
  { key: "water", label: "Ketersediaan air", min: 0, max: 100, step: 1, unit: "%", assetKey: "h2o" },
];

const INITIAL_FACTORS: RateFactors = {
  light: 20,
  co2: 150,
  temperature: 15,
  water: 30,
};

function temperatureFactor(value: number): number {
  if (value < 10) return 0.1;
  if (value <= 28) return 0.35 + ((value - 10) / 18) * 0.65;
  if (value <= 38) return 1 - ((value - 28) / 10) * 0.35;
  return Math.max(0.15, 0.65 - (value - 38) * 0.05);
}

function normalizedFactors(factors: RateFactors) {
  return {
    Cahaya: clamp(factors.light / 80, 0, 1),
    "CO2": clamp(factors.co2 / 700, 0, 1),
    Suhu: temperatureFactor(factors.temperature),
    Air: clamp(factors.water / 80, 0, 1),
  };
}

function calculateRate(factors: RateFactors): number {
  const values = Object.values(normalizedFactors(factors));
  return Math.round(clamp(Math.min(...values), 0, 1) * 100);
}

export function PhotosynthesisSimulator({
  prompt,
  mission,
  onFeedback,
  onComplete,
}: {
  prompt: string;
  mission: SimulatorMission;
  onFeedback: (message: string, tone: FeedbackTone) => void;
  onComplete: (outcome: ChallengeOutcome) => void;
}) {
  const { playSfx } = useAudio();
  const [factors, setFactors] = useState<RateFactors>(INITIAL_FACTORS);
  const completedRef = useRef(false);
  const rate = calculateRate(factors);
  const success = rate >= mission.targetRate;
  const limits = normalizedFactors(factors);
  const limitingFactor =
    Object.entries(limits).sort((first, second) => first[1] - second[1])[0]?.[0] ??
    "Cahaya";
  const bubbleCount = Math.round(rate / 12);
  const chartPoints = Array.from({ length: 7 }, (_, index) => {
    const light = Math.round((index / 6) * 100);
    const pointRate = calculateRate({ ...factors, light });
    return `${12 + index * 49},${90 - pointRate * 0.78}`;
  }).join(" ");

  const saveResult = () => {
    if (!success || completedRef.current) return;
    completedRef.current = true;
    playSfx("sfxBenar");
    onFeedback("Misi tercapai! Laju fotosintesis maksimum.", "success");
    onComplete({ earned: 100, possible: 100, correct: 1, total: 1 });
  };

  return (
    <motion.div
      className="mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="mb-4 text-center text-sm font-semibold text-ink-700 sm:text-base">
        {prompt}
      </p>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card-nature">
          <h3 className="mb-4 font-heading text-xl font-bold text-leaf-800">
            {mission.label}
          </h3>
          <div className="grid gap-4">
            {SLIDERS.map((slider) => (
              <label key={slider.key} className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-sm font-bold text-ink-700">
                  <AssetImage assetKey={slider.assetKey} alt={slider.label} width={28} height={28} />
                  {slider.label}
                  <span className="ml-auto text-leaf-700">
                    {factors[slider.key]} {slider.unit}
                  </span>
                </span>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={factors[slider.key]}
                  onChange={(event) =>
                    setFactors((previous) => ({
                      ...previous,
                      [slider.key]: Number(event.target.value),
                    }))
                  }
                  aria-label={slider.label}
                  className="focus-ring w-full accent-leaf-600"
                />
              </label>
            ))}
          </div>
          <p className="mt-4 rounded-2xl bg-leaf-50 p-3 text-xs leading-relaxed text-leaf-800">
            Model disederhanakan untuk belajar. Faktor dengan nilai terendah relatif menjadi pembatas laju.
          </p>
        </div>
        <div className="card-nature flex flex-col items-center">
          <div className="relative flex h-40 w-full items-end justify-center gap-2 overflow-hidden rounded-2xl bg-sky-100/70">
            {Array.from({ length: bubbleCount }, (_, index) => (
              <span
                key={index}
                className="animate-bubble-rise h-4 w-4 rounded-full border-2 border-sky-400 bg-white/80"
                style={{ animationDelay: `${index * 0.35}s` } as CSSProperties}
                aria-hidden="true"
              />
            ))}
            <span className="absolute bottom-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-sky-700">
              Gelembung O2
            </span>
          </div>
          <p aria-live="polite" className="mt-4 text-center">
            <span className="block text-xs font-bold uppercase tracking-wide text-ink-500">
              Laju fotosintesis
            </span>
            <span className="font-heading text-5xl font-bold text-leaf-700">{rate}%</span>
            <span className="mt-1 block text-xs text-ink-500">
              Target {mission.targetRate}% · pembatas saat ini: {limitingFactor}
            </span>
          </p>
          <svg
            viewBox="0 0 320 100"
            className="mt-4 h-24 w-full rounded-2xl bg-white"
            role="img"
            aria-label="Grafik laju fotosintesis terhadap intensitas cahaya"
          >
            <polyline
              points={chartPoints}
              fill="none"
              stroke="#16a34a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-center text-[11px] text-ink-500">
            Sumbu X: cahaya · Sumbu Y: laju
          </p>
          <Button
            className="mt-5"
            size="lg"
            disabled={!success}
            onClick={saveResult}
          >
            {success ? "Simpan hasil misi" : "Naikkan faktor pembatas"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
