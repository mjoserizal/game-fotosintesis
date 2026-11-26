"use client";

import { useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { LinkButton } from "@/components/ui/Button";
import { GLOSSARY } from "@/data/glossary";
import { LEVELS, LEVEL_IDS } from "@/data/levels";
import { useGameStore } from "@/hooks/useGameStore";
import { cn } from "@/lib/utils";
import type { GlossaryTerm, LevelId } from "@/types/game";

export default function KoleksiPage() {
  const { progress } = useGameStore();
  const [filter, setFilter] = useState<LevelId | "semua">("semua");
  const visibleTerms: GlossaryTerm[] =
    filter === "semua"
      ? GLOSSARY
      : GLOSSARY.filter((term) => term.levelId === filter);
  const unlockedCount = GLOSSARY.filter((term) =>
    progress.completedLevelIds.includes(term.levelId),
  ).length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <LinkButton href="/" variant="secondary" size="sm">
          Menu utama
        </LinkButton>
        <LinkButton href="/peta" variant="ghost" size="sm">
          Peta level
        </LinkButton>
      </header>
      <div className="card-nature mt-5 text-center">
        <p className="chip mx-auto">Koleksi</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-leaf-800 sm:text-4xl">
          Glosarium fotosintesis
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          {unlockedCount} dari {GLOSSARY.length} kartu terbuka. Selesaikan level untuk
          membuka kartu baru.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter level">
        <button
          type="button"
          onClick={() => setFilter("semua")}
          className={cn(
            "focus-ring rounded-full px-4 py-2 text-sm font-bold",
            filter === "semua" ? "bg-leaf-600 text-white" : "bg-white text-leaf-700 ring-2 ring-leaf-100",
          )}
        >
          Semua
        </button>
        {LEVEL_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              "focus-ring rounded-full px-4 py-2 text-sm font-bold",
              filter === id ? "bg-leaf-600 text-white" : "bg-white text-leaf-700 ring-2 ring-leaf-100",
            )}
          >
            Level {id}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleTerms.map((term) => {
          const unlocked = progress.completedLevelIds.includes(term.levelId);
          const level = LEVELS.find((item) => item.id === term.levelId);
          return (
            <article
              key={term.id}
              className={cn(
                "card-nature flex flex-col gap-3",
                !unlocked && "opacity-60",
              )}
            >
              <div className="flex items-center gap-3">
                {term.assetKey ? (
                  <AssetImage
                    assetKey={term.assetKey}
                    alt={term.term}
                    width={56}
                    height={56}
                    className={cn(!unlocked && "grayscale")}
                  />
                ) : null}
                <div>
                  <h2 className="font-heading text-lg font-bold text-leaf-800">
                    {unlocked ? term.term : "Kartu terkunci"}
                  </h2>
                  <p className="text-xs font-semibold text-ink-500">
                    Level {term.levelId} · {level?.title ?? ""}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-ink-700">
                {unlocked
                  ? term.definition
                  : `Selesaikan Level ${term.levelId} untuk membuka kartu ini.`}
              </p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
