import type { GlossaryTerm, LevelId } from "@/types/game";

export const GLOSSARY: GlossaryTerm[] = [
  { id: "fotosintesis", term: "Fotosintesis", definition: "Proses pembuatan senyawa organik dari CO2 dan air dengan bantuan energi cahaya.", levelId: 1, assetKey: "matahari" },
  { id: "epidermis", term: "Epidermis", definition: "Lapisan sel terluar daun yang melindungi jaringan dalam.", levelId: 1, assetKey: "epidermis" },
  { id: "stomata", term: "Stomata", definition: "Celah pada epidermis untuk pertukaran gas, diatur oleh sel penjaga.", levelId: 1, assetKey: "stomata" },
  { id: "sel-penjaga", term: "Sel penjaga", definition: "Dua sel berbentuk buncis yang mengatur buka-tutup stomata.", levelId: 1, assetKey: "selPenjaga" },
  { id: "mesofil", term: "Mesofil", definition: "Jaringan dalam daun yang kaya kloroplas dan menjadi tempat utama fotosintesis.", levelId: 1, assetKey: "mesofil" },
  { id: "xilem", term: "Xilem", definition: "Jaringan pengangkut air dan mineral dari akar ke daun.", levelId: 1, assetKey: "xilem" },
  { id: "floem", term: "Floem", definition: "Jaringan pengangkut hasil fotosintesis seperti gula dari daun ke bagian lain.", levelId: 1, assetKey: "floem" },
  { id: "kloroplas", term: "Kloroplas", definition: "Organel sel tumbuhan tempat berlangsungnya fotosintesis.", levelId: 2, assetKey: "bgKloroplas" },
  { id: "tilakoid", term: "Tilakoid", definition: "Kantung bermembran di kloroplas yang mengandung klorofil.", levelId: 2, assetKey: "tilakoid" },
  { id: "grana", term: "Grana", definition: "Tumpukan tilakoid yang memperluas permukaan penangkap cahaya.", levelId: 2, assetKey: "grana" },
  { id: "stroma", term: "Stroma", definition: "Cairan kloroplas di luar tilakoid tempat Siklus Calvin berlangsung.", levelId: 2, assetKey: "bgStroma" },
  { id: "membran", term: "Membran kloroplas", definition: "Pembungkus kloroplas yang terdiri dari dua lapis membran.", levelId: 2, assetKey: "membran" },
  { id: "klorofil", term: "Klorofil", definition: "Pigmen hijau yang menyerap cahaya merah dan biru serta memantulkan hijau.", levelId: 3, assetKey: "klorofil" },
  { id: "fotolisis", term: "Fotolisis air", definition: "Pemecahan air dengan energi cahaya yang menghasilkan O2, elektron, dan proton.", levelId: 3, assetKey: "h2o" },
  { id: "atp", term: "ATP", definition: "Molekul pembawa energi kimia yang dipakai sel untuk berbagai proses.", levelId: 3, assetKey: "atp" },
  { id: "nadph", term: "NADPH", definition: "Pembawa elektron berenergi tinggi yang dipakai pada reaksi reduksi.", levelId: 3, assetKey: "nadph" },
  { id: "reaksi-terang", term: "Reaksi terang", definition: "Tahap fotosintesis di membran tilakoid yang menghasilkan ATP, NADPH, dan O2.", levelId: 3, assetKey: "bgKloroplas" },
  { id: "calvin", term: "Siklus Calvin", definition: "Jalur pengikatan CO2 di stroma yang menghasilkan senyawa untuk membentuk glukosa.", levelId: 4, assetKey: "bgStroma" },
  { id: "rubisco", term: "RuBisCO", definition: "Enzim yang mengkatalisis fiksasi CO2 ke RuBP.", levelId: 4, assetKey: "co2" },
  { id: "rubp", term: "RuBP", definition: "Molekul penerima CO2 pada awal Siklus Calvin.", levelId: 4, assetKey: "co2" },
  { id: "g3p", term: "G3P", definition: "Senyawa tiga karbon hasil reduksi yang sebagian bisa membentuk glukosa.", levelId: 4, assetKey: "glukosa" },
  { id: "faktor-pembatas", term: "Faktor pembatas", definition: "Faktor yang paling kurang tersedia sehingga membatasi laju proses.", levelId: 5, assetKey: "ikonCahaya" },
  { id: "titik-jenuh", term: "Titik jenuh cahaya", definition: "Titik ketika tambahan cahaya tidak lagi menaikkan laju fotosintesis secara berarti.", levelId: 5, assetKey: "matahari" },
  { id: "glukosa", term: "Glukosa", definition: "Gula sederhana (C6H12O6) hasil fotosintesis yang dipakai sebagai sumber energi.", levelId: 6, assetKey: "glukosa" },
  { id: "siklus-karbon", term: "Siklus karbon", definition: "Perputaran karbon antara atmosfer, makhluk hidup, tanah, dan laut.", levelId: 6, assetKey: "bgLadang" },
];

export function getTermsForLevel(levelId: LevelId): GlossaryTerm[] {
  return GLOSSARY.filter((term) => term.levelId === levelId);
}
