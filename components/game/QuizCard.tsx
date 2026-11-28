"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAudio } from "@/hooks/useAudio";
import { cn } from "@/lib/utils";
import type {
  ChallengeOutcome,
  FeedbackTone,
  QuizQuestion,
} from "@/types/game";

type QuizCardProps = {
  question: QuizQuestion;
  number: number;
  total: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
};

export function QuizCard({
  question,
  number,
  total,
  onAnswered,
  onNext,
}: QuizCardProps) {
  const { playSfx } = useAudio();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const tokens =
    question.type === "equation" ? [...question.options].reverse() : [];

  const canSubmit =
    question.type === "equation"
      ? selectedIds.length === question.answerIds.length
      : selectedId !== null;

  const submit = () => {
    if (submitted || !canSubmit) return;
    const correct =
      question.type === "equation"
        ? selectedIds.every((id, index) => id === question.answerIds[index])
        : question.answerIds.includes(selectedId ?? "");
    setSubmitted(true);
    setIsCorrect(correct);
    playSfx(correct ? "sfxBenar" : "sfxSalah");
    onAnswered(correct);
  };

  const toggleToken = (id: string) => {
    if (submitted) return;
    playSfx("sfxKlik");
    setSelectedIds((previous) => {
      const lastIndex = previous.lastIndexOf(id);
      if (lastIndex >= 0) {
        return previous.filter((_, index) => index !== lastIndex);
      }
      return [...previous, id];
    });
  };

  return (
    <motion.div
      className="card-nature mx-auto max-w-3xl"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="chip">Soal {number} dari {total}</span>
        <span className="text-xs font-semibold capitalize text-ink-500">
          {question.type === "multiple"
            ? "Pilihan ganda"
            : question.type === "boolean"
              ? "Benar / salah"
              : "Susun urutan"}
        </span>
      </div>
      <h3 className="font-heading text-xl font-bold text-leaf-800">{question.prompt}</h3>

      {question.type === "equation" ? (
        <div className="mt-4">
          <div
            aria-live="polite"
            className="mb-4 flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-leaf-200 bg-leaf-50/60 p-3"
          >
            {selectedIds.length === 0 ? (
              <span className="text-sm text-ink-500">Klik potongan untuk menyusun jawaban.</span>
            ) : (
              selectedIds.map((id, index) => {
                const option = question.options.find((item) => item.id === id);
                return (
                  <button
                    key={`${id}-${index}`}
                    type="button"
                    disabled={submitted}
                    onClick={() => toggleToken(id)}
                    className="focus-ring rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-leaf-800 shadow-card"
                  >
                    {option?.text ?? id}
                  </button>
                );
              })
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens.map((option) => (
              <button
                key={option.id}
                type="button"
                disabled={submitted}
                onClick={() => toggleToken(option.id)}
                className="focus-ring rounded-xl border-2 border-leaf-100 bg-white px-3 py-2 text-sm font-semibold text-ink-700 hover:border-leaf-300"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-2">
          {question.options.map((option) => {
            const chosen = selectedId === option.id;
            const right = submitted && question.answerIds.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                disabled={submitted}
                aria-pressed={chosen}
                onClick={() => {
                  if (submitted) return;
                  playSfx("sfxKlik");
                  setSelectedId(option.id);
                }}
                className={cn(
                  "focus-ring rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition sm:text-base",
                  right
                    ? "border-leaf-500 bg-leaf-50 text-leaf-800"
                    : chosen
                      ? "border-sky-400 bg-sky-50 text-sky-700"
                      : "border-leaf-100 bg-white text-ink-700 hover:border-leaf-300",
                )}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      )}

      {submitted ? (
        <div
          aria-live="polite"
          className={cn(
            "mt-4 rounded-2xl p-4 text-sm leading-relaxed",
            isCorrect ? "bg-leaf-50 text-leaf-800" : "bg-rose-50 text-rose-800",
          )}
        >
          <p className="font-bold">{isCorrect ? "Benar!" : "Belum tepat."}</p>
          <p className="mt-1">{question.explanation}</p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap justify-end gap-3">
        {!submitted ? (
          <Button size="lg" disabled={!canSubmit} onClick={submit}>
            Cek jawaban
          </Button>
        ) : (
          <Button size="lg" onClick={onNext}>
            {number === total ? "Selesai kuis" : "Soal berikutnya"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

type QuizRoundProps = {
  questions: QuizQuestion[];
  onFeedback: (message: string, tone: FeedbackTone) => void;
  onProgress: (correct: number, total: number) => void;
  onComplete: (outcome: ChallengeOutcome) => void;
};

export function QuizRound({
  questions,
  onFeedback,
  onProgress,
  onComplete,
}: QuizRoundProps) {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [indicatorCorrect, setIndicatorCorrect] = useState({
    concept: 0,
    materials: 0,
    energy: 0,
    products: 0,
  });
  const question = questions[index];

  if (!question) return null;

  const handleAnswered = (isCorrect: boolean) => {
    const nextCorrect = correct + (isCorrect ? 1 : 0);
    setCorrect(nextCorrect);
    if (isCorrect) {
      setIndicatorCorrect((scores) => ({
        ...scores,
        [question.indicatorId]: scores[question.indicatorId] + 1,
      }));
    }
    onProgress(nextCorrect, questions.length);
    if (isCorrect) {
      onFeedback("Jawaban benar.", "success");
      return;
    }
    onFeedback("Jawaban belum tepat. Baca penjelasannya, ya.", "error");
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    onComplete({
      earned: correct * 10,
      possible: questions.length * 10,
      correct,
      total: questions.length,
      indicatorCorrect,
    });
  };

  return (
    <QuizCard
      key={question.id}
      question={question}
      number={index + 1}
      total={questions.length}
      onAnswered={handleAnswered}
      onNext={handleNext}
    />
  );
}
