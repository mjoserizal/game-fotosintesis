export const ASSET_ROOT = "/assets";

export const ASSETS = {
  bgFotosintesis: `${ASSET_ROOT}/backgrounds/bg-fotosintesis.png`,
  instructionBoard: `${ASSET_ROOT}/elements/papan.png`,
  prosesBanner: `${ASSET_ROOT}/elements/proses-fotosintesis-banner.png`,
  instructionMascot: `${ASSET_ROOT}/elements/daun-animasi.png`,
  instructionLeaf: `${ASSET_ROOT}/elements/daun.png`,
  maskot: `${ASSET_ROOT}/elements/daun-animasi.png`,
  pemandu: `${ASSET_ROOT}/elements/daun-animasi.png`,
  plantLeaf: `${ASSET_ROOT}/elements/daun.png`,
  water: `${ASSET_ROOT}/elements/air.png`,
  earth: `${ASSET_ROOT}/elements/bumi.png`,
  sun: `${ASSET_ROOT}/elements/matahari.png`,
  co2: `${ASSET_ROOT}/elements/co2.png`,
  chlorophyll: `${ASSET_ROOT}/elements/klorofil.png`,
  wiltedLeaf: `${ASSET_ROOT}/elements/daun-layu.png`,
  rain: `${ASSET_ROOT}/elements/hujan.png`,
  animalBear: `${ASSET_ROOT}/ecosystem/animals/bear.png`,
  animalBuffalo: `${ASSET_ROOT}/ecosystem/animals/buffalo.png`,
  animalCrocodile: `${ASSET_ROOT}/ecosystem/animals/crocodile.png`,
  animalFrog: `${ASSET_ROOT}/ecosystem/animals/frog.png`,
  animalGiraffe: `${ASSET_ROOT}/ecosystem/animals/giraffe.png`,
  animalMoose: `${ASSET_ROOT}/ecosystem/animals/moose.png`,
  animalOwl: `${ASSET_ROOT}/ecosystem/animals/owl.png`,
  animalParrot: `${ASSET_ROOT}/ecosystem/animals/parrot.png`,
  animalPenguin: `${ASSET_ROOT}/ecosystem/animals/penguin.png`,
  animalRabbit: `${ASSET_ROOT}/ecosystem/animals/rabbit.png`,
  animalSnake: `${ASSET_ROOT}/ecosystem/animals/snake.png`,
  animalWhale: `${ASSET_ROOT}/ecosystem/animals/whale.png`,
  animalZebra: `${ASSET_ROOT}/ecosystem/animals/zebra.png`,
  fishBlue: `${ASSET_ROOT}/ecosystem/marine/fish_blue.png`,
  fishGreen: `${ASSET_ROOT}/ecosystem/marine/fish_green.png`,
  fishOrange: `${ASSET_ROOT}/ecosystem/marine/fish_orange.png`,
  fishRed: `${ASSET_ROOT}/ecosystem/marine/fish_red.png`,
  bgm: `${ASSET_ROOT}/audio/fotosintesis.mp3`,
} as const;

export type AssetKey = keyof typeof ASSETS;
export type SfxKey = "sfxKlik" | "sfxBenar" | "sfxSalah" | "sfxMenang";
export const SFX_ASSETS: Partial<Record<SfxKey, string>> = {};

const LABELS: Record<AssetKey, string> = {
  bgFotosintesis: "Latar fotosintesis",
  instructionBoard: "Papan petunjuk",
  prosesBanner: "Proses Fotosintesis",
  instructionMascot: "Maskot petunjuk",
  instructionLeaf: "Daun penanda",
  maskot: "Maskot",
  pemandu: "Pemandu",
  plantLeaf: "Tumbuhan",
  water: "Air",
  earth: "Tanah",
  sun: "Matahari",
  co2: "Karbon dioksida",
  chlorophyll: "Klorofil",
  wiltedLeaf: "Daun layu",
  rain: "Hujan",
  animalBear: "Beruang",
  animalBuffalo: "Kerbau",
  animalCrocodile: "Buaya",
  animalFrog: "Katak",
  animalGiraffe: "Jerapah",
  animalMoose: "Rusa besar",
  animalOwl: "Burung hantu",
  animalParrot: "Burung nuri",
  animalPenguin: "Penguin",
  animalRabbit: "Kelinci",
  animalSnake: "Ular",
  animalWhale: "Paus",
  animalZebra: "Zebra",
  fishBlue: "Ikan biru",
  fishGreen: "Ikan hijau",
  fishOrange: "Ikan jingga",
  fishRed: "Ikan merah",
  bgm: "Musik latar",
};

export type AssetManifestEntry = {
  key: AssetKey;
  file: string;
  suggestedSize: string;
  purpose: string;
};

