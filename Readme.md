# Proses Fotosintesis

Game edukasi interaktif berbahasa Indonesia untuk mempelajari bahan, tempat,
dan hasil proses fotosintesis melalui materi singkat dan kuis delapan soal.

## Menjalankan proyek

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

## Isi permainan

Permainan berisi satu materi tentang fotosintesis dan satu kuis dengan delapan
soal. Pemain dapat membaca penjelasan dan umpan balik setelah setiap jawaban.
Kesalahan tidak mengurangi nyawa. Setelah kuis selesai, halaman hasil
menampilkan jumlah jawaban benar dari delapan soal dan skor terbaik.

Progres disimpan di `localStorage` dengan kunci
`proses-fotosintesis:v1`. Musik latar tersedia melalui tombol musik.

## Aset

Path aset didefinisikan di [lib/assets.ts](./lib/assets.ts). Ilustrasi
fotosintesis dan musik latar menggunakan berkas lokal di `public/assets/`.
