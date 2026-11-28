import type { GlossaryTerm, LevelId } from "@/types/game";

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "fotosintesis",
    term: "Fotosintesis",
    definition: "Proses tumbuhan menggunakan energi cahaya untuk membuat glukosa dari air dan karbon dioksida.",
    levelId: 1,
    assetKey: "plantLeaf",
  },
  {
    id: "klorofil",
    term: "Klorofil",
    definition: "Pigmen hijau yang menangkap energi cahaya untuk fotosintesis.",
    levelId: 1,
    assetKey: "chlorophyll",
  },
  {
    id: "kloroplas",
    term: "Kloroplas",
    definition: "Organel sel tumbuhan yang menjadi tempat utama fotosintesis.",
    levelId: 1,
    assetKey: "plantLeaf",
  },
  {
    id: "karbon-dioksida",
    term: "Karbon dioksida",
    definition: "Gas dari udara yang digunakan tumbuhan sebagai bahan baku fotosintesis.",
    levelId: 1,
    assetKey: "co2",
  },
  {
    id: "stomata",
    term: "Stomata",
    definition: "Celah kecil pada permukaan daun yang membantu pertukaran gas.",
    levelId: 1,
    assetKey: "plantLeaf",
  },
  {
    id: "xilem",
    term: "Xilem",
    definition: "Jaringan yang mengangkut air dari akar menuju daun.",
    levelId: 1,
  },
  {
    id: "glukosa",
    term: "Glukosa",
    definition: "Gula yang dihasilkan melalui fotosintesis dan digunakan atau disimpan oleh tumbuhan.",
    levelId: 1,
  },
  {
    id: "oksigen",
    term: "Oksigen",
    definition: "Gas yang dihasilkan dalam fotosintesis dan dapat dilepaskan ke udara.",
    levelId: 1,
  },
];

export function getTermsForLevel(levelId: LevelId): GlossaryTerm[] {
  return GLOSSARY.filter((term) => term.levelId === levelId);
}
