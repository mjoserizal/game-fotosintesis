import type { Level, LevelId } from "@/types/game";

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Proses Fotosintesis",
    subtitle: "Pelajari cara tumbuhan membuat makanannya sendiri",
    location: "Daun dan kloroplas",
    accent: "leaf",
    backgroundKey: "bgFotosintesis",
    intro: [
      {
        speaker: "Pemandu",
        text: "Tumbuhan dapat membuat makanannya sendiri melalui proses fotosintesis.",
        assetKey: "maskot",
      },
      {
        speaker: "Pemandu",
        text: "Dengan bantuan cahaya matahari dan klorofil, air serta karbon dioksida diolah menjadi gula dan oksigen.",
        assetKey: "maskot",
      },
      {
        speaker: "Pemandu",
        text: "Pelajari bahan dan hasilnya, lalu jawab delapan soal tentang fotosintesis.",
        assetKey: "maskot",
      },
    ],
    materials: [
      {
        id: "photosynthesis-light",
        title: "Cahaya matahari",
        body: "Cahaya menyediakan energi yang diperlukan tumbuhan untuk menjalankan fotosintesis.",
        assetKey: "sun",
      },
      {
        id: "photosynthesis-water",
        title: "Air",
        body: "Akar menyerap air dari tanah dan xilem mengangkutnya menuju daun.",
        assetKey: "water",
      },
      {
        id: "photosynthesis-carbon-dioxide",
        title: "Karbon dioksida",
        body: "Karbon dioksida dari udara masuk ke daun melalui stomata.",
        assetKey: "co2",
      },
      {
        id: "photosynthesis-chlorophyll",
        title: "Klorofil dan kloroplas",
        body: "Klorofil menangkap energi cahaya di dalam kloroplas. Energi itu membantu mengubah air dan karbon dioksida menjadi glukosa dan oksigen.",
        assetKey: "chlorophyll",
        fact: "Oksigen yang dihasilkan dapat dilepaskan ke udara melalui stomata.",
      },
    ],
    objective: "Kenali bahan, tempat, dan hasil utama proses fotosintesis.",
    challenge: {
      kind: "mixed",
      prompt: "Materi siap! Kerjakan kuis delapan soal untuk menguji pemahamanmu tentang fotosintesis.",
    },
    hints: [
      "Fotosintesis memakai air, karbon dioksida, dan energi cahaya.",
      "Klorofil menangkap cahaya di dalam kloroplas.",
      "Glukosa dan oksigen merupakan hasil fotosintesis.",
    ],
    badge: {
      id: "ahli-fotosintesis",
      name: "Ahli Fotosintesis",
      description: "Menuntaskan kuis tentang proses fotosintesis.",
    },
    starThresholds: [55, 75, 90],
  },
];

export const LEVEL_IDS: LevelId[] = LEVELS.map((level) => level.id);

export const FUN_FACTS = [
  "Fotosintesis mengubah energi cahaya menjadi energi kimia yang tersimpan dalam glukosa.",
  "Klorofil memberi banyak daun warna hijau dan membantu menyerap cahaya.",
  "Air yang dipakai dalam fotosintesis diangkut dari akar menuju daun melalui xilem.",
  "Karbon dioksida masuk dan oksigen keluar melalui stomata.",
];

export function getLevel(id: LevelId): Level | undefined {
  return LEVELS.find((level) => level.id === id);
}

export function getNextLevelId(id: LevelId): LevelId | null {
  const index = LEVEL_IDS.indexOf(id);
  return index >= 0 ? LEVEL_IDS[index + 1] ?? null : null;
}
