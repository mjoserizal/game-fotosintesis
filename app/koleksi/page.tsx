"use client";

import { AssetImage } from "@/components/ui/AssetImage";
import { LinkButton } from "@/components/ui/Button";
import { GLOSSARY } from "@/data/glossary";
import { LEVELS } from "@/data/levels";
import { useGameStore } from "@/hooks/useGameStore";
import { cn } from "@/lib/utils";
import type { GlossaryTerm } from "@/types/game";

export default function KoleksiPage() {
  const { progress } = useGameStore();
  const visibleTerms: GlossaryTerm[] = GLOSSARY;
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
          Kuis
        </LinkButton>
      </header>
      <div className="card-nature mt-5 text-center">
        <p className="chip mx-auto">Koleksi</p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-leaf-800 sm:text-4xl">
          Glosarium Fotosintesis
        </h1>
        <p className="mt-2 text-sm text-ink-600">
          {unlockedCount} dari {GLOSSARY.length} kartu terbuka. Selesaikan kuis untuk
          membuka semua istilah.
        </p>
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
                    {level?.title ?? "Fotosintesis"}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-ink-700">
                {unlocked
                  ? term.definition
                  : "Selesaikan kuis fotosintesis untuk membuka kartu ini."}
              </p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
