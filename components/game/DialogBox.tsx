"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import { useAudio } from "@/hooks/useAudio";
import type { DialogLine } from "@/types/game";

export function DialogBox({
  lines,
  onDone,
}: {
  lines: DialogLine[];
  onDone: () => void;
}) {
  const { playSfx } = useAudio();
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const line = lines[index] ?? {
    speaker: "",
    text: "",
    assetKey: "maskot" as const,
  };

  useEffect(() => {
    setShown(0);
    const timer = window.setInterval(() => {
      setShown((current) => {
        if (current >= line.text.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 24);
    return () => window.clearInterval(timer);
  }, [index, line.text]);

  const isTyping = shown < line.text.length;

  const handleAdvance = () => {
    playSfx("sfxKlik");
    if (isTyping) {
      setShown(line.text.length);
      return;
    }
    if (index < lines.length - 1) {
      setIndex(index + 1);
      return;
    }
    onDone();
  };

  return (
    <motion.div
      className="card-nature mx-auto max-w-3xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start gap-4">
        <AssetImage
          assetKey={line.assetKey}
          alt={line.speaker}
          width={88}
          height={88}
          className="shrink-0 rounded-2xl"
        />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-bold text-leaf-700">{line.speaker}</p>
          <p
            aria-live="polite"
            className="mt-1 min-h-[5rem] text-sm leading-relaxed text-ink-700 sm:text-base"
          >
            {line.text.slice(0, shown)}
            {isTyping ? <span aria-hidden="true">|</span> : null}
          </p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-ink-500">
              {index + 1} / {lines.length}
            </span>
            <Button onClick={handleAdvance}>
              {isTyping ? "Tampilkan teks" : index < lines.length - 1 ? "Lanjut" : "Ke materi"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
