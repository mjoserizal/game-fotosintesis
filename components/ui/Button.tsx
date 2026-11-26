import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const BASE =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-bold transition-transform duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-leaf-600 text-white shadow-soft hover:bg-leaf-700",
  secondary: "bg-white text-leaf-800 ring-2 ring-leaf-200 hover:bg-leaf-50",
  ghost: "bg-transparent text-ink-700 hover:bg-leaf-50",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3 text-base sm:text-lg",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className)}
      {...props}
    />
  );
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
};

export function LinkButton({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className)}
      {...props}
    />
  );
}
