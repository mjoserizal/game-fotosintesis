import type {
  LevelId,
  QuizIndicatorId,
  QuizQuestion,
} from "@/types/game";

export const PHOTOSYNTHESIS_INDICATORS: {
  id: QuizIndicatorId;
  title: string;
}[] = [
  { id: "concept", title: "Konsep dan persamaan" },
  { id: "materials", title: "Bahan dan tempat" },
  { id: "energy", title: "Cahaya dan klorofil" },
  { id: "products", title: "Hasil fotosintesis" },
];

function multiple(
  number: number,
  indicatorId: QuizIndicatorId,
  prompt: string,
  choices: string[],
  answerIndex: number,
  explanation: string,
): QuizQuestion {
  const options = choices.map((text, index) => ({
    id: `pilihan-${index}`,
    text,
  }));
  return {
    id: `fotosintesis-${number}`,
    levelId: 1,
    indicatorId,
    type: "multiple",
    prompt,
    options,
    answerIds: [`pilihan-${answerIndex}`],
    explanation,
  };
}

function booleanQuestion(
  number: number,
  indicatorId: QuizIndicatorId,
  prompt: string,
  answer: boolean,
  explanation: string,
): QuizQuestion {
  return {
    id: `fotosintesis-${number}`,
    levelId: 1,
    indicatorId,
    type: "boolean",
    prompt,
    options: [
      { id: "benar", text: "Benar" },
      { id: "salah", text: "Salah" },
    ],
    answerIds: [answer ? "benar" : "salah"],
    explanation,
  };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  multiple(
    1,
    "concept",
    "Apa yang dimaksud dengan fotosintesis?",
    [
      "Proses tumbuhan membuat makanan dengan bantuan cahaya",
      "Proses akar menyerap mineral saja",
      "Proses tumbuhan mengambil oksigen untuk bernapas",
      "Proses air berubah menjadi tanah",
    ],
    0,
    "Fotosintesis adalah proses tumbuhan menggunakan energi cahaya untuk membuat makanan.",
  ),
  multiple(
    2,
    "materials",
    "Bahan yang digunakan tumbuhan dalam fotosintesis adalah...",
    [
      "Oksigen dan glukosa",
      "Air dan karbon dioksida",
      "Nitrogen dan oksigen",
      "Glukosa dan mineral",
    ],
    1,
    "Air dan karbon dioksida menjadi bahan baku fotosintesis.",
  ),
  multiple(
    3,
    "energy",
    "Dari mana tumbuhan memperoleh energi untuk fotosintesis?",
    ["Tanah", "Angin", "Cahaya matahari", "Oksigen"],
    2,
    "Energi cahaya matahari menggerakkan proses fotosintesis.",
  ),
  multiple(
    4,
    "energy",
    "Apa peran klorofil dalam fotosintesis?",
    [
      "Menyerap energi cahaya",
      "Mengangkut gula ke akar",
      "Menyerap air dari tanah",
      "Melepaskan karbon dioksida",
    ],
    0,
    "Klorofil menangkap energi cahaya yang diperlukan tumbuhan.",
  ),
  multiple(
    5,
    "materials",
    "Di bagian sel tumbuhan manakah fotosintesis terutama berlangsung?",
    ["Inti sel", "Kloroplas", "Dinding sel", "Vakuola"],
    1,
    "Kloroplas mengandung klorofil dan menjadi tempat utama fotosintesis.",
  ),
  booleanQuestion(
    6,
    "products",
    "Oksigen dapat dilepaskan sebagai hasil fotosintesis.",
    true,
    "Tumbuhan menghasilkan oksigen dan dapat melepaskannya ke udara melalui stomata.",
  ),
  multiple(
    7,
    "products",
    "Makanan yang dihasilkan tumbuhan melalui fotosintesis terutama berupa...",
    ["Glukosa", "Karbon dioksida", "Air", "Klorofil"],
    0,
    "Tumbuhan menghasilkan glukosa yang dapat digunakan atau disimpan sebagai sumber energi.",
  ),
  multiple(
    8,
    "concept",
    "Persamaan sederhana fotosintesis yang benar adalah...",
    [
      "Air + oksigen + cahaya → karbon dioksida",
      "Karbon dioksida + air + cahaya → glukosa + oksigen",
      "Glukosa + oksigen → air + cahaya",
      "Klorofil + glukosa → karbon dioksida + air",
    ],
    1,
    "Dengan energi cahaya, tumbuhan mengubah karbon dioksida dan air menjadi glukosa dan oksigen.",
  ),
];

export function getQuestionsForLevel(levelId: LevelId): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((question) => question.levelId === levelId);
}
