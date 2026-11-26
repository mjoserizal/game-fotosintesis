"use client";

import { AssetImage } from "@/components/ui/AssetImage";
import { LinkButton } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FUN_FACTS, LEVELS } from "@/data/levels";
import { useGameStore } from "@/hooks/useGameStore";
import {
  completedCount,
  overallPercent,
  totalScore,
  totalStars,
} from "@/lib/scoring";

export default function SelesaiPage() {
  const { progress } = useGameStore();
  const complete = completedCount(progress);
  const allDone = complete === LEVELS.length;
  const nextLevel = LEVELS.find(
    (level) => !progress.completedLevelIds.includes(level.id),
  );
  const earnedBadges = LEVELS.filter((level) =>
    progress.badges.includes(level.badge.id),
  );

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-8">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20">
        <AssetImage assetKey="bgLadang" alt="" fill imageClassName="object-cover" />
      </div>
      <div className="mx-auto w-full max-w-5xl">
        <div className="card-nature text-center">
          <p className="chip mx-auto">Layar akhir</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-leaf-800 sm:text-5xl">
            {allDone ? "Petualangan selesai!" : "Perjalanan masih berlanjut"}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-600 sm:text-base">
            {allDone
              ? "Kamu sudah menjelajah seluruh tahap fotosintesis, dari daun sampai kuis akhir."
              : `Masih ada ${LEVELS.length - complete} level menunggumu. Selesaikan untuk melihat rekap penuh.`}
          </p>
          <ProgressBar
            className="mx-auto mt-5 max-w-md"
            label={`${complete} dari ${LEVELS.length} level selesai`}
            value={overallPercent(progress)}
          />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="card-nature text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Skor total</p>
            <p className="font-heading text-4xl font-bold text-leaf-700">
              {totalScore(progress)}
            </p>
          </div>
          <div className="card-nature text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Bintang</p>
            <p className="font-heading text-4xl font-bold text-sun-600">
              {totalStars(progress)} / {LEVELS.length * 3}
            </p>
          </div>
          <div className="card-nature text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Lencana</p>
            <p className="font-heading text-4xl font-bold text-sky-500">
              {earnedBadges.length} / {LEVELS.length}
            </p>
          </div>
        </div>

        <section className="card-nature mt-6">
          <h2 className="font-heading text-2xl font-bold text-leaf-800">Lencana diraih</h2>
          {earnedBadges.length === 0 ? (
            <p className="mt-2 text-sm text-ink-600">
              Selesaikan level pertama untuk mendapat lencana.
            </p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {earnedBadges.map((level) => (
                <div
                  key={level.badge.id}
                  className="flex items-center gap-3 rounded-2xl bg-sun-50 p-3"
                >
                  <AssetImage
                    assetKey={level.badge.assetKey}
                    alt={level.badge.name}
                    width={52}
                    height={52}
                  />
                  <div>
                    <p className="font-heading font-bold text-sun-700">{level.badge.name}</p>
                    <p className="text-xs text-ink-600">{level.badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card-nature mt-6">
          <h2 className="font-heading text-2xl font-bold text-leaf-800">Fakta menarik</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {FUN_FACTS.map((fact) => (
              <li
                key={fact}
                className="rounded-2xl border border-leaf-100 bg-leaf-50/70 p-3 text-sm leading-relaxed text-leaf-900"
              >
                {fact}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <LinkButton href="/">Kembali ke menu</LinkButton>
          <LinkButton href="/peta" variant="secondary">
            Lihat peta
          </LinkButton>
          {nextLevel ? (
            <LinkButton href={`/level/${nextLevel.id}`} variant="secondary">
              Lanjut Level {nextLevel.id}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </main>
  );
}
