"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { DialogBox } from "@/components/game/DialogBox";
import { DragDropBoard } from "@/components/game/DragDropBoard";
import { LabelGame } from "@/components/game/LabelGame";
import { MaterialCards } from "@/components/game/MaterialCards";
import { QuizRound } from "@/components/game/QuizCard";
import { ScoreBoard } from "@/components/game/ScoreBoard";
import { SequenceGame } from "@/components/game/SequenceGame";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import { MusicToggle } from "@/components/ui/MusicToggle";
import StartButton from "@/components/ui/StartButton";
import { Toast } from "@/components/ui/Toast";
import { getQuestionsForLevel } from "@/data/quiz";
import { getLevel, LEVELS } from "@/data/levels";
import { useAudio } from "@/hooks/useAudio";
import { useGameStore } from "@/hooks/useGameStore";
import { normalizePercent, starsFromPercent } from "@/lib/scoring";
import type {
  ChallengeOutcome,
  FeedbackTone,
  IndicatorCorrect,
  LevelId,
  LevelResult,
  Stage,
} from "@/types/game";

type FinishOverrides = {
  score?: number;
  correct?: number;
  total?: number;
  indicatorCorrect?: IndicatorCorrect;
};

const EMPTY_INDICATOR_CORRECT: IndicatorCorrect = {
  concept: 0,
  materials: 0,
  energy: 0,
  products: 0,
};

