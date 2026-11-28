"use client";

import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LEVELS } from "@/data/levels";
import { useAudio } from "@/hooks/useAudio";
import { useGameStore } from "@/hooks/useGameStore";
import { completedCount, overallPercent } from "@/lib/scoring";
import { accentStyle, cn } from "@/lib/utils";
import type { Level } from "@/types/game";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} bintang`}>
      {[1, 2, 3].map((value) => (
        <svg
          key={value}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={cn("h-6 w-6", value <= count ? "fill-amber-400 text-amber-500" : "fill-slate-200 text-slate-300")}
        >
          <path
            d="m12 2.8 2.8 5.7 6.3.9-4.55 4.45 1.08 6.28L12 17.17l-5.63 2.96 1.08-6.28L2.9 9.4l6.3-.9L12 2.8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

function LevelNode({
  level,
  unlocked,
  stars,
  bestScore,
  onVisit,
}: {
  level: Level;
  unlocked: boolean;
  stars: number;
  bestScore: number;
  onVisit: () => void;
}) {
  const inner = (
    <div
      className={cn(
        "card-nature relative w-full border-2 p-4 transition-transform",
        unlocked ? "hover:-translate-y-1" : "opacity-60",
      )}
      style={accentStyle(level.accent)}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-current font-heading text-lg font-bold">
          {stars > 0 ? "✓" : "→"}
        </span>
        <span className="text-xs font-bold uppercase tracking-wide">
          {unlocked ? (stars > 0 ? "Selesai" : "Terbuka") : "Terkunci"}
        </span>
      </div>
      <p className="mt-2 font-heading text-lg font-bold text-leaf-800">{level.title}</p>
      <p className="text-xs text-ink-500">{level.subtitle}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <StarRow count={stars} />
        {bestScore > 0 ? (
          <span className="text-xs font-bold text-ink-500">Skor {bestScore}</span>
        ) : null}
      </div>
    </div>
  );

  if (!unlocked) {
    return (
      <div aria-disabled="true" aria-label="Materi terkunci">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href="/kuis"
      onClick={onVisit}
      aria-label="Buka kuis Proses Fotosintesis"
      className="focus-ring block rounded-3xl"
    >
      {inner}
    </Link>
  );
}

export default function PetaPage() {
  const { progress } = useGameStore();
  const { playSfx } = useAudio();

  return (
    <main className="relative min-h-screen px-4 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <LinkButton href="/" variant="secondary" size="sm">
            Menu utama
          </LinkButton>
          <LinkButton href="/koleksi" variant="ghost" size="sm">
            Koleksi
          </LinkButton>
        </header>
        <div className="card-nature mt-5 text-center">
          <p className="chip mx-auto">Kuis fotosintesis</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-leaf-800 sm:text-4xl">
            Proses Fotosintesis
          </h1>
          <ProgressBar
            className="mx-auto mt-4 max-w-md"
            label={completedCount(progress) > 0 ? "Kuis selesai" : "Kuis belum selesai"}
            value={overallPercent(progress)}
          />
        </div>
        <div className="relative mx-auto mt-8 max-w-3xl py-4">
          <div className="absolute bottom-4 left-4 top-4 w-1 -translate-x-1/2 rounded-full bg-leaf-200 sm:left-1/2" />
          <div className="grid gap-6">
            {LEVELS.map((level, index) => (
              <div
                key={level.id}
                className={cn(
                  "relative pl-10 sm:pl-0",
                  index % 2 === 0 ? "sm:pr-[52%]" : "sm:pl-[52%]",
                )}
              >
                <span className="absolute left-4 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-leaf-400 bg-white sm:left-1/2" />
                <LevelNode
                  level={level}
                  unlocked={progress.unlockedLevelIds.includes(level.id)}
                  stars={progress.stars[level.id] ?? 0}
                  bestScore={progress.bestScores[level.id] ?? 0}
                  onVisit={() => playSfx("sfxKlik")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
