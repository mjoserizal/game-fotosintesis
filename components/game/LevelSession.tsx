"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { DialogBox } from "@/components/game/DialogBox";
import { DragDropBoard } from "@/components/game/DragDropBoard";
import { LabelGame } from "@/components/game/LabelGame";
import { MaterialCards } from "@/components/game/MaterialCards";
import { PhotosynthesisSimulator } from "@/components/game/PhotosynthesisSimulator";
import { QuizRound } from "@/components/game/QuizCard";
import { ResultModal } from "@/components/game/ResultModal";
import { ScoreBoard } from "@/components/game/ScoreBoard";
import { SequenceGame } from "@/components/game/SequenceGame";
import { Button } from "@/components/ui/Button";
import { AssetImage } from "@/components/ui/AssetImage";
import { Toast } from "@/components/ui/Toast";
import { getQuestionsForLevel } from "@/data/quiz";
import { getLevel, getNextLevelId, LEVELS } from "@/data/levels";
import { useAudio } from "@/hooks/useAudio";
import { useGameStore } from "@/hooks/useGameStore";
import { normalizePercent, starsFromPercent } from "@/lib/scoring";
import { accentStyle } from "@/lib/utils";
import type {
  ChallengeOutcome,
  FeedbackTone,
  Level,
  LevelId,
  LevelResult,
  Stage,
} from "@/types/game";

function challengePossible(level: Level): number {
  switch (level.challenge.kind) {
    case "drag":
    case "flow":
      return level.challenge.targets.length * 10;
    case "label":
      return level.challenge.slots.length * 10;
    case "sequence":
      return level.challenge.items.length * 20;
    case "simulator":
      return 100;
    case "mixed":
      return 0;
  }
}

type FinishOverrides = {
  score?: number;
  correct?: number;
  total?: number;
};

