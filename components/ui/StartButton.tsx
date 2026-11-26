"use client";

import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "onClick"
> & {
  children?: ReactNode;
  href?: string;
  color?: "green" | "blue" | "orange";
  compact?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

const colorStyles = {
  green: {
    background: "bg-gradient-to-b from-[#63d84d] via-[#33ad2c] to-[#1f8a1f]",
    shadow:
      "shadow-[inset_0_-7px_10px_rgba(0,70,0,0.38),inset_0_3px_5px_rgba(255,255,255,0.35)]",
    text: "[text-shadow:0_0_2px_#fff,0_0_5px_rgba(255,255,255,0.9),0_3px_0_#177017,0_4px_6px_rgba(0,50,0,0.45)]",
  },
  blue: {
    background: "bg-gradient-to-b from-[#55c7f5] via-[#159ddd] to-[#0874ba]",
    shadow:
      "shadow-[inset_0_-7px_10px_rgba(0,49,94,0.38),inset_0_3px_5px_rgba(255,255,255,0.35)]",
    text: "[text-shadow:0_0_2px_#fff,0_0_5px_rgba(255,255,255,0.9),0_3px_0_#075c95,0_4px_6px_rgba(0,40,70,0.45)]",
  },
  orange: {
    background: "bg-gradient-to-b from-[#ffb321] via-[#ff8c00] to-[#ed6500]",
    shadow:
      "shadow-[inset_0_-7px_10px_rgba(117,45,0,0.38),inset_0_3px_5px_rgba(255,255,255,0.35)]",
    text: "[text-shadow:0_0_2px_#fff,0_0_5px_rgba(255,255,255,0.9),0_3px_0_#ba4c00,0_4px_6px_rgba(80,30,0,0.45)]",
  },
} as const;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 focus-visible:ring-offset-2";

export default function StartButton({
  children = "Mulai Belajar",
  href,
  color = "green",
  compact = false,
  className = "",
  onClick,
  ...rest
}: Props) {
  const styles = colorStyles[color];
  const padding = compact
    ? "px-8 py-2 sm:px-8 sm:py-2"
    : "px-8 py-3 sm:px-8 sm:py-3.5";
  const textSize = compact ? "text-lg sm:text-xl" : "text-lg sm:text-2xl";
  const shell = cn(
    "group relative inline-block rounded-full p-[5px]",
    "bg-gradient-to-b from-white to-[#d8d8d0]",
    "shadow-[0_6px_14px_rgba(0,0,0,0.28),inset_0_-2px_3px_rgba(0,0,0,0.12)]",
    "transition-transform duration-150 ease-out",
    "hover:scale-[1.04] hover:brightness-105",
    "active:translate-y-[3px] active:scale-[0.98] active:shadow-[0_2px_6px_rgba(0,50,0,0.45)]",
    "motion-reduce:transition-none motion-reduce:hover:scale-100",
    focusRing,
    className,
  );

  const inner = (
    <span
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full",
        padding,
        styles.background,
        styles.shadow,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-1 h-[38%] rounded-full bg-gradient-to-b from-white/45 to-white/0"
      />
      <span
        className={cn(
          "relative font-[family-name:var(--font-fredoka),ui-rounded,system-ui,sans-serif]",
          "text-center font-bold uppercase leading-tight tracking-wide text-white",
          textSize,
          styles.text,
          "[-webkit-text-stroke:1.5px_rgba(255,255,255,0.95)]",
        )}
      >
        {children}
      </span>
    </span>
  );

  return href ? (
    <Link href={href} onClick={onClick} className={shell}>
      {inner}
    </Link>
  ) : (
    <button type="button" className={shell} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
