"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetImage } from "@/components/ui/AssetImage";
import StartButton from "@/components/ui/StartButton";
import { useAudio } from "@/hooks/useAudio";

const OBJECTIVES = [
  {
    assetKey: "co2",
    alt: "Ilustrasi bahan dan proses fotosintesis",
    text: "1. Menganalisis proses fotosintesis dengan tepat.",
  },
  {
    assetKey: "bumi",
    alt: "Ilustrasi dampak fotosintesis bagi bumi",
    text: "2. Menjelaskan dampak fotosintesis bagi bumi.",
  },
] as const;

export default function TujuanPembelajaranPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const { unlockAudio } = useAudio();

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden px-4 py-10 sm:px-8">
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

      <div className="relative z-10 w-full max-w-[860px]">
        <motion.section
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
            scale: reduceMotion ? 1 : 0.98,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.25 : 0.5, ease: "easeOut" }}
          className="relative flex min-h-[430px] w-full flex-col items-center rounded-[36px] border-2 border-[#fff2d2] bg-white/15 px-4 pb-14 pt-32 shadow-[0_12px_35px_rgba(20,54,24,0.2)] backdrop-blur-[2px] sm:min-h-[450px] sm:rounded-[46px] sm:px-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: reduceMotion ? 0.25 : 0.35 }}
            className="absolute left-0 right-0 top-[-30px] z-10 mx-auto flex min-h-[62px] w-[min(90%,370px)] items-center justify-center rounded-full bg-[#c5eaff] px-5 py-3 text-center font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-[clamp(0.9rem,2.5vw,1.5rem)] font-bold uppercase tracking-wide text-[#237e20] shadow-[0_8px_0_rgba(103,147,157,0.65)] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
          >
            Tujuan Pembelajaran
          </motion.h1>

          <ol className="mt-6 flex w-full max-w-[500px] flex-col gap-8">
            {OBJECTIVES.map((objective, index) => (
              <motion.li
                key={objective.assetKey}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduceMotion ? index * 0.06 : 0.25 + index * 0.15,
                  duration: reduceMotion ? 0.25 : 0.4,
                  ease: "easeOut",
                }}
                className="relative flex min-h-[88px] items-center justify-center rounded-[24px] border-2 border-white/90 bg-[#d6f6dc]/90 py-4 pl-[72px] pr-4 text-center shadow-[0_4px_0_rgba(77,146,91,0.55),inset_0_2px_8px_rgba(255,255,255,0.8)] sm:min-h-[86px] sm:pl-24 sm:pr-6"
              >
                <div className="absolute left-[-12px] top-1/2 h-[72px] w-[72px] -translate-y-1/2 sm:left-[-18px] sm:h-[92px] sm:w-[92px]">
                  <AssetImage
                    assetKey={objective.assetKey}
                    alt={objective.alt}
                    fill
                    className="h-full w-full"
                    imageClassName="object-contain"
                  />
                </div>
                <span className="font-serif text-[clamp(0.82rem,1.8vw,1.2rem)] font-semibold uppercase leading-snug text-[#24180d]">
                  {objective.text}
                </span>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0.1 : 0.55, duration: 0.3 }}
          className="relative z-20 -mt-7 flex justify-center"
        >
          <StartButton
            href="/"
            color="green"
            compact
            className="min-w-[220px] sm:min-w-[280px]"
            onClick={unlockAudio}
          >
            Kembali
          </StartButton>
        </motion.div>
      </div>
    </main>
  );
}
