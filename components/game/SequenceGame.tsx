"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import { useAudio } from "@/hooks/useAudio";
import type {
  ChallengeOutcome,
  FeedbackTone,
  SequenceItem,
} from "@/types/game";

type SequenceGameProps = {
  prompt: string;
  items: SequenceItem[];
  onLifeLost: () => void;
  onFeedback: (message: string, tone: FeedbackTone) => void;
  onComplete: (outcome: ChallengeOutcome) => void;
};

export function SequenceGame({
  prompt,
  items,
  onLifeLost,
  onFeedback,
  onComplete,
}: SequenceGameProps) {
  const { playSfx } = useAudio();
  const [order, setOrder] = useState<SequenceItem[]>(() => [...items].reverse());
  const completedRef = useRef(false);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    playSfx("sfxKlik");
    setOrder((previous) => {
      const next = [...previous];
      const current = next[index];
      const swapped = next[target];
      if (!current || !swapped) return previous;
      next[index] = swapped;
      next[target] = current;
      return next;
    });
  };

  const check = () => {
    if (completedRef.current) return;
    const correctCount = order.filter(
      (item, index) => item.id === items[index]?.id,
    ).length;
    if (correctCount === items.length) {
      completedRef.current = true;
      playSfx("sfxBenar");
      onFeedback("Urutan tepat! Siklus Calvin siap berjalan.", "success");
      onComplete({
        earned: items.length * 20,
        possible: items.length * 20,
        correct: correctCount,
        total: items.length,
      });
      return;
    }
    onLifeLost();
    playSfx("sfxSalah");
    onFeedback(`${correctCount} dari ${items.length} posisi sudah tepat. Coba lagi.`, "error");
  };

  return (
    <motion.div
      className="mx-auto max-w-3xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="mb-5 text-center text-sm font-semibold text-ink-700 sm:text-base">
        {prompt}
      </p>
      <ol className="grid gap-3">
        {order.map((item, index) => (
          <motion.li
            key={item.id}
            layout
            className="card-nature flex items-center gap-3 py-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-100 font-heading text-lg font-bold text-leaf-700">
              {index + 1}
            </span>
            {item.assetKey ? (
              <AssetImage assetKey={item.assetKey} alt={item.text} width={48} height={48} />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="font-heading font-bold text-leaf-800">{item.text}</p>
              <p className="text-xs leading-snug text-ink-500">{item.detail}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Naikkan ${item.text}`}
                className="focus-ring rounded-lg bg-leaf-50 px-2 py-1 text-xs font-bold text-leaf-700 disabled:opacity-30"
              >
                Naik
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === order.length - 1}
                aria-label={`Turunkan ${item.text}`}
                className="focus-ring rounded-lg bg-leaf-50 px-2 py-1 text-xs font-bold text-leaf-700 disabled:opacity-30"
              >
                Turun
              </button>
            </div>
          </motion.li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button
          variant="secondary"
          onClick={() => {
            playSfx("sfxKlik");
            setOrder([...items].reverse());
          }}
        >
          Ulangi urutan
        </Button>
        <Button size="lg" onClick={check}>
          Cek urutan
        </Button>
      </div>
    </motion.div>
  );
}
