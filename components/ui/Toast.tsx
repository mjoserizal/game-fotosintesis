"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ToastProps = {
  message: string | null;
  tone?: "success" | "error" | "info";
  onClose?: () => void;
};

const TONES = {
  success: "border-leaf-300 bg-leaf-50 text-leaf-800",
  error: "border-rose-300 bg-rose-50 text-rose-800",
  info: "border-sky-300 bg-sky-50 text-sky-700",
} as const;

export function Toast({ message, tone = "info", onClose }: ToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <AnimatePresence>
        {message ? (
          <motion.div
            role="status"
            aria-live="polite"
            className={cn(
              "pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-card",
              TONES[tone],
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <span>{message}</span>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup pesan"
                className="focus-ring rounded-full px-2 text-xs font-bold opacity-70 hover:opacity-100"
              >
                X
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
