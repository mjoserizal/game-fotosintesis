"use client";

import { AssetImage } from "@/components/ui/AssetImage";
import StartButton from "@/components/ui/StartButton";
import {
  getQuestionsForLevel,
  PHOTOSYNTHESIS_INDICATORS,
} from "@/data/quiz";
import { LEVELS } from "@/data/levels";
import { useGameStore } from "@/hooks/useGameStore";
import { normalizePercent, starsFromPercent } from "@/lib/scoring";
import type { IndicatorCorrect, QuizIndicatorId } from "@/types/game";

const EMPTY_INDICATOR_CORRECT: IndicatorCorrect = {
  concept: 0,
  materials: 0,
  energy: 0,
  products: 0,
};

function estimateIndicatorsFromTotal(correct: number): IndicatorCorrect {
  const scores = { ...EMPTY_INDICATOR_CORRECT };
  const ids: QuizIndicatorId[] = ["concept", "materials", "energy", "products"];
  const base = Math.floor(correct / ids.length);
  let remainder = correct % ids.length;

  for (const id of ids) {
    scores[id] = base + (remainder > 0 ? 1 : 0);
    remainder = Math.max(0, remainder - 1);
  }

  return scores;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-10 w-10 ${
        filled ? "fill-amber-400 text-amber-500" : "fill-slate-200 text-slate-300"
      }`}
    >
      <path
        d="m12 2.8 2.8 5.7 6.3.9-4.55 4.45 1.08 6.28L12 17.17l-5.63 2.96 1.08-6.28L2.9 9.4l6.3-.9L12 2.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndicatorProgress({
  title,
  correct,
}: {
  title: string;
  correct: number;
}) {
  const percent = normalizePercent(correct, 2);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-xs font-bold text-[#fff1c8] sm:text-sm">
        <span>{title}</span>
        <span>{correct}/2</span>
      </div>
      <div
        className="h-4 overflow-hidden rounded-full border border-[#f2d48e]/80 bg-[#092d20]"
        role="progressbar"
        aria-label={`${title}: ${correct} dari 2 soal`}
        aria-valuemin={0}
        aria-valuemax={2}
        aria-valuenow={correct}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#5bb63e] to-[#b4e54a]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function SelesaiPage() {
  const { progress } = useGameStore();
  const questionCount = getQuestionsForLevel(1).length;
  const bestScore = progress.bestScores[1] ?? 0;
  const latestResult = progress.latestResults?.[1];
  const attempted = latestResult !== undefined || progress.bestScores[1] !== undefined;
  const correct = latestResult?.correct ??
    Math.min(questionCount, Math.round(bestScore / 10));
  const total = latestResult?.total ?? questionCount;
  const percent = normalizePercent(correct, total);
  const indicatorCorrect =
    latestResult?.indicatorCorrect ??
    progress.bestIndicatorCorrect?.[1] ??
    estimateIndicatorsFromTotal(correct);
  const stars = starsFromPercent(percent, LEVELS[0]!.starThresholds);
  const scoreOutOfTen = (percent / 10).toFixed(1);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-8 sm:py-8">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <AssetImage
          assetKey="bgFotosintesis"
          alt=""
          fill
          className="h-full w-full"
          imageClassName="object-cover"
        />
        <div className="absolute inset-0 bg-[#082519]/45" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <h1 className="text-center font-heading text-3xl font-extrabold text-[#ffe39a] drop-shadow-[0_3px_3px_rgba(0,0,0,0.65)] sm:text-5xl">
          Rekapitulasi Skor
        </h1>
        <p className="mt-2 text-center font-heading text-lg font-bold text-white sm:text-2xl">
          Proses Fotosintesis · {questionCount} soal
        </p>

        <section className="mt-6 grid gap-4 rounded-[30px] border-2 border-[#f1d68e] bg-[#123b2b]/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.4)] backdrop-blur-md sm:gap-5 sm:p-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[24px] border border-[#ecd18c] bg-[#0b432e]/85 p-4 text-[#fff1c8] sm:p-6">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#f4d378] bg-[#f7e5a9] text-3xl font-black text-[#27653b] shadow-md sm:h-16 sm:w-16">
                ✓
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-[#f6dc9a]">
                  Kompetensi tercapai
                </p>
                <p className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  {percent}%
                </p>
                <p className="text-xs font-semibold text-[#fff1c8]">
                  {correct} dari {questionCount} jawaban benar
                </p>
              </div>
            </div>

            <h2 className="mb-3 font-heading text-lg font-bold text-[#ffe39a] sm:text-xl">
              Indikator ketuntasan belajar
            </h2>
            <div className="space-y-3">
              {PHOTOSYNTHESIS_INDICATORS.map((indicator) => (
                <IndicatorProgress
                  key={indicator.id}
                  title={indicator.title}
                  correct={indicatorCorrect[indicator.id]}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col items-center justify-center rounded-[24px] border-2 border-[#edcf83] bg-gradient-to-br from-[#fff1c6] via-[#f2d88f] to-[#d9aa52] px-4 py-5 text-center text-[#4c3920] shadow-[inset_0_2px_8px_rgba(255,255,255,0.8),0_8px_20px_rgba(0,0,0,0.2)] sm:py-7">
              <p className="font-heading text-xl font-extrabold sm:text-2xl">
                Skor Akhir
              </p>
              <p className="mt-1 font-heading text-6xl font-extrabold leading-none sm:text-7xl">
                {scoreOutOfTen}
                <span className="ml-2 text-3xl font-bold sm:text-4xl">/ 10</span>
              </p>
              <p className="mt-2 text-xs font-semibold text-[#66502c] sm:text-sm">
                {latestResult
                  ? `Nilai percobaan terakhir dari ${total} soal`
                  : attempted
                    ? "Nilai terbaik dari delapan soal"
                    : "Belum ada percobaan"}
              </p>
            </div>

            <div className="rounded-[24px] border border-[#e9cf89] bg-[#0b432e]/85 px-4 py-4 text-center text-white sm:py-5">
              <p className="font-heading text-lg font-bold text-[#ffe39a] sm:text-xl">
                Total Bintang
              </p>
              <div
                className="mt-2 flex justify-center gap-1"
                aria-label={`${stars} dari 3 bintang`}
              >
                {[1, 2, 3].map((number) => (
                  <StarIcon key={number} filled={number <= stars} />
                ))}
              </div>
              <p className="mt-1 text-sm font-bold text-[#fff1c8]">
                {stars} / 3 bintang
              </p>
            </div>
          </div>
        </section>

        {!attempted ? (
          <p className="mt-4 text-center text-sm font-semibold text-white">
            Selesaikan kuis untuk melihat hasil dan indikator fotosintesis.
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6 sm:gap-5">
          <StartButton href="/kuis" color="blue" compact className="min-w-[210px]">
            Ulangi Kuis
          </StartButton>
          <StartButton href="/" color="green" compact className="min-w-[210px]">
            Menu Utama
          </StartButton>
        </div>
      </div>
    </main>
  );
}
