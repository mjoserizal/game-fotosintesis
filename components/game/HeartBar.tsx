import { AssetImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils";

export function HeartBar({ lives, max = 3 }: { lives: number; max?: number }) {
  return (
    <div
      role="img"
      aria-label={`Nyawa ${lives} dari ${max}`}
      className="flex items-center gap-1"
    >
      {Array.from({ length: max }, (_, index) => (
        <AssetImage
          key={index}
          assetKey="hati"
          width={28}
          height={28}
          className={cn("transition-opacity", index >= lives && "opacity-25 grayscale")}
        />
      ))}
    </div>
  );
}
