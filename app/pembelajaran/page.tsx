"use client";

import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import StartButton from "@/components/ui/StartButton";
import { useAudio } from "@/hooks/useAudio";

export default function PembelajaranPage() {
  const { unlockAudio } = useAudio();

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden px-4 py-10 sm:px-8">
      <div className="fixed inset-0">
        <AssetImage
          assetKey="bgFotosintesis"
          alt=""
          fill
          className="h-full w-full"
          imageClassName="object-cover object-center"
          priority
        />
      </div>

      <section className="relative z-10 w-full max-w-4xl rounded-[36px] border-2 border-[#fff2d2] bg-white/90 p-5 shadow-[0_12px_35px_rgba(20,54,24,0.2)] backdrop-blur-sm sm:rounded-[46px] sm:p-9">
        <p className="text-center text-xs font-extrabold uppercase tracking-[0.2em] text-leaf-600">
          Sebelum bermain
        </p>
        <h1 className="mt-2 text-center font-heading text-3xl font-extrabold text-leaf-800 sm:text-4xl">
          Pelajari Proses Fotosintesis
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-700 sm:text-base">
          Tonton video singkat berikut, lalu lanjutkan untuk mempelajari bahan
          dan tahapan fotosintesis.
        </p>

        <div className="mx-auto mt-6 aspect-video w-full max-w-3xl overflow-hidden rounded-3xl border-4 border-white bg-black shadow-card">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/OZNTBLlVR78"
            title="Video pembelajaran proses fotosintesis"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full px-5 py-3 text-sm font-bold text-leaf-800 underline underline-offset-4 hover:text-leaf-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500"
          >
            Kembali
          </Link>
          <StartButton
            href="/pembelajaran/cerita"
            onClick={unlockAudio}
            className="min-w-[220px]"
          >
            Selanjutnya
          </StartButton>
        </div>
      </section>
    </main>
  );
}
