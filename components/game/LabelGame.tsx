"use client";

import { DragDropBoard } from "@/components/game/DragDropBoard";
import type {
  ChallengeOutcome,
  FeedbackTone,
  LabelChoice,
  LabelSlot,
} from "@/types/game";

type LabelGameProps = {
  prompt: string;
  choices: LabelChoice[];
  slots: LabelSlot[];
  onLifeLost: () => void;
  onFeedback: (message: string, tone: FeedbackTone) => void;
  onComplete: (outcome: ChallengeOutcome) => void;
};

export function LabelGame({
  prompt,
  choices,
  slots,
  onLifeLost,
  onFeedback,
  onComplete,
}: LabelGameProps) {
  const options = choices.map((choice) => ({
    id: choice.id,
    label: choice.text,
    assetKey: choice.assetKey ?? "badge",
  }));

  const targets = slots.map((slot) => ({
    id: slot.id,
    label: slot.prompt,
    description: "Letakkan nama bagian di sini",
    accepts: [slot.correctChoiceId],
    assetKey: slot.assetKey,
  }));

  return (
    <DragDropBoard
      prompt={prompt}
      options={options}
      targets={targets}
      onLifeLost={onLifeLost}
      onFeedback={onFeedback}
      onComplete={onComplete}
    />
  );
}
