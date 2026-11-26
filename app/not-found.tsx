import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 text-center">
      <p className="font-heading text-6xl font-bold text-leaf-700">404</p>
      <p className="text-ink-700">Level atau halaman ini tidak ditemukan.</p>
      <LinkButton href="/peta">Kembali ke peta</LinkButton>
    </main>
  );
}
