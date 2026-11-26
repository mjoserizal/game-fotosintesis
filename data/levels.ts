import type { Level, LevelId } from "@/types/game";

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Daun & Bahan Baku",
    subtitle: "Kumpulkan bahan baku sebelum masuk pabrik hijau",
    location: "Permukaan daun",
    accent: "leaf",
    backgroundKey: "bgDaun",
    intro: [
      {
        speaker: "Hijau",
        text: "Halo, calon ahli tumbuhan! Misi pertama: kumpulkan bahan baku fotosintesis di daun.",
        assetKey: "maskot",
      },
      {
        speaker: "Pemandu",
        text: "Ingat, daun punya 'pintu' gas bernama stomata dan 'pipa air' bernama xilem.",
        assetKey: "pemandu",
      },
      {
        speaker: "Hijau",
        text: "Seret CO2, air, dan cahaya ke jalur yang benar. Ayo mulai!",
        assetKey: "maskot",
      },
    ],
    materials: [
      {
        id: "l1-epidermis",
        title: "Epidermis",
        body: "Lapisan sel tipis di permukaan daun. Epidermis melindungi jaringan dalam dan membantu mengurangi penguapan air.",
        assetKey: "epidermis",
      },
      {
        id: "l1-stomata",
        title: "Stomata",
        body: "Celah mikroskopis di epidermis yang jadi jalur pertukaran gas. Sel penjaga mengatur buka-tutupnya.",
        assetKey: "stomata",
        fact: "CO2 masuk dan O2 keluar lewat stomata yang terbuka.",
      },
      {
        id: "l1-mesofil",
        title: "Mesofil",
        body: "Jaringan di dalam daun yang selnya banyak mengandung kloroplas. Di sinilah sebagian besar fotosintesis terjadi.",
        assetKey: "mesofil",
      },
      {
        id: "l1-xilem",
        title: "Xilem",
        body: "Jaringan pengangkut yang membawa air dan mineral dari akar ke daun, terutama ke atas.",
        assetKey: "xilem",
      },
      {
        id: "l1-floem",
        title: "Floem",
        body: "Jaringan pengangkut yang membawa hasil fotosintesis, seperti gula, dari daun ke bagian tumbuhan lain.",
        assetKey: "floem",
      },
    ],
    objective: "Letakkan CO2 lewat stomata, air lewat xilem, dan cahaya ke klorofil di mesofil.",
    challenge: {
      kind: "drag",
      prompt: "Seret atau pilih tiap bahan baku, lalu lepas ke jalur tujuannya.",
      options: [
        { id: "co2", label: "CO2 dari udara", assetKey: "co2" },
        { id: "air", label: "H2O dari akar", assetKey: "h2o" },
        { id: "cahaya", label: "Cahaya matahari", assetKey: "matahari" },
      ],
      targets: [
        {
          id: "stomata",
          label: "Stomata",
          description: "Pintu masuk gas di epidermis daun",
          accepts: ["co2"],
          assetKey: "stomata",
        },
        {
          id: "xilem",
          label: "Xilem",
          description: "Pipa pembawa air dari akar",
          accepts: ["air"],
          assetKey: "xilem",
        },
        {
          id: "klorofil",
          label: "Klorofil di mesofil",
          description: "Pigmen yang menangkap energi cahaya",
          accepts: ["cahaya"],
          assetKey: "klorofil",
        },
      ],
    },
    hints: [
      "Gas masuk lewat lubang kecil di daun, bukan lewat akar.",
      "Air naik dari akar memakai jaringan xilem.",
      "Cahaya ditangkap pigmen hijau bernama klorofil.",
    ],
    badge: {
      id: "penjelajah-daun",
      name: "Penjelajah Daun",
      description: "Berhasil mengenali jalur masuk bahan baku fotosintesis.",
      assetKey: "badge",
    },
    starThresholds: [55, 75, 90],
    timeLimitSeconds: 120,
  },
  {
    id: 2,
    title: "Kloroplas",
    subtitle: "Kenali ruang kerja pabrik hijau",
    location: "Di dalam sel mesofil",
    accent: "leaf",
    backgroundKey: "bgKloroplas",
    intro: [
      {
        speaker: "Hijau",
        text: "Selamat datang di kloroplas! Organel ini seperti pabrik kecil dengan beberapa bagian penting.",
        assetKey: "maskot",
      },
      {
        speaker: "Pemandu",
        text: "Perhatikan fungsinya, lalu pasangkan nama bagian ke tempat yang tepat.",
        assetKey: "pemandu",
      },
    ],
    materials: [
      {
        id: "l2-membran",
        title: "Membran ganda",
        body: "Kloroplas dibungkus dua membran. Membran dalam membentuk sistem tilakoid.",
        assetKey: "membran",
      },
      {
        id: "l2-tilakoid",
        title: "Tilakoid",
        body: "Kantung pipih bermembran; permukaannya mengandung klorofil dan jalur transpor elektron.",
        assetKey: "tilakoid",
        fact: "Reaksi terang terjadi pada membran tilakoid.",
      },
      {
        id: "l2-grana",
        title: "Grana",
        body: "Tumpukan tilakoid yang saling berhubungan. Tumpukan ini memperluas permukaan penangkap cahaya.",
        assetKey: "grana",
      },
      {
        id: "l2-stroma",
        title: "Stroma",
        body: "Cairan di sekitar tilakoid. Di sini berlangsung siklus Calvin yang mengikat CO2.",
        assetKey: "bgStroma",
      },
    ],
    objective: "Pasangkan membran, tilakoid, grana, dan stroma dengan fungsinya.",
    challenge: {
      kind: "label",
      prompt: "Pasangkan nama bagian kloroplas ke petunjuk fungsinya.",
      choices: [
        { id: "membran", text: "Membran ganda", assetKey: "membran" },
        { id: "tilakoid", text: "Tilakoid", assetKey: "tilakoid" },
        { id: "grana", text: "Grana", assetKey: "grana" },
        { id: "stroma", text: "Stroma" },
      ],
      slots: [
        {
          id: "slot-membran",
          prompt: "Pembungkus kloroplas dengan dua lapis membran",
          correctChoiceId: "membran",
          assetKey: "membran",
        },
        {
          id: "slot-tilakoid",
          prompt: "Kantung pipih tempat reaksi terang berlangsung",
          correctChoiceId: "tilakoid",
          assetKey: "tilakoid",
        },
        {
          id: "slot-grana",
          prompt: "Tumpukan tilakoid yang memperluas permukaan",
          correctChoiceId: "grana",
          assetKey: "grana",
        },
        {
          id: "slot-stroma",
          prompt: "Cairan tempat siklus Calvin mengikat CO2",
          correctChoiceId: "stroma",
          assetKey: "bgStroma",
        },
      ],
    },
    hints: [
      "Bagian yang berupa tumpukan disebut grana.",
      "Reaksi terang menempel pada membran tilakoid.",
      "Siklus Calvin berada di cairan, bukan di kantung.",
    ],
    badge: {
      id: "ahli-kloroplas",
      name: "Ahli Kloroplas",
      description: "Mampu memetakan struktur kloroplas dan fungsinya.",
      assetKey: "badge",
    },
    starThresholds: [55, 75, 90],
    timeLimitSeconds: 150,
  },
  {
    id: 3,
    title: "Reaksi Terang",
    subtitle: "Ubah cahaya jadi energi kimia",
    location: "Membran tilakoid",
    accent: "sun",
    backgroundKey: "bgKloroplas",
    intro: [
      {
        speaker: "Hijau",
        text: "Sekarang kita di tilakoid. Cahaya harus diubah dulu sebelum bisa dipakai membuat gula.",
        assetKey: "maskot",
      },
      {
        speaker: "Pemandu",
        text: "Air dipecah, oksigen dilepas, dan energi disimpan sementara dalam ATP serta NADPH.",
        assetKey: "pemandu",
      },
    ],
    materials: [
      {
        id: "l3-klorofil",
        title: "Penyerapan cahaya",
        body: "Klorofil paling banyak menyerap cahaya merah dan biru, serta memantulkan hijau. Itu sebabnya daun tampak hijau.",
        assetKey: "klorofil",
        fact: "Cahaya hijau sebagian besar dipantulkan, bukan diserap.",
      },
      {
        id: "l3-fotolisis",
        title: "Fotolisis air",
        body: "Air dipecah memakai energi cahaya. Oksigen (O2) yang dilepas berasal dari air, bukan dari CO2.",
        assetKey: "h2o",
      },
      {
        id: "l3-atp",
        title: "ATP",
        body: "ATP menyimpan energi dalam ikatan fosfat dan dipakai sebagai 'uang energi' sel.",
        assetKey: "atp",
      },
      {
        id: "l3-nadph",
        title: "NADPH",
        body: "NADPH membawa elektron berenergi tinggi untuk mereduksi senyawa pada siklus Calvin.",
        assetKey: "nadph",
      },
    ],
    objective: "Arahkan cahaya dan air ke jalur reaksi terang, lalu keluarkan O2, ATP, dan NADPH.",
    challenge: {
      kind: "flow",
      prompt: "Seret molekul ke jalur yang benar pada diagram reaksi terang.",
      options: [
        { id: "cahaya", label: "Cahaya", assetKey: "matahari" },
        { id: "air", label: "H2O", assetKey: "h2o" },
        { id: "o2", label: "O2", assetKey: "o2" },
        { id: "atp", label: "ATP", assetKey: "atp" },
        { id: "nadph", label: "NADPH", assetKey: "nadph" },
      ],
      targets: [
        {
          id: "klorofil",
          label: "Klorofil menangkap cahaya",
          description: "Energi cahaya masuk ke sistem",
          accepts: ["cahaya"],
          assetKey: "klorofil",
        },
        {
          id: "fotolisis",
          label: "Fotolisis air",
          description: "Air dipecah di tilakoid",
          accepts: ["air"],
          assetKey: "h2o",
        },
        {
          id: "keluaran",
          label: "Hasil reaksi terang",
          description: "O2 dilepas; ATP dan NADPH dikirim ke stroma",
          accepts: ["o2", "atp", "nadph"],
          assetKey: "atp",
        },
      ],
    },
    hints: [
      "Cahaya ditangkap lebih dulu oleh klorofil.",
      "Oksigen berasal dari pemecahan air.",
      "ATP dan NADPH lalu dipakai di stroma, bukan di sini.",
    ],
    badge: {
      id: "pembangkit-energi",
      name: "Pembangkit Energi",
      description: "Berhasil melacak alur energi pada reaksi terang.",
      assetKey: "badge",
    },
    starThresholds: [55, 75, 90],
    timeLimitSeconds: 180,
  },
  {
    id: 4,
    title: "Reaksi Gelap",
    subtitle: "Rakit glukosa di Siklus Calvin",
    location: "Stroma kloroplas",
    accent: "violet",
    backgroundKey: "bgStroma",
    intro: [
      {
        speaker: "Hijau",
        text: "Ini stroma. Reaksi gelap tidak berarti terjadi saat malam, lho.",
        assetKey: "maskot",
      },
      {
        speaker: "Pemandu",
        text: "Siklus Calvin tidak memakai cahaya langsung, tetapi memakai ATP dan NADPH dari reaksi terang.",
        assetKey: "pemandu",
      },
    ],
    materials: [
      {
        id: "l4-calvin",
        title: "Siklus Calvin",
        body: "Jalur pengikatan CO2 di stroma. Hasil awalnya senyawa tiga karbon, yang kemudian bisa membentuk glukosa.",
        assetKey: "bgStroma",
      },
      {
        id: "l4-fixasi",
        title: "Fiksasi karbon",
        body: "Enzim RuBisCO membantu mengikat CO2 ke RuBP. Ini langkah awal masuknya karbon ke dalam senyawa organik.",
        assetKey: "co2",
      },
      {
        id: "l4-reduksi",
        title: "Reduksi",
        body: "ATP dan NADPH dipakai untuk mengubah senyawa hasil fiksasi menjadi G3P yang kaya energi.",
        assetKey: "nadph",
      },
      {
        id: "l4-regenerasi",
        title: "Regenerasi RuBP",
        body: "Sebagian G3P dipakai lagi untuk membentuk RuBP agar siklus bisa berlanjut; sebagian lain membentuk gula.",
        assetKey: "atp",
        fact: "Siklus Calvin tetap bergantung pada cahaya lewat suplai ATP dan NADPH.",
      },
    ],
    objective: "Urutkan tahapan Siklus Calvin dengan benar, dari fiksasi sampai terbentuknya glukosa.",
    challenge: {
      kind: "sequence",
      prompt: "Susun urutan tahapan. Gunakan tombol panah bila tidak bisa menggeser.",
      items: [
        {
          id: "fiksasi",
          text: "Fiksasi CO2 oleh RuBisCO",
          detail: "CO2 bergabung dengan RuBP membentuk senyawa 3 karbon.",
          assetKey: "co2",
        },
        {
          id: "pga",
          text: "Terbentuk 3-PGA",
          detail: "Senyawa awal hasil pengikatan karbon.",
          assetKey: "co2",
        },
        {
          id: "reduksi",
          text: "Reduksi memakai ATP dan NADPH",
          detail: "3-PGA diubah menjadi G3P yang kaya energi.",
          assetKey: "nadph",
        },
        {
          id: "glukosa",
          text: "Sebagian G3P membentuk glukosa",
          detail: "Gula ini bisa dipakai tumbuhan untuk energi atau cadangan.",
          assetKey: "glukosa",
        },
        {
          id: "regenerasi",
          text: "Regenerasi RuBP memakai ATP",
          detail: "Sisa G3P dibentuk kembali jadi RuBP agar siklus berulang.",
          assetKey: "atp",
        },
      ],
    },
    hints: [
      "Fiksasi karbon terjadi sebelum reduksi.",
      "ATP dan NADPH dipakai pada tahap reduksi.",
      "Regenerasi RuBP menutup siklus supaya bisa berulang.",
    ],
    badge: {
      id: "perakit-gula",
      name: "Perakit Gula",
      description: "Paham urutan Siklus Calvin di stroma.",
      assetKey: "badge",
    },
    starThresholds: [55, 75, 90],
    timeLimitSeconds: 180,
  },
  {
    id: 5,
    title: "Faktor Fotosintesis",
    subtitle: "Atur kondisi agar laju mencapai maksimum",
    location: "Kebun percobaan",
    accent: "sky",
    backgroundKey: "bgLadang",
    intro: [
      {
        speaker: "Pemandu",
        text: "Di kebun ini, laju fotosintesis dipengaruhi beberapa faktor sekaligus.",
        assetKey: "pemandu",
      },
      {
        speaker: "Hijau",
        text: "Coba atur cahaya, CO2, suhu, dan air. Faktor yang paling rendah bisa jadi pembatas.",
        assetKey: "maskot",
      },
    ],
    materials: [
      {
        id: "l5-cahaya",
        title: "Intensitas cahaya",
        body: "Makin banyak cahaya, laju biasanya naik sampai titik jenuh; setelah itu tambahan cahaya tidak banyak menambah laju.",
        assetKey: "matahari",
      },
      {
        id: "l5-co2",
        title: "Konsentrasi CO2",
        body: "CO2 adalah bahan baku. Kenaikan CO2 bisa menaikkan laju sampai faktor lain menjadi pembatas.",
        assetKey: "co2",
      },
      {
        id: "l5-suhu",
        title: "Suhu",
        body: "Enzim fotosintesis punya suhu optimum. Suhu terlalu rendah memperlambat reaksi; terlalu tinggi bisa merusak enzim.",
        assetKey: "ikonSuhu",
      },
      {
        id: "l5-air",
        title: "Air",
        body: "Air adalah bahan baku sekaligus penjaga tekanan turgor sel. Kekurangan air membuat stomata menutup dan laju turun.",
        assetKey: "h2o",
      },
      {
        id: "l5-klorofil",
        title: "Kadar klorofil",
        body: "Daun muda atau daun kekurangan nutrisi bisa punya klorofil lebih sedikit sehingga menyerap lebih sedikit cahaya.",
        assetKey: "klorofil",
        fact: "Grafik di simulasi ini disederhanakan untuk belajar, bukan data percobaan.",
      },
    ],
    objective: "Capai laju fotosintesis minimal 90% dengan mengatur empat faktor.",
    challenge: {
      kind: "simulator",
      prompt: "Geser slider, amati grafik dan gelembung O2, lalu penuhi misi.",
      mission: {
        label: "Capai laju fotosintesis minimal 90%",
        targetRate: 90,
        suggested: { light: 85, co2: 750, temperature: 28, water: 85 },
        tolerance: 5,
      },
    },
    hints: [
      "Naikkan semua faktor, bukan hanya cahaya.",
      "Suhu optimum untuk banyak tanaman berkisar 25-30 °C.",
      "Kalau air rendah, stomata menutup dan CO2 sulit masuk.",
    ],
    badge: {
      id: "peneliti-laju",
      name: "Peneliti Laju",
      description: "Berhasil mengoptimalkan faktor-faktor fotosintesis.",
      assetKey: "badge",
    },
    starThresholds: [55, 75, 90],
    timeLimitSeconds: 180,
  },
  {
    id: 6,
    title: "Kuis Akhir",
    subtitle: "Uji semua yang sudah kamu pelajari",
    location: "Menara Pengetahuan",
    accent: "rose",
    backgroundKey: "bgLadang",
    intro: [
      {
        speaker: "Hijau",
        text: "Ini misi terakhir! Ada pilihan ganda, benar/salah, dan menyusun persamaan.",
        assetKey: "maskot",
      },
      {
        speaker: "Pemandu",
        text: "Baca penjelasan setiap jawaban. Salah jawaban boleh, asal tetap semangat.",
        assetKey: "pemandu",
      },
    ],
    materials: [
      {
        id: "l6-persamaan",
        title: "Persamaan umum",
        body: "6CO2 + 6H2O + energi cahaya menghasilkan C6H12O6 + 6O2. Persamaan ini ringkasan keseluruhan proses.",
        assetKey: "glukosa",
        fact: "O2 berasal dari air, sedangkan O dalam glukosa terutama dari CO2.",
      },
      {
        id: "l6-peran",
        title: "Peran fotosintesis",
        body: "Fotosintesis menghasilkan oksigen, menjadi dasar rantai makanan, dan mengambil CO2 dari atmosfer dalam siklus karbon.",
        assetKey: "bgLadang",
      },
      {
        id: "l6-ringkasan",
        title: "Dua tahap besar",
        body: "Reaksi terang di tilakoid menghasilkan ATP, NADPH, dan O2. Siklus Calvin di stroma memakai ATP serta NADPH untuk mengikat CO2.",
        assetKey: "bgKloroplas",
      },
    ],
    objective: "Jawab delapan soal akhir dengan benar untuk menyelesaikan petualangan.",
    challenge: {
      kind: "mixed",
      prompt: "Selesaikan misi mini dan delapan soal untuk membuktikan penguasaanmu.",
    },
    hints: [
      "Ingat: reaksi terang menghasilkan O2, ATP, dan NADPH.",
      "Siklus Calvin berlangsung di stroma.",
      "Urutan persamaan: CO2 + H2O + cahaya menghasilkan glukosa + O2.",
    ],
    badge: {
      id: "juara-fotosintesis",
      name: "Juara Fotosintesis",
      description: "Menyelesaikan seluruh petualangan dan kuis akhir.",
      assetKey: "badge",
    },
    starThresholds: [55, 75, 90],
    timeLimitSeconds: 240,
  },
];

export const LEVEL_IDS: LevelId[] = LEVELS.map((level) => level.id);

export const FUN_FACTS: string[] = [
  "Oksigen yang kamu hirup sebagian besar berasal dari fotolisis air di tilakoid daun.",
  "Daun tampak hijau karena klorofil memantulkan cahaya hijau, bukan menyerapnya.",
  "Satu molekul glukosa membutuhkan enam molekul CO2 dan enam molekul air secara ringkas.",
  "Fotosintesis membantu menurunkan CO2 atmosfer sekaligus menjadi awal rantai makanan.",
];

export function getLevel(id: LevelId): Level | undefined {
  return LEVELS.find((level) => level.id === id);
}

export function getNextLevelId(id: LevelId): LevelId | null {
  const index = LEVEL_IDS.indexOf(id);
  return LEVEL_IDS[index + 1] ?? null;
}
