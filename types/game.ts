import type { AssetKey } from "@/lib/assets";

export type LevelId = 1 | 2 | 3 | 4 | 5 | 6;

export type StarCount = 1 | 2 | 3;

export type Stage = "intro" | "materi" | "tantangan" | "kuis" | "hasil";

export type AccentColor = "leaf" | "sun" | "sky" | "violet" | "soil" | "rose";

export type DialogLine = {
  speaker: string;
  text: string;
  assetKey: AssetKey;
};

export type MaterialCard = {
  id: string;
  title: string;
  body: string;
  assetKey: AssetKey;
  fact?: string;
};

export type DragOption = {
  id: string;
  label: string;
  assetKey: AssetKey;
};

export type DragTarget = {
  id: string;
  label: string;
  description: string;
  accepts: string[];
  assetKey?: AssetKey;
};

export type LabelChoice = {
  id: string;
  text: string;
  assetKey?: AssetKey;
};

export type LabelSlot = {
  id: string;
  prompt: string;
  correctChoiceId: string;
  assetKey: AssetKey;
};

export type SequenceItem = {
  id: string;
  text: string;
  detail: string;
  assetKey?: AssetKey;
};

export type RateFactors = {
  light: number;
  co2: number;
  temperature: number;
  water: number;
};

export type SimulatorMission = {
  label: string;
  targetRate: number;
  suggested: RateFactors;
  tolerance: number;
};

export type Challenge =
  | {
      kind: "drag";
      prompt: string;
      options: DragOption[];
      targets: DragTarget[];
    }
  | {
      kind: "label";
      prompt: string;
      choices: LabelChoice[];
      slots: LabelSlot[];
    }
  | {
      kind: "flow";
      prompt: string;
      options: DragOption[];
      targets: DragTarget[];
    }
  | {
      kind: "sequence";
      prompt: string;
      items: SequenceItem[];
    }
  | {
      kind: "simulator";
      prompt: string;
      mission: SimulatorMission;
    }
  | {
      kind: "mixed";
      prompt: string;
    };

export type QuestionType = "multiple" | "boolean" | "equation";

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  levelId: LevelId;
  type: QuestionType;
  prompt: string;
  options: QuizOption[];
  answerIds: string[];
  explanation: string;
  hint?: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  assetKey: AssetKey;
};

export type Level = {
  id: LevelId;
  title: string;
  subtitle: string;
  location: string;
  accent: AccentColor;
  backgroundKey: AssetKey;
  intro: DialogLine[];
  materials: MaterialCard[];
  objective: string;
  challenge: Challenge;
  hints: string[];
  badge: Badge;
  starThresholds: [number, number, number];
  timeLimitSeconds?: number;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  levelId: LevelId;
  assetKey?: AssetKey;
};

export type GameSettings = {
  muted: boolean;
  bgmVolume: number;
  sfxVolume: number;
  timerEnabled: boolean;
};

export type PersistedProgress = {
  version: 1;
  unlockedLevelIds: LevelId[];
  completedLevelIds: LevelId[];
  stars: Partial<Record<LevelId, number>>;
  bestScores: Partial<Record<LevelId, number>>;
  badges: string[];
  unlockedGlossary: string[];
  lastLevelId: LevelId;
  settings: GameSettings;
};

export type LevelResult = {
  levelId: LevelId;
  percent: number;
  score: number;
  stars: StarCount;
  correct: number;
  total: number;
  lives: number;
  elapsedSeconds: number;
  success: boolean;
};

export type FeedbackTone = "success" | "error" | "info";

export type ChallengeOutcome = {
  earned: number;
  possible: number;
  correct: number;
  total: number;
};
