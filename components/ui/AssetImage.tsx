"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { assetLabel, assetPath, type AssetKey } from "@/lib/assets";
import { cn } from "@/lib/utils";

const PLACEHOLDER_STYLES = [
  "bg-leaf-100 text-leaf-800",
  "bg-sun-100 text-sun-700",
  "bg-sky-100 text-sky-500",
  "bg-soil-100 text-soil-700",
];

type AssetImageProps = {
  assetKey: AssetKey;
  alt?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

export function AssetImage({
  assetKey,
  alt,
  className,
  imageClassName,
  width = 96,
  height = 96,
  fill = false,
  sizes = "(max-width: 640px) 100vw, 400px",
  priority = false,
}: AssetImageProps) {
  const [failed, setFailed] = useState(false);
  const label = alt ?? assetLabel(assetKey);
  const slot = assetKey
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const placeholderClass =
    PLACEHOLDER_STYLES[slot % PLACEHOLDER_STYLES.length] ?? PLACEHOLDER_STYLES[0];

  useEffect(() => {
    setFailed(false);
  }, [assetKey]);

  const placeholder = (
    <div
      role="img"
      aria-label={`${label} (placeholder asset)`}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-current/30 p-2 text-center",
        placeholderClass,
      )}
    >
      <span className="text-xs font-bold leading-tight">{label}</span>
      <span className="text-[10px] opacity-70">asset belum ada</span>
    </div>
  );

  if (failed) {
    return (
      <div
        className={cn(
          fill ? "relative" : "inline-block",
          className,
        )}
        style={fill ? undefined : { width, height }}
      >
        {placeholder}
      </div>
    );
  }

  return (
    <div
      className={cn(
        fill ? "relative overflow-hidden" : "inline-block",
        className,
      )}
      style={fill ? undefined : { width, height }}
    >
      <Image
        src={assetPath(assetKey)}
        alt={label}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={fill ? sizes : undefined}
        priority={priority}
        unoptimized
        className={cn("h-full w-full object-contain", imageClassName)}
        onError={() => setFailed(true)}
      />
      {/* TODO: hapus fallback setelah semua aset produksi tersedia. */}
    </div>
  );
}