export function LevelSession({ levelId }: { levelId: LevelId }) {
  const level = getLevel(levelId) ?? LEVELS[0]!;
  const questions = getQuestionsForLevel(levelId);
  const { playSfx } = useAudio();
  const { progress, completeLevel } = useGameStore();
  const maxScore = challengePossible(level) + questions.length * 10;

  const [stage, setStage] = useState<Stage>("intro");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [hintsLeft, setHintsLeft] = useState(level.hints.length);
  const [hint, setHint] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    tone: FeedbackTone;
  } | null>(null);
  const [challengeStats, setChallengeStats] = useState({ correct: 0, total: 0 });
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<LevelResult | null>(null);
  const resultRef = useRef<LevelResult | null>(null);

  const resetSession = useCallback(() => {
    resultRef.current = null;
    setStage("intro");
    setScore(0);
    setLives(3);
    setHintsLeft(level.hints.length);
    setHint(null);
    setFeedback(null);
    setChallengeStats({ correct: 0, total: 0 });
    setQuizStats({ correct: 0, total: 0 });
    setElapsed(0);
    setResult(null);
  }, [level.hints.length]);

  useEffect(() => {
    resetSession();
  }, [resetSession]);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 2600);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const finalize = useCallback(
    (success: boolean, overrides?: FinishOverrides) => {
      if (resultRef.current) return;
      const finalScore = overrides?.score ?? score;
      const percent = normalizePercent(finalScore, maxScore);
      const finalResult: LevelResult = {
        levelId,
        percent,
        score: finalScore,
        stars: success ? starsFromPercent(percent, level.starThresholds) : 1,
        correct:
          overrides?.correct ?? challengeStats.correct + quizStats.correct,
        total: overrides?.total ?? challengeStats.total + quizStats.total,
        lives,
        elapsedSeconds: elapsed,
        success,
      };
      resultRef.current = finalResult;
      setResult(finalResult);
      setStage("hasil");
      if (success) {
        completeLevel(finalResult);
        playSfx("sfxMenang");
      } else {
        playSfx("sfxSalah");
      }
    },
    [
      score,
      maxScore,
      levelId,
      level.starThresholds,
      challengeStats,
      quizStats,
      lives,
      elapsed,
      completeLevel,
      playSfx,
    ],
  );

  useEffect(() => {
    if (!progress.settings.timerEnabled || result) return;
    if (stage !== "tantangan" && stage !== "kuis") return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [progress.settings.timerEnabled, result, stage]);

  useEffect(() => {
    if (level.timeLimitSeconds && elapsed >= level.timeLimitSeconds && !result) {
      finalize(false);
    }
  }, [elapsed, level.timeLimitSeconds, result, finalize]);

  useEffect(() => {
    if (lives <= 0 && !result) finalize(false);
  }, [lives, result, finalize]);

  const handleLifeLost = useCallback(() => {
    setLives((value) => Math.max(0, value - 1));
  }, []);

  const handleFeedback = useCallback(
    (message: string, tone: FeedbackTone) => setFeedback({ message, tone }),
    [],
  );

  const handleChallengeComplete = useCallback((outcome: ChallengeOutcome) => {
    setScore((value) => value + outcome.earned);
    setChallengeStats({ correct: outcome.correct, total: outcome.total });
    setStage("kuis");
  }, []);

  const handleQuizComplete = useCallback(
    (outcome: ChallengeOutcome) => {
      const finalScore = score + outcome.earned;
      setScore(finalScore);
      setQuizStats({ correct: outcome.correct, total: outcome.total });
      finalize(true, {
        score: finalScore,
        correct: challengeStats.correct + outcome.correct,
        total: challengeStats.total + outcome.total,
      });
    },
    [score, challengeStats, finalize],
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
      onLifeLost: handleLifeLost,
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
      case "simulator":
        return (
          <PhotosynthesisSimulator
            prompt={challenge.prompt}
            mission={challenge.mission}
            onFeedback={handleFeedback}
            onComplete={handleChallengeComplete}
          />
        );
      case "mixed":
        return (
          <div className="card-nature mx-auto max-w-xl text-center">
            <p className="text-sm leading-relaxed text-ink-700">{challenge.prompt}</p>
            <Button className="mt-4" size="lg" onClick={() => setStage("kuis")}>
              Mulai kuis akhir
            </Button>
          </div>
        );
    }
  };

  const nextId = getNextLevelId(levelId);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-5 px-4 py-5 sm:px-6">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20">
        <AssetImage
          assetKey={level.backgroundKey}
          alt=""
          fill
          imageClassName="object-cover"
        />
      </div>
      <header className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
        <Link href="/peta" className="focus-ring rounded-full px-3 py-1 text-leaf-700 hover:bg-leaf-50">
          Kembali ke peta
        </Link>
        <Link href="/" className="focus-ring rounded-full px-3 py-1 text-ink-500 hover:bg-white">
          Menu utama
        </Link>
      </header>
      <section
        className="rounded-3xl border-2 p-5 text-center shadow-card"
        style={accentStyle(level.accent)}
      >
        <p className="text-xs font-bold uppercase tracking-widest">Level {levelId}</p>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">{level.title}</h1>
        <p className="mt-1 text-sm opacity-80">{level.subtitle}</p>
        <p className="mt-1 text-xs font-semibold opacity-70">{level.location}</p>
      </section>
      <ScoreBoard
        score={score}
        lives={lives}
        hintsLeft={hintsLeft}
        onUseHint={useHint}
        elapsedSeconds={elapsed}
        timerEnabled={progress.settings.timerEnabled}
        timeLimitSeconds={level.timeLimitSeconds}
      />
      {hint ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
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
              onLifeLost={handleLifeLost}
              onFeedback={handleFeedback}
              onProgress={(correct, total) => setQuizStats({ correct, total })}
              onComplete={handleQuizComplete}
            />
          ) : null}
          {stage === "hasil" ? (
            <div className="py-10 text-center text-sm text-ink-500">Menyiapkan hasil...</div>
          ) : null}
        </motion.section>
      </AnimatePresence>
      <Toast
        message={feedback?.message ?? null}
        tone={feedback?.tone ?? "info"}
        onClose={() => setFeedback(null)}
      />
      <ResultModal
        result={result}
        level={level}
        nextHref={nextId ? `/level/${nextId}` : null}
        onRetry={resetSession}
      />
    </main>
  );
}
