Kamu adalah senior frontend engineer. Buatkan game edukasi web interaktif
berjudul "Petualangan Fotosintesis" menggunakan Next.js (App Router,
TypeScript) dan Tailwind CSS. Target pengguna: siswa SMP/SMA.

## TECH STACK

- Next.js 14+ (App Router) + TypeScript (strict)
- Tailwind CSS (tanpa library UI lain)
- Framer Motion untuk animasi
- State management: Zustand (atau useReducer + Context)
- Progress disimpan di localStorage lewat hook `useLocalStorage`
  (aman untuk SSR dan tidak error saat hydration)
- Drag & drop: gunakan @dnd-kit/core (harus mendukung touch)
- Tanpa backend; semua data statis di file TypeScript

## ASSETS (disediakan oleh saya)

Semua asset ada di `/public/assets/`. JANGAN generate atau mengunduh asset
sendiri. Buat satu file `lib/assets.ts` sebagai satu-satunya tempat path
asset didefinisikan.

/public/assets/
├── backgrounds/ (menu, daun, kloroplas, stroma, ladang, dll)
├── characters/ (maskot, karakter pemandu)
├── elements/ (matahari, CO2, H2O, O2, glukosa, ATP, NADPH,
│ klorofil, stomata, akar, daun, dll)
├── ui/ (logo, tombol, ikon, bingkai, badge, hati)
└── audio/ (bgm, sfx klik, benar, salah, menang)

Jika ada file asset yang belum ada, tampilkan placeholder (kotak berwarna
berisi nama asset) dan beri komentar TODO. Aplikasi tidak boleh crash
karena asset hilang. Gunakan `next/image` dengan fallback.

## KONSEP GAME [SESUAIKAN]

Game berbasis level. Tiap level = 1 area di dalam tumbuhan dengan mini-game
berbeda. Alur per level:

1. Intro: maskot menjelaskan misi lewat dialog (efek mengetik).
2. Materi singkat: kartu informasi interaktif.
3. Mini-game / tantangan.
4. Hasil: skor, bintang (1-3), lencana, tombol lanjut / ulangi.

Level (terkunci berurutan):

1. Daun & Bahan Baku
   Mini-game: seret CO2 (lewat stomata), H2O (dari akar lewat xilem), dan
   cahaya matahari ke tempat yang benar. Pelajari bagian daun: epidermis,
   stomata, mesofil, xilem, floem.
2. Kloroplas
   Mini-game: labeli bagian kloroplas (membran, tilakoid, grana, stroma).
   Pasangkan organel dengan fungsinya.
3. Reaksi Terang (di tilakoid/grana)
   Mini-game: alur energi. Cahaya mengenai klorofil, air terpecah, hasilkan
   O2, ATP, dan NADPH. Pemain menyeret molekul ke jalur yang benar.
4. Reaksi Gelap / Siklus Calvin (di stroma)
   Mini-game: urutkan tahapan, CO2 + ATP + NADPH menghasilkan glukosa.
5. Faktor yang Mempengaruhi Fotosintesis
   Mini-game simulasi: slider intensitas cahaya, konsentrasi CO2, suhu, dan
   ketersediaan air. Tampilkan laju fotosintesis secara visual (grafik
   sederhana + jumlah gelembung O2). Pemain menyelesaikan misi, misalnya
   "capai laju maksimum".
6. Boss / Kuis Akhir
   Campuran soal pilihan ganda, benar/salah, dan menyusun persamaan.

Layar akhir: rekap skor total, lencana, dan fakta menarik.

## KONTEN SAINS (Bahasa Indonesia, akurat)

Data di `data/levels.ts` dan `data/quiz.ts`, dengan tipe TypeScript.

- Persamaan: 6CO2 + 6H2O + energi cahaya -> C6H12O6 + 6O2
- Klorofil menyerap cahaya merah dan biru, memantulkan hijau
- Reaksi terang: tilakoid; membutuhkan cahaya; menghasilkan ATP, NADPH, O2
  (O2 berasal dari fotolisis air)
- Reaksi gelap (siklus Calvin): stroma; tidak langsung butuh cahaya, tetapi
  memakai ATP dan NADPH dari reaksi terang; mengikat CO2 menjadi glukosa
