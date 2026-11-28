"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useAudio } from "@/hooks/useAudio";
import type { AssetKey } from "@/lib/assets";

const MATERIALS = [
  {
    id: "water",
    title: "AIR (H₂O)",
    assetKey: "water",
    style: "from-[#8cddff] to-[#32afe5] text-[#07538f]",
    explanation:
      "Akar menyerap air dari tanah. Xilem mengangkut air menuju daun sebagai salah satu bahan baku fotosintesis.",
  },
  {
    id: "co2",
    title: "KARBON DIOKSIDA (CO₂)",
    assetKey: "co2",
    style: "from-[#f7fbff] to-[#c6d9ed] text-[#29425f]",
    explanation:
      "Karbon dioksida dari udara masuk ke daun melalui stomata dan digunakan dalam fotosintesis.",
  },
  {
    id: "chlorophyll",
    title: "KLOROFIL",
    assetKey: "chlorophyll",
    style: "from-[#9bec75] to-[#4bc94d] text-[#176b29]",
    explanation:
      "Klorofil adalah pigmen hijau di kloroplas yang menangkap energi cahaya untuk fotosintesis.",
  },
  {
    id: "sunlight",
    title: "CAHAYA MATAHARI",
    assetKey: "sun",
    style: "from-[#ffe87b] to-[#ffc83d] text-[#88501c]",
    explanation:
      "Cahaya matahari menyediakan energi yang membantu tumbuhan mengubah air dan karbon dioksida menjadi glukosa dan oksigen.",
  },
] as const satisfies readonly {
  id: string;
  title: string;
  assetKey: AssetKey;
  style: string;
  explanation: string;
}[];

export default function BahanUtamaPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const { playSfx, unlockAudio } = useAudio();
  const [selectedMaterial, setSelectedMaterial] =
    useState<(typeof MATERIALS)[number] | null>(null);

  const closeMaterial = () => setSelectedMaterial(null);

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden px-4 py-16 sm:px-8">
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
          className="relative rounded-[36px] border-2 border-[#fff2d2] bg-white/15 px-5 pb-10 pt-16 shadow-[0_12px_35px_rgba(20,54,24,0.2)] backdrop-blur-[2px] sm:min-h-[420px] sm:rounded-[46px] sm:px-10 sm:pb-12 sm:pt-[72px]"
        >
          <h1 className="absolute left-1/2 top-[-40px] flex min-h-[78px] w-[min(92%,520px)] -translate-x-1/2 items-center justify-center rounded-full bg-[#c5eaff] px-5 py-3 text-center font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-[clamp(1rem,2.7vw,1.8rem)] font-bold text-[#237e20] shadow-[0_8px_0_rgba(103,147,157,0.65)] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
            Adegan 2: Bahan Fotosintesis
          </h1>

          <p className="mb-6 text-center font-serif text-[clamp(1rem,2.5vw,1.65rem)] font-bold text-white [text-shadow:0_2px_3px_rgba(0,0,0,0.75)] sm:mb-7">
            Klik tiap bahan untuk mempelajarinya!
          </p>

          <div className="mx-auto grid w-full max-w-[760px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6">
            {MATERIALS.map((material, index) => (
              <motion.button
                key={material.id}
                type="button"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? index * 0.05 : 0.15 + index * 0.08,
                  duration: 0.35,
                }}
                onClick={() => {
                  playSfx("sfxKlik");
                  setSelectedMaterial(material);
                }}
                aria-label={`Pelajari ${material.title.replace("\n", " ")}`}
                className={`group relative flex min-h-[94px] w-full items-center justify-between gap-3 overflow-hidden rounded-[25px] border-[3px] border-white/95 bg-gradient-to-br ${material.style} px-4 py-3 text-center shadow-[0_0_0_2px_rgba(255,255,255,0.65),0_5px_12px_rgba(0,0,0,0.18),inset_0_2px_8px_rgba(255,255,255,0.75)] transition-transform hover:-translate-y-1 hover:brightness-105 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 sm:min-h-[104px] sm:px-5`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-5 top-1 h-1/3 rounded-full bg-gradient-to-b from-white/45 to-transparent"
                />
                <AssetImage
                  assetKey={material.assetKey}
                  alt=""
                  width={72}
                  height={72}
                  className="relative z-10 shrink-0 drop-shadow-sm"
                  imageClassName="object-contain"
                />
                <span className="relative z-10 flex-1 whitespace-pre-line font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-[clamp(1rem,2.4vw,1.55rem)] font-bold leading-tight [text-shadow:0_1px_0_rgba(255,255,255,0.8),0_2px_2px_rgba(0,0,0,0.14)]">
                  {material.title}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <div className="relative z-20 -mt-7 flex justify-center">
          <Link
            href="/kuis"
            onClick={unlockAudio}
            className="inline-flex min-h-[66px] min-w-[220px] items-center justify-center rounded-[22px] border-[3px] border-[#b8f58d] bg-gradient-to-b from-[#86e34b] to-[#38a925] px-8 py-3 font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif] text-2xl font-extrabold uppercase tracking-wide text-white shadow-[0_0_0_2px_rgba(255,255,255,0.85),0_6px_0_rgba(45,111,30,0.75),inset_0_2px_8px_rgba(255,255,255,0.55)] [text-shadow:0_2px_2px_rgba(26,91,16,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300"
          >
            Selanjutnya
          </Link>
        </div>
      </div>

      <Modal
        open={selectedMaterial !== null}
        onClose={closeMaterial}
        title={selectedMaterial?.title.replace("\n", " ") ?? ""}
        footer={
          <Button onClick={closeMaterial} size="sm">
            Mengerti
          </Button>
        }
      >
        {selectedMaterial ? (
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <AssetImage
              assetKey={selectedMaterial.assetKey}
              alt=""
              width={104}
              height={104}
              className="shrink-0"
              imageClassName="object-contain"
            />
            <p>{selectedMaterial.explanation}</p>
          </div>
        ) : null}
      </Modal>
    </main>
  );
}