export const ASSET_MANIFEST: AssetManifestEntry[] = [
  { key: "bgFotosintesis", file: "backgrounds/bg-fotosintesis.png", suggestedSize: "1974x1101", purpose: "Latar permainan fotosintesis" },
  { key: "prosesBanner", file: "elements/proses-fotosintesis-banner.png", suggestedSize: "802x336", purpose: "Banner halaman utama" },
  { key: "instructionBoard", file: "elements/papan.png", suggestedSize: "1576x1051", purpose: "Papan halaman petunjuk" },
  { key: "instructionMascot", file: "elements/daun-animasi.png", suggestedSize: "478x599", purpose: "Maskot petunjuk dan dialog" },
  { key: "instructionLeaf", file: "elements/daun.png", suggestedSize: "149x132", purpose: "Penanda nomor petunjuk" },
  { key: "plantLeaf", file: "elements/daun.png", suggestedSize: "149x132", purpose: "Ilustrasi produsen" },
  { key: "water", file: "elements/air.png", suggestedSize: "256x256", purpose: "Unsur abiotik: air" },
  { key: "earth", file: "elements/bumi.png", suggestedSize: "148x137", purpose: "Unsur abiotik: tanah" },
  { key: "sun", file: "elements/matahari.png", suggestedSize: "256x256", purpose: "Sumber energi matahari" },
  { key: "co2", file: "elements/co2.png", suggestedSize: "256x256", purpose: "Bahan baku karbon dioksida" },
  { key: "chlorophyll", file: "elements/klorofil.png", suggestedSize: "256x256", purpose: "Pigmen penangkap cahaya" },
  { key: "wiltedLeaf", file: "elements/daun-layu.png", suggestedSize: "478x599", purpose: "Ilustrasi daun layu pada cerita pembelajaran" },
  { key: "rain", file: "elements/hujan.png", suggestedSize: "256x256", purpose: "Ilustrasi hujan pada cerita pembelajaran" },
  { key: "animalBear", file: "ecosystem/animals/bear.png", suggestedSize: "128x129", purpose: "Beruang; Kenney Animal Pack Remastered, CC0" },
  { key: "animalBuffalo", file: "ecosystem/animals/buffalo.png", suggestedSize: "129x129", purpose: "Kerbau; Kenney Animal Pack Remastered, CC0" },
  { key: "animalCrocodile", file: "ecosystem/animals/crocodile.png", suggestedSize: "129x128", purpose: "Buaya; Kenney Animal Pack Remastered, CC0" },
  { key: "animalFrog", file: "ecosystem/animals/frog.png", suggestedSize: "128x129", purpose: "Katak; Kenney Animal Pack Remastered, CC0" },
  { key: "animalGiraffe", file: "ecosystem/animals/giraffe.png", suggestedSize: "128x129", purpose: "Jerapah; Kenney Animal Pack Remastered, CC0" },
  { key: "animalMoose", file: "ecosystem/animals/moose.png", suggestedSize: "129x128", purpose: "Rusa besar; Kenney Animal Pack Remastered, CC0" },
  { key: "animalOwl", file: "ecosystem/animals/owl.png", suggestedSize: "128x128", purpose: "Burung hantu; Kenney Animal Pack Remastered, CC0" },
  { key: "animalParrot", file: "ecosystem/animals/parrot.png", suggestedSize: "129x128", purpose: "Burung nuri; Kenney Animal Pack Remastered, CC0" },
  { key: "animalPenguin", file: "ecosystem/animals/penguin.png", suggestedSize: "129x128", purpose: "Penguin; Kenney Animal Pack Remastered, CC0" },
  { key: "animalRabbit", file: "ecosystem/animals/rabbit.png", suggestedSize: "129x128", purpose: "Kelinci; Kenney Animal Pack Remastered, CC0" },
  { key: "animalSnake", file: "ecosystem/animals/snake.png", suggestedSize: "128x128", purpose: "Ular; Kenney Animal Pack Remastered, CC0" },
  { key: "animalWhale", file: "ecosystem/animals/whale.png", suggestedSize: "132x131", purpose: "Paus; Kenney Animal Pack Remastered, CC0" },
  { key: "animalZebra", file: "ecosystem/animals/zebra.png", suggestedSize: "128x128", purpose: "Zebra; Kenney Animal Pack Remastered, CC0" },
  { key: "fishBlue", file: "ecosystem/marine/fish_blue.png", suggestedSize: "64x64", purpose: "Ikan; Kenney Fish Pack, CC0" },
  { key: "fishGreen", file: "ecosystem/marine/fish_green.png", suggestedSize: "64x64", purpose: "Ikan; Kenney Fish Pack, CC0" },
  { key: "fishOrange", file: "ecosystem/marine/fish_orange.png", suggestedSize: "64x64", purpose: "Ikan; Kenney Fish Pack, CC0" },
  { key: "fishRed", file: "ecosystem/marine/fish_red.png", suggestedSize: "64x64", purpose: "Ikan; Kenney Fish Pack, CC0" },
  { key: "bgm", file: "audio/fotosintesis.mp3", suggestedSize: "≤5 MB, loop", purpose: "Musik latar yang tersedia" },
];

export function assetPath(key: AssetKey): string {
  return ASSETS[key];
}

export function assetLabel(key: AssetKey): string {
  return LABELS[key];
}
