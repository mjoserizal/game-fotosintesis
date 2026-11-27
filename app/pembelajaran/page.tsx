"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import StartButton from "@/components/ui/StartButton";
import { useAudio } from "@/hooks/useAudio";

export default function PembelajaranPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const { unlockAudio } = useAudio();

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden px-4 py-12 sm:px-8">
      <div className="fixed inset-0">
        <AssetImage
          assetKey="bgFotosintesis"
          alt=""
          fill
          className="h-full w-full"
          imageClassName="object-cover object-center"
          priority
        />
      </div>

      <motion.section
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 20,
          scale: reduceMotion ? 1 : 0.98,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.25 : 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[920px] rounded-[36px] border-2 border-[#fff2d2] bg-white/15 px-5 pb-8 pt-16 shadow-[0_12px_35px_rgba(20,54,24,0.2)] backdrop-blur-[2px] sm:rounded-[46px] sm:px-10 sm:pb-10 sm:pt-20"
      >
        <h1 className="absolute left-1/2 top-[-30px] flex min-h-[62px] w-[min(90%,370px)] -translate-x-1/2 items-center justify-center rounded-full bg-[#c5eaff] px-5 py-3 text-center font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-[clamp(0.9rem,2.5vw,1.5rem)] font-bold uppercase tracking-wide text-[#237e20] shadow-[0_8px_0_rgba(103,147,157,0.65)] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
          Video Pembelajaran
        </h1>

        <div
          aria-label="Video pembelajaran akan ditampilkan di sini"
          className="relative mx-auto flex aspect-video w-full max-w-[720px] items-center justify-center overflow-hidden rounded-sm border border-white/50 bg-gradient-to-br from-sky-200 via-sky-400 to-sky-700 shadow-lg"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(45,102,36,0.6),transparent_55%),linear-gradient(180deg,transparent_45%,rgba(18,55,34,0.2))]"
          />
          <p className="relative max-w-sm px-6 text-center font-heading text-lg font-bold text-white [text-shadow:0_2px_5px_rgba(0,0,0,0.55)] sm:text-2xl">
            Video pembelajaran akan ditambahkan di sini
          </p>
        </div>

        <div className="mx-auto mt-2 flex w-full max-w-[720px] flex-wrap items-center justify-between gap-3 text-sm text-[#24180d] [text-shadow:0_1px_2px_rgba(255,255,255,0.85)]">
          <p>Sumber: YouTube Dunia Animasi Sains</p>
          <Link
            href="/"
            className="rounded px-1 font-semibold underline decoration-dotted underline-offset-2 hover:text-leaf-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Kembali
          </Link>
        </div>

        <div className="mt-7 flex justify-center">
          <StartButton
            href="/pembelajaran/cerita"
            color="green"
            className="min-w-[220px] sm:min-w-[280px]"
            onClick={unlockAudio}
          >
            Selanjutnya
          </StartButton>
        </div>
      </motion.section>
    </main>
  );
}
