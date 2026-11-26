"use client";

import { AssetImage } from "@/components/ui/AssetImage";
import StartButton from "@/components/ui/StartButton";
import { useAudio } from "@/hooks/useAudio";

export default function HomePage() {
  const { unlockAudio } = useAudio();

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-x-hidden px-4 py-8">
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

      <div className="relative z-10 w-[min(82vw,460px)]">
        <AssetImage
          assetKey="prosesBanner"
          alt="Proses Fotosintesis"
          fill
          sizes="(max-width: 560px) 82vw, 460px"
          className="aspect-[802/336] w-full"
          imageClassName="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 mt-12 flex w-[min(82vw,280px)] flex-col items-center gap-4">
        <StartButton
          href="/level/1"
          onClick={unlockAudio}
          className="w-full"
        />
        <StartButton
          href="/tujuan-pembelajaran"
          color="blue"
          compact
          className="w-full"
          onClick={unlockAudio}
        >
          Tujuan
          <br />
          Pembelajaran
        </StartButton>
        <StartButton href="/petunjuk" color="orange" className="w-full" onClick={unlockAudio}>
          Petunjuk
        </StartButton>
      </div>
    </main>
  );
}
