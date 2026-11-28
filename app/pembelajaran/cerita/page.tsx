"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { useAudio } from "@/hooks/useAudio";

const QUESTION_LINES = [
  "bagaimana tumbuhan",
  "membuat makanan",
  "dengan bantuan",
  "cahaya matahari?",
];

function BubbleAccent({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 30"
      fill="none"
      className={className}
    >
      <path
        d="M3 26c5 0 6-5 8-10s6-7 12-7"
        stroke="#25d8e8"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        d="M9 29c5 0 6-5 8-10s6-7 12-7"
        stroke="#25d8e8"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        d="M15 30c5 0 6-5 8-10s6-7 10-7"
        stroke="#25d8e8"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function CeritaPembelajaranPage() {
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

      <div className="relative z-10 w-full max-w-[920px]">
        <motion.section
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
            scale: reduceMotion ? 1 : 0.98,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.25 : 0.5, ease: "easeOut" }}
          className="grid min-h-[420px] grid-cols-1 items-center gap-2 rounded-[36px] border-2 border-[#fff2d2] bg-white/15 px-5 py-7 shadow-[0_12px_35px_rgba(20,54,24,0.2)] backdrop-blur-[2px] sm:min-h-[450px] sm:grid-cols-[1.2fr_0.8fr] sm:rounded-[46px] sm:px-8 sm:py-8"
        >
          <div className="relative z-10 grid w-full grid-cols-1 justify-items-center gap-3 sm:gap-2">
            <motion.div
              initial={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="relative flex min-h-[68px] w-[min(100%,340px)] items-center justify-center gap-2 rounded-[26px] border-[3px] border-cyan-300 bg-gradient-to-br from-[#a7f3fa]/95 to-[#48c8da]/95 px-4 py-3 text-center font-heading text-[clamp(1.15rem,3vw,2rem)] font-extrabold leading-tight text-white shadow-[0_0_0_2px_rgba(255,255,255,0.8),0_0_18px_rgba(34,211,238,0.85),inset_0_2px_8px_rgba(255,255,255,0.75)] [text-shadow:0_2px_3px_rgba(31,113,143,0.55)] sm:justify-self-start"
            >
              <BubbleAccent className="absolute -left-5 top-1 h-7 w-8" />
              <span>Bagaimana?</span>
              <span className="relative h-9 w-9 shrink-0">
                <AssetImage
                  assetKey="sun"
                  alt=""
                  fill
                  className="h-full w-full"
                  imageClassName="object-contain"
                />
              </span>
            </motion.div>

            {QUESTION_LINES.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduceMotion ? 0.08 * (index + 1) : 0.2 + index * 0.12,
                  duration: 0.35,
                }}
                className={`relative flex min-h-[68px] w-[min(100%,340px)] items-center justify-center rounded-[26px] border-[3px] border-cyan-300 bg-gradient-to-br from-[#a7f3fa]/95 to-[#48c8da]/95 px-4 py-3 text-center font-heading text-[clamp(1.1rem,2.7vw,1.8rem)] font-extrabold leading-tight text-white shadow-[0_0_0_2px_rgba(255,255,255,0.8),0_0_18px_rgba(34,211,238,0.8),inset_0_2px_8px_rgba(255,255,255,0.75)] [text-shadow:0_2px_3px_rgba(31,113,143,0.55)] sm:min-h-[70px] ${
                  index % 2 === 0
                    ? "sm:translate-x-6 sm:justify-self-end"
                    : "sm:-translate-x-1 sm:justify-self-start"
                }`}
              >
                <BubbleAccent
                  className={`absolute bottom-[-10px] h-7 w-8 ${
                    index % 2 === 0
                      ? "-right-5 -scale-x-100"
                      : "-left-5"
                  }`}
                />
                {line}
              </motion.p>
            ))}
          </div>

          <div className="relative mx-auto flex h-[240px] w-full max-w-[350px] items-end justify-center sm:h-full sm:min-h-[360px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="relative h-[225px] w-[190px] sm:h-[350px] sm:w-[295px]"
            >
              <AssetImage
                assetKey="wiltedLeaf"
                alt="Daun tumbuhan yang layu"
                fill
                className="h-full w-full"
                imageClassName="object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="absolute right-0 top-0 h-[78px] w-[92px] sm:right-0 sm:top-1 sm:h-[100px] sm:w-[118px]"
            >
              <AssetImage
                assetKey="rain"
                alt="Hujan yang menyirami tumbuhan"
                fill
                className="h-full w-full"
                imageClassName="object-contain"
              />
            </motion.div>
          </div>
        </motion.section>

        <div className="relative z-20 mt-5 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/pembelajaran"
            className="inline-flex min-h-[58px] items-center justify-center rounded-[22px] border-[3px] border-cyan-200 bg-gradient-to-br from-[#a7f3fa]/95 to-[#48c8da]/95 px-6 py-3 font-heading text-lg font-extrabold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.8),0_0_14px_rgba(34,211,238,0.65),inset_0_2px_8px_rgba(255,255,255,0.75)] [text-shadow:0_2px_3px_rgba(31,113,143,0.55)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
          >
            Kembali
          </Link>
          <Link
            href="/pembelajaran/bahan-utama"
            onClick={unlockAudio}
            className="inline-flex min-h-[58px] min-w-[220px] items-center justify-center gap-2 rounded-[22px] border-[3px] border-cyan-300 bg-gradient-to-br from-[#a7f3fa] to-[#48c8da] px-7 py-3 font-heading text-lg font-extrabold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.9),0_0_18px_rgba(34,211,238,0.85),inset_0_2px_8px_rgba(255,255,255,0.8)] [text-shadow:0_2px_3px_rgba(31,113,143,0.55)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 sm:min-w-[280px]"
          >
            Selanjutnya
            <span aria-hidden="true" className="text-2xl leading-none">›</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
