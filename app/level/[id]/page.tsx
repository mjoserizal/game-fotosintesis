import { notFound, redirect } from "next/navigation";

export default function LegacyLevelRoute({
  params,
}: {
  params: { id: string };
}) {
  if (params.id !== "1") notFound();
  redirect("/kuis");
}
