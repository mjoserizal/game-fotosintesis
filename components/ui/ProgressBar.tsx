import { motion } from "framer-motion";
import { clamp, cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
  tone?: "leaf" | "sun" | "sky";
};

const TONES = {
  leaf: "bg-leaf-500",
  sun: "bg-sun-400",
  sky: "bg-sky-400",
} as const;

export function ProgressBar({
  value,
  label,
  className,
  tone = "leaf",
}: ProgressBarProps) {
  const safeValue = Math.round(clamp(value, 0, 100));
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1 flex items-center justify-between text-xs font-bold text-ink-500">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        aria-label={label ?? "Progres"}
        className="h-3 w-full overflow-hidden rounded-full bg-leaf-100"
      >
        <motion.div
          className={cn("h-full rounded-full", TONES[tone])}
          initial={false}
          animate={{ width: `${safeValue}%` }}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
        />
      </div>
    </div>
  );
}
