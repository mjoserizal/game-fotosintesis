"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import type { MaterialCard } from "@/types/game";

export function MaterialCards({
  cards,
  objective,
  onDone,
}: {
  cards: MaterialCard[];
  objective: string;
  onDone: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(cards[0]?.id ?? null);

  return (
    <motion.div
      className="mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-5 rounded-3xl bg-leaf-700 p-5 text-center text-white shadow-soft">
        <p className="text-xs font-bold uppercase tracking-widest text-leaf-100">Misi</p>
        <p className="mt-1 font-heading text-lg sm:text-xl">{objective}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const open = openId === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setOpenId(open ? null : card.id)}
              aria-expanded={open}
              className="focus-ring card-nature flex h-full flex-col items-start gap-3 text-left transition-shadow hover:shadow-soft"
            >
              <AssetImage
                assetKey={card.assetKey}
                alt={card.title}
                width={64}
                height={64}
                className="rounded-2xl"
              />
              <span className="font-heading text-lg font-bold text-leaf-800">{card.title}</span>
              <span className="text-sm leading-relaxed text-ink-700">{card.body}</span>
              <AnimatePresence initial={false}>
                {open && card.fact ? (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="chip mt-auto"
                  >
                    {card.fact}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <Button size="lg" onClick={onDone}>
          Lanjut ke tantangan
        </Button>
      </div>
    </motion.div>
  );
}