- Stomata: pertukaran gas; sel penjaga mengatur buka-tutup
- Faktor: intensitas cahaya, kadar CO2, suhu, air, kadar klorofil
- Peran fotosintesis: sumber oksigen, dasar rantai makanan, siklus karbon
  Minimal 8 soal per level, tiap soal punya penjelasan jawaban. Jika ragu pada
  suatu fakta, tulis secara netral dan beri komentar TODO.

## HALAMAN / ROUTE

- `/` : menu utama (Mulai, Lanjutkan, Pilih Level,
  Pengaturan, Tentang)
- `/peta` : peta level berbentuk tumbuhan (node = level, status
  kunci, bintang)
- `/level/[id]` : state machine: intro -> materi -> tantangan -> hasil
- `/koleksi` : glosarium dan kartu istilah yang sudah dibuka
- `/selesai` : layar akhir

## FITUR

- Skor, nyawa (3 hati), bintang, lencana
- Timer opsional per tantangan
- Mute/unmute, volume BGM dan SFX (disimpan di localStorage)
- Audio baru mulai setelah interaksi pertama (kebijakan autoplay browser)
- Tombol reset progress dengan konfirmasi
- Umpan balik benar/salah (animasi + SFX + penjelasan singkat)
- Sistem petunjuk (hint) terbatas per level
- Aksesibel: navigasi keyboard, fokus terlihat, aria-label, alternatif
  klik untuk drag & drop
- Responsif: mobile-first (360px) sampai desktop

## DESAIN UI (Tailwind) [SESUAIKAN]

- Nuansa alam: hijau daun, kuning matahari, biru langit, cokelat tanah
  (definisikan sebagai warna custom di `tailwind.config.ts`)
- Font ramah (via `next/font`): heading rounded/playful, body mudah dibaca
- Kartu dengan sudut membulat, bayangan lembut, ikon dari assets/ui
- Animasi: matahari berputar pelan, gelembung O2 naik, daun bergoyang,
  transisi halus antar layar
- Setiap level punya warna aksen sendiri

## STRUKTUR PROYEK

app/
layout.tsx, page.tsx, peta/, koleksi/, selesai/, level/[id]/
components/
game/ (DialogBox, QuizCard, DragDropBoard, LabelGame, SequenceGame,
PhotosynthesisSimulator, ScoreBoard, HeartBar, ResultModal)
ui/ (Button, Modal, ProgressBar, Toast, AudioToggle)
hooks/ (useLocalStorage, useAudio, useGameStore)
lib/ (assets.ts, scoring.ts, utils.ts)
data/ (levels.ts, quiz.ts, glossary.ts)
types/ (game.ts)

## ATURAN KODE

- TypeScript strict, tanpa `any`
- Komponen kecil dan reusable; logika game dipisah dari UI
- `"use client"` hanya jika perlu
- Teks panjang diambil dari `data/`, bukan hard-coded di komponen
- `npm run build` dan `npm run lint` harus lolos tanpa error

## LANGKAH KERJA

1. Inisialisasi project, konfigurasi Tailwind dan font, buat struktur folder.
2. Buat tipe, data konten, dan `lib/assets.ts`.
3. Buat komponen UI dasar, lalu komponen game.
4. Rakit halaman dan state machine level.
5. Tambah audio, penyimpanan progress, dan aksesibilitas.
   6. Uji manual alur penuh dari menu sampai layar selesai.
      Kerjakan satu langkah per satu dan beri ringkasan setelah tiap langkah.
      Tulis README.md berisi cara menjalankan dan daftar asset yang dibutuhkan
      (nama file + ukuran yang disarankan).

## CARA MENJALANKAN

Prasyarat: Node.js 18.17+ dan npm.

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Perintah lain:

```bash
npm run build
npm run start
npm run lint
npm run typecheck
```

Catatan:
- Progres, bintang, lencana, dan pengaturan audio tersimpan di `localStorage`
  dengan kunci `petualangan-fotosintesis:v1`.
- Audio mulai setelah interaksi pertama sesuai kebijakan autoplay browser.
- Semua path asset hanya didefinisikan di `lib/assets.ts`. Jika nama file
  berbeda, ubah di file itu saja.
- File asset yang belum ada otomatis tampil sebagai placeholder bernama asset;
  aplikasi tetap bisa dijalankan.

## DAFTAR ASET YANG DIBUTUHKAN

Letakkan file di `public/assets/` mengikuti path berikut. Format webp
disarankan, tapi boleh png/jpg asal path di `lib/assets.ts` disesuaikan.

