import { HeartBar } from "@/components/game/HeartBar";
import { Button } from "@/components/ui/Button";
import { formatTime } from "@/lib/utils";

type ScoreBoardProps = {
  score: number;
  lives: number;
  hintsLeft: number;
  onUseHint: () => void;
  elapsedSeconds: number;
  timerEnabled: boolean;
  timeLimitSeconds?: number;
};

export function ScoreBoard({
  score,
  lives,
  hintsLeft,
  onUseHint,
  elapsedSeconds,
  timerEnabled,
  timeLimitSeconds,
}: ScoreBoardProps) {
  return (
    <div className="card-nature flex flex-wrap items-center gap-x-5 gap-y-3 py-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">Skor</p>
        <p className="font-heading text-xl font-bold text-leaf-700">{score}</p>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">Nyawa</p>
        <HeartBar lives={lives} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">Petunjuk</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onUseHint}
          disabled={hintsLeft <= 0}
          className="px-2 py-1 text-xs"
        >
          Pakai ({hintsLeft})
        </Button>
      </div>
      {timerEnabled ? (
        <div className="ml-auto">
          <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">Waktu</p>
          <p className="font-heading text-lg font-bold text-ink-700">
            {formatTime(elapsedSeconds)}
            {timeLimitSeconds ? ` / ${formatTime(timeLimitSeconds)}` : ""}
          </p>
        </div>
      ) : null}
    </div>
  );
}