export function LevelSession({ levelId }: { levelId: LevelId }) {
  const router = useRouter();
  const level = getLevel(levelId) ?? LEVELS[0]!;
  const questions = getQuestionsForLevel(levelId);
  const { playSfx } = useAudio();
  const { progress, recordLevelResult } = useGameStore();
  const maxScore = questions.length * 10;

  const [stage, setStage] = useState<Stage>("intro");
  const [score, setScore] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(level.hints.length);
  const [hint, setHint] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    tone: FeedbackTone;
  } | null>(null);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });
  const [elapsed, setElapsed] = useState(0);
  const resultRef = useRef<LevelResult | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 2600);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const finalize = useCallback(
    (overrides?: FinishOverrides) => {
      if (resultRef.current) return;
      const finalScore = overrides?.score ?? score;
      const percent = normalizePercent(finalScore, maxScore);
      const stars = starsFromPercent(percent, level.starThresholds);
      const finalResult: LevelResult = {
        levelId,
        percent,
        score: finalScore,
        stars,
        correct: overrides?.correct ?? quizStats.correct,
        total: overrides?.total ?? quizStats.total,
        indicatorCorrect:
          overrides?.indicatorCorrect ?? EMPTY_INDICATOR_CORRECT,
        elapsedSeconds: elapsed,
        success: stars > 0,
      };
      resultRef.current = finalResult;
      setStage("hasil");
      recordLevelResult(finalResult);
      playSfx(finalResult.success ? "sfxMenang" : "sfxSalah");
      router.replace("/selesai");
    },
    [
      score,
      maxScore,
      levelId,
      level.starThresholds,
      quizStats,
      elapsed,
      recordLevelResult,
      playSfx,
      router,
    ],
  );

  useEffect(() => {
    if (stage !== "tantangan" && stage !== "kuis") return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [stage]);

  const handleFeedback = useCallback(
    (message: string, tone: FeedbackTone) => setFeedback({ message, tone }),
    [],
  );

  const handleChallengeComplete = useCallback(() => setStage("kuis"), []);

  const handleQuizComplete = useCallback(
    (outcome: ChallengeOutcome) => {
      const finalScore = score + outcome.earned;
      setScore(finalScore);
      setQuizStats({ correct: outcome.correct, total: outcome.total });
      finalize({
        score: finalScore,
        correct: outcome.correct,
        total: outcome.total,
        indicatorCorrect: outcome.indicatorCorrect,
      });
    },
    [score, finalize],
  );

  const useHint = useCallback(() => {
    if (hintsLeft <= 0) return;
    playSfx("sfxKlik");
    const used = level.hints.length - hintsLeft;
    const text = level.hints[used] ?? level.hints[level.hints.length - 1] ?? null;
    setHint(text);
    setHintsLeft((value) => value - 1);
    if (text) handleFeedback(`Petunjuk: ${text}`, "info");
  }, [hintsLeft, level.hints, playSfx, handleFeedback]);

  const renderChallenge = () => {
    const common = {
      onFeedback: handleFeedback,
      onComplete: handleChallengeComplete,
    };
    const challenge = level.challenge;
    switch (challenge.kind) {
      case "drag":
      case "flow":
        return (
          <DragDropBoard
            prompt={challenge.prompt}
            options={challenge.options}
            targets={challenge.targets}
            {...common}
          />
        );
      case "label":
        return (
          <LabelGame
            prompt={challenge.prompt}
            choices={challenge.choices}
            slots={challenge.slots}
            {...common}
          />
        );
      case "sequence":
        return (
          <SequenceGame
            prompt={challenge.prompt}
            items={challenge.items}
            {...common}
          />
        );
      case "mixed":
        return (
          <div className="card-nature mx-auto max-w-xl text-center">
            <p className="text-sm leading-relaxed text-ink-700">{challenge.prompt}</p>
            <Button className="mt-4" size="lg" onClick={() => setStage("kuis")}>
              Mulai kuis
            </Button>
          </div>
        );
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden px-3 py-8 pb-24 sm:px-6">
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
      <div className="relative z-10 flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col gap-5 rounded-[36px] border-2 border-[#fff2d2] bg-white/30 px-4 py-5 shadow-[0_12px_35px_rgba(20,54,24,0.2)] backdrop-blur-[3px] sm:rounded-[46px] sm:px-7 sm:py-7">
        <header className="flex flex-wrap items-center justify-end gap-3 text-sm font-bold">
          <StartButton href="/" color="green" compact>
            Menu utama
          </StartButton>
        </header>
        <section
          className="rounded-3xl border-2 border-white/90 bg-white/85 p-5 text-center text-leaf-800 shadow-card backdrop-blur-sm"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-leaf-700">Kuis</p>
          <h1 className="font-heading text-3xl font-bold text-leaf-800 sm:text-4xl">{level.title}</h1>
          <p className="mt-1 text-sm text-ink-700">{level.subtitle}</p>
        </section>
        <ScoreBoard
          score={score}
          hintsLeft={hintsLeft}
          onUseHint={useHint}
          elapsedSeconds={elapsed}
          timerEnabled={progress.settings.timerEnabled}
        />
        {hint ? (
          <div className="rounded-2xl border border-sky-200 bg-sky-50/95 px-4 py-3 text-sm text-sky-800">
            <span className="font-bold">Petunjuk: </span>
            {hint}
          </div>
        ) : null}
        <AnimatePresence mode="wait">
          <motion.section
            key={stage}
            className="flex-1 py-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {stage === "intro" ? (
              <DialogBox lines={level.intro} onDone={() => setStage("materi")} />
            ) : null}
            {stage === "materi" ? (
              <MaterialCards
                cards={level.materials}
                objective={level.objective}
                onDone={() => setStage("tantangan")}
              />
            ) : null}
            {stage === "tantangan" ? renderChallenge() : null}
            {stage === "kuis" ? (
              <QuizRound
                questions={questions}
                onFeedback={handleFeedback}
                onProgress={(correct, total) => setQuizStats({ correct, total })}
                onComplete={handleQuizComplete}
              />
            ) : null}
            {stage === "hasil" ? (
              <div className="py-10 text-center text-sm text-ink-500">Membuka hasil kuis...</div>
            ) : null}
          </motion.section>
        </AnimatePresence>
      </div>
      <Toast
        message={feedback?.message ?? null}
        tone={feedback?.tone ?? "info"}
        onClose={() => setFeedback(null)}
      />
      <MusicToggle />
    </main>
  );
}