| Path relatif `public/assets/` | Ukuran disarankan | Fungsi |
| --- | --- | --- |
| `backgrounds/menu.webp` | 1600x900 | Latar menu utama |
| `backgrounds/bg-fotosintesis.png` | 1974x1101 | Latar halaman awal |
| `backgrounds/daun.webp` | 1600x900 | Latar level 1 |
| `backgrounds/kloroplas.webp` | 1600x900 | Latar level 2-3 |
| `backgrounds/stroma.webp` | 1600x900 | Latar level 4 |
| `backgrounds/ladang.webp` | 1600x900 | Latar level 5-6 dan akhir |
| `characters/maskot.webp` | 512x512 | Maskot dialog |
| `characters/pemandu.webp` | 512x512 | Karakter pendamping |
| `elements/proses-fotosintesis-banner.png` | 802x336 | Banner proses fotosintesis di halaman awal |
| `elements/papan.png` | 1576x1051 | Papan halaman petunjuk |
| `elements/daun-animasi.png` | 478x599 | Maskot halaman petunjuk |
| `elements/daun.png` | 149x132 | Penanda angka petunjuk |
| `elements/matahari.webp` | 256x256 | Sumber cahaya |
| `elements/co2.png` | 148x133 | Molekul CO2 |
| `elements/bumi.png` | 148x137 | Ilustrasi bumi tujuan pembelajaran |
| `elements/h2o.webp` | 256x256 | Molekul air |
| `elements/o2.webp` | 256x256 | Molekul oksigen |
| `elements/glukosa.webp` | 256x256 | Molekul glukosa |
| `elements/atp.webp` | 256x256 | Molekul ATP |
| `elements/nadph.webp` | 256x256 | Molekul NADPH |
| `elements/klorofil.webp` | 256x256 | Pigmen klorofil |
| `elements/stomata.webp` | 256x256 | Stomata daun |
| `elements/akar.webp` | 256x256 | Akar tumbuhan |
| `elements/daun.webp` | 256x256 | Daun |
| `elements/xilem.webp` | 256x256 | Jaringan xilem |
| `elements/floem.webp` | 256x256 | Jaringan floem |
| `elements/epidermis.webp` | 256x256 | Epidermis daun |
| `elements/mesofil.webp` | 256x256 | Mesofil daun |
| `elements/membran.webp` | 256x256 | Membran kloroplas |
| `elements/tilakoid.webp` | 256x256 | Tilakoid |
| `elements/grana.webp` | 256x256 | Grana |
| `elements/sel-penjaga.webp` | 256x256 | Sel penjaga stomata |
| `ui/logo.webp` | 512x256 | Logo game |
| `ui/tombol.webp` | 320x96 | Tekstur tombol (opsional) |
| `ui/bingkai.webp` | 800x600 | Bingkai kartu (opsional) |
| `ui/badge.webp` | 256x256 | Lencana pencapaian |
| `ui/hati.webp` | 128x128 | Nyawa |
| `ui/bintang.webp` | 128x128 | Bintang hasil |
| `ui/ikon-cahaya.webp` | 128x128 | Ikon intensitas cahaya |
| `ui/ikon-air.webp` | 128x128 | Ikon ketersediaan air |
| `ui/ikon-co2.webp` | 128x128 | Ikon konsentrasi CO2 |
| `ui/ikon-suhu.webp` | 128x128 | Ikon suhu |
| `audio/fotosintesis.mp3` | ≤5 MB, loop | Musik latar |
| `audio/klik.mp3` | ≤100 KB | Efek klik tombol |
| `audio/benar.mp3` | ≤200 KB | Efek jawaban benar |
| `audio/salah.mp3` | ≤200 KB | Efek jawaban salah |
| `audio/menang.mp3` | ≤500 KB | Efek menyelesaikan level |

## STATUS IMPLEMENTASI

- Enam level tersedia: daun, kloroplas, reaksi terang, Siklus Calvin,
  simulasi faktor, dan kuis akhir.
- Tiap level punya intro mengetik, materi interaktif, tantangan, delapan soal
  dengan penjelasan, serta hasil bintang/lencana.
- Drag & drop memakai pointer, touch, dan alternatif klik; navigasi keyboard
  tersedia lewat tombol dan fokus terlihat.
- Build produksi, lint, dan typecheck sudah lolos sebelum asset dimasukkan.

