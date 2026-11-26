"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AssetImage } from "@/components/ui/AssetImage";
import StartButton from "@/components/ui/StartButton";
import { useAudio } from "@/hooks/useAudio";

const INSTRUCTIONS = [
  "Perhatikan video animasi fotosintesis sampai selesai. Kamu dapat menggunakan tombol Play/Pause dan Volume.",
  "Klik tombol Mulai Belajar untuk memulai pembelajaran.",
  "Klik setiap gambar atau ikon untuk mengetahui bahan dan proses fotosintesis.",
  "Pilih jawaban yang menurutmu benar dan perhatikan umpan balik yang muncul.",
  "Periksa skor akhirmu dan pilih apakah ingin mengulang video atau mengikuti evaluasi lanjutan.",
];

export default function PetunjukPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const { unlockAudio } = useAudio();

  const mascotMotion = reduceMotion
    ? {}
    : {
        animate: { y: [0, -8, 0], rotate: [0, 1, 0] },
        transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden px-3 py-4 sm:px-6 sm:py-6">
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
          y: reduceMotion ? 0 : 24,
          scale: reduceMotion ? 1 : 0.97,
        }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.25 : 0.55, ease: "easeOut" }}
        className="relative z-10 hidden aspect-[1576/1051] w-[min(96vw,1120px,133.33svh)] lg:block"
      >
        <AssetImage
          assetKey="instructionBoard"
          alt=""
          fill
          className="h-full w-full"
          imageClassName="object-fill"
          priority
        />

        <motion.h1
          initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: reduceMotion ? 0.25 : 0.4 }}
          className="absolute left-[28%] top-[2%] flex h-[15%] w-[44%] flex-col items-center justify-center text-center font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-[clamp(1rem,3vw,2.4rem)] font-bold uppercase leading-[1.05] tracking-wide text-[#35210e] [text-shadow:0_2px_1px_rgba(255,194,81,0.65)]"
        >
          <span>Petunjuk</span>
          <span>Penggunaan</span>
        </motion.h1>

        <ol className="absolute bottom-[24%] left-[15%] right-[20%] top-[22%] flex flex-col justify-between gap-[1%]">
          {INSTRUCTIONS.map((instruction, index) => (
            <motion.li
              key={instruction}
              initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0.25 : 0.35,
                delay: reduceMotion ? index * 0.04 : 0.3 + index * 0.1,
              }}
              className="flex min-h-0 flex-1 items-center gap-[1.5%]"
            >
              <span className="relative z-10 flex aspect-[149/132] w-[9%] shrink-0 items-center justify-center">
                <AssetImage
                  assetKey="instructionLeaf"
                  alt=""
                  fill
                  className="!absolute inset-0 !h-full !w-full"
                  imageClassName="object-contain"
                />
                <span className="relative z-10 font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-[clamp(0.75rem,2.1vw,1.7rem)] font-bold text-white [text-shadow:0_2px_1px_rgba(0,70,0,0.7)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <div className="flex h-[88%] min-w-0 flex-1 items-center rounded-full border-2 border-dashed border-[#d6b47e] bg-[#fff4dc]/90 px-[clamp(0.5rem,1.4vw,1.25rem)] py-1 text-[clamp(0.65rem,1.4vw,1.15rem)] font-semibold leading-snug text-[#25190e] shadow-[inset_0_2px_6px_rgba(139,91,36,0.12)]">
                {instruction}
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          {...mascotMotion}
          className="absolute bottom-[1%] left-[-7%] aspect-[478/599] w-[24%]"
          aria-hidden="true"
        >
          <AssetImage
            assetKey="instructionMascot"
            alt=""
            fill
            className="h-full w-full"
            imageClassName="object-contain"
            sizes="(max-width: 640px) 34vw, 380px"
          />
        </motion.div>

        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2">
          <StartButton href="/" color="green" compact onClick={unlockAudio}>
            Kembali
          </StartButton>
        </div>
      </motion.section>

      <div className="relative z-10 w-full max-w-lg lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.25 : 0.45 }}
          className="relative aspect-[1600/1080] w-full"
        >
          <AssetImage
            assetKey="instructionBoard"
            alt=""
            fill
            className="h-full w-full"
            imageClassName="object-fill"
            priority
          />
          <h1           className="absolute left-[28%] top-[2%] flex h-[15%] w-[44%] flex-col items-center justify-center text-center font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-[clamp(0.8rem,5vw,1.5rem)] font-bold uppercase leading-[1.05] text-[#35210e]">
            <span>Petunjuk</span>
            <span>Penggunaan</span>
          </h1>
        </motion.div>

        <ol className="-mt-3 space-y-2 rounded-3xl border-4 border-[#a84e12] bg-[#fff1d2] p-3 shadow-xl">
          {INSTRUCTIONS.map((instruction, index) => (
            <motion.li
              key={instruction}
              initial={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0.25 : 0.3,
                delay: reduceMotion ? index * 0.04 : 0.15 + index * 0.08,
              }}
              className="flex items-center gap-3 rounded-2xl border border-dashed border-[#d6b47e] bg-[#fff9eb] p-2 text-sm font-semibold leading-snug text-[#25190e]"
            >
              <span className="relative flex w-10 shrink-0 aspect-[149/132] items-center justify-center">
                <AssetImage
                  assetKey="instructionLeaf"
                  alt=""
                  fill
                  className="!absolute inset-0 !h-full !w-full"
                  imageClassName="object-contain"
                />
                <span className="relative z-10 font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] font-bold text-white [text-shadow:0_1px_2px_rgba(0,70,0,0.9)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              {instruction}
            </motion.li>
          ))}
        </ol>

        <div className="relative mt-2 flex min-h-20 items-center justify-center">
          <motion.div
            {...mascotMotion}
            className="absolute bottom-0 left-0 aspect-[478/599] w-[clamp(3rem,15vw,5rem)]"
            aria-hidden="true"
          >
            <AssetImage
              assetKey="instructionMascot"
              alt=""
              fill
              className="!absolute inset-0 !h-full !w-full"
              imageClassName="object-contain"
            />
          </motion.div>
          <StartButton href="/" color="green" compact onClick={unlockAudio}>
            Kembali
          </StartButton>
        </div>
      </div>
    </main>
  );
}
