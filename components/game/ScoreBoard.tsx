import { Button } from "@/components/ui/Button";
import { formatTime } from "@/lib/utils";

type ScoreBoardProps = {
  score: number;
  hintsLeft: number;
  onUseHint: () => void;
  elapsedSeconds: number;
  timerEnabled: boolean;
};

export function ScoreBoard({
  score,
  hintsLeft,
  onUseHint,
  elapsedSeconds,
  timerEnabled,
}: ScoreBoardProps) {
  return (
    <div className="card-nature flex flex-wrap items-center gap-x-5 gap-y-3 py-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-500">Skor</p>
        <p className="font-heading text-xl font-bold text-leaf-700">{score}</p>
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
          </p>
        </div>
      ) : null}
    </div>
  );
}
