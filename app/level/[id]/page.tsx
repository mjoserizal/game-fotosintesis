import { LevelSession } from "@/components/game/LevelSession";
import { LEVEL_IDS } from "@/data/levels";
import { notFound } from "next/navigation";
import type { LevelId } from "@/types/game";

export function generateStaticParams() {
  return LEVEL_IDS.map((id) => ({ id: String(id) }));
}

export default function LevelPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!LEVEL_IDS.includes(id as LevelId)) notFound();
  return <LevelSession levelId={id as LevelId} />;
}
