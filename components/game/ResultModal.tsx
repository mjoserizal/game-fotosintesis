"use client";

import { LinkButton } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import { Modal } from "@/components/ui/Modal";
import { cn, formatTime } from "@/lib/utils";
import type { Level, LevelResult } from "@/types/game";

export function ResultModal({
  result,
  level,
  nextHref,
  onRetry,
}: {
  result: LevelResult | null;
  level: Level;
  nextHref: string | null;
  onRetry: () => void;
}) {
  const stars = result?.success ? result.stars : 0;

  return (
    <Modal
      open={result !== null}
      title={result?.success ? "Misi selesai!" : "Belum berhasil"}
    >
      {result ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((value) => (
              <AssetImage
                key={value}
                assetKey="bintang"
                alt={value <= stars ? `Bintang ${value} diraih` : `Bintang ${value} kosong`}
                width={52}
                height={52}
                className={cn(value > stars && "opacity-25 grayscale")}
              />
            ))}
          </div>
          <p className="font-heading text-4xl font-bold text-leaf-700">{result.score}</p>
          <p className="text-sm text-ink-500">Skor level · {result.percent}%</p>
          <div className="grid w-full grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-leaf-50 p-3">
              <p className="font-bold text-leaf-800">Jawaban benar</p>
              <p className="text-ink-600">{result.correct} / {result.total}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-3">
              <p className="font-bold text-sky-700">Waktu</p>
              <p className="text-ink-600">{formatTime(result.elapsedSeconds)}</p>
            </div>
          </div>
          {result.success ? (
            <div className="flex items-center gap-3 rounded-2xl bg-sun-50 p-3 text-left">
              <AssetImage assetKey={level.badge.assetKey} alt={level.badge.name} width={56} height={56} />
              <div>
                <p className="font-heading font-bold text-sun-700">{level.badge.name}</p>
                <p className="text-xs text-ink-600">{level.badge.description}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-600">
              Nyawa habis atau waktu terlalu lama. Ulangi level ini, ya.
            </p>
          )}
          <div className="flex w-full flex-wrap justify-center gap-3 pt-2">
            <LinkButton href="/peta" variant="secondary">
              Ke peta
            </LinkButton>
            <button
              type="button"
              onClick={onRetry}
              className="focus-ring rounded-full bg-white px-5 py-2.5 text-sm font-bold text-leaf-800 ring-2 ring-leaf-200 hover:bg-leaf-50"
            >
              Ulangi level
            </button>
            {result.success && nextHref ? (
              <LinkButton href={nextHref}>Lanjut level</LinkButton>
            ) : null}
            {result.success && !nextHref ? (
              <LinkButton href="/selesai">Lihat hasil akhir</LinkButton>
            ) : null}
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
