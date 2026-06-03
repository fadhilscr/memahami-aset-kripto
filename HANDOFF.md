# Prompt Handoff untuk Claude Code

Salin teks di bawah ini sebagai pesan pertama ke **Claude Code**, dengan folder proyek ini terbuka. Prompt ini menjelaskan apa yang sudah ada dan apa yang perlu dilakukan untuk men-deploy ke Vercel.

---

## 📋 Prompt (salin mulai dari sini)

```
Saya punya website edukasi statis tentang aset kripto ("Memahami Aset Kripto").
Sudah jadi: HTML + CSS + JS murni, tanpa framework, tanpa build step.
Tolong bantu saya menyiapkannya untuk di-deploy GRATIS ke Vercel dan
melakukan beberapa peningkatan opsional.

KONTEKS STRUKTUR:
- index.html + 9 halaman bab (pendahuluan.html, bab-1…bab-6, tools.html, glosarium.html)
- assets/css/tokens.css (variabel desain, tema gelap/terang, 3 skema warna)
- assets/css/components.css (semua komponen UI)
- assets/js/site.js (nav, footer, toggle tema & warna, menu mobile, TOC, prev/next)
- assets/js/tools.js (data + filter direktori tools)
- assets/js/glossary.js (data + pencarian glosarium)
- Tidak ada langkah build. Semua tautan antar-halaman relatif.

TUGAS:
1. Inisialisasi git repo dan buat .gitignore yang sesuai.
2. Tambahkan file vercel.json minimal (situs statis, tanpa build) jika perlu,
   atau jelaskan setting import di dashboard Vercel (Framework: Other,
   Build Command kosong, Output Directory: root).
3. Pastikan situs bisa dijalankan lokal (mis. `npx serve .`) dan semua tautan,
   CSS, dan JS termuat tanpa error di console.
4. Buat README singkat berisi langkah deploy.

PENINGKATAN OPSIONAL (kerjakan hanya jika saya minta, tanyakan dulu):
- ISI OTOMATIS SEMUA GAMBAR. Di seluruh situs ada placeholder gambar bertanda
  "Slot gambar · auto-isi" berupa elemen <figure class="ai-img ai-img--empty">.
  Tiap elemen punya dua atribut:
    data-ai-prompt="..."  -> prompt deskriptif untuk men-generate gambar
    data-ai-file="assets/img/namafile.webp" -> path tujuan tempat menyimpan gambar
  TUGAS: untuk SETIAP elemen .ai-img, buat/generate sebuah gambar sesuai
  data-ai-prompt (gaya cyberpunk navy/neon agar konsisten), simpan ke path di
  data-ai-file, dengan rasio kira-kira 16:9 / landscape. Begitu file ada di
  path tersebut, placeholder otomatis hilang dan gambar tampil (tag <img>
  sudah menunjuk ke path itu; ada onerror yang menampilkan placeholder bila
  file belum ada). Tidak perlu mengubah HTML-nya — cukup sediakan file gambar
  di assets/img/. Daftar file yang dibutuhkan bisa kamu kumpulkan dengan
  mencari semua atribut data-ai-file di file .html.
  * Cara generate gambar terserah kamu (mis. API image generation yang saya
    sediakan key-nya, atau aset stock berlisensi). JANGAN hardcode API key di
    HTML/JS sisi klien.
  * Optimalkan ukuran (WebP, < ~300KB/gambar) agar situs tetap ringan.
- Isi "slot data live" Fear & Greed Index di bab-4-investasi.html
  (elemen dengan atribut [data-widget="fear-greed"]). Bisa fetch dari
  API publik alternative.me (https://api.alternative.me/fng/) di sisi klien.
  Tampilkan angka 0–100 + label, dan tangani error/loading dengan rapi.
- Tambahkan widget harga BTC/ETH sederhana (mis. via API CoinGecko publik)
  sebagai elemen baru bergaya .widget yang sudah ada di CSS.
- Tambahkan favicon dan meta Open Graph (judul, deskripsi, gambar) untuk
  tiap halaman agar tampil bagus saat dibagikan.
- Tambahkan sitemap.xml dan robots.txt.

ATURAN PENTING:
- Pertahankan gaya & struktur yang sudah ada. Jangan mengganti ke React/Next
  kecuali saya minta — ini sengaja statis agar gratis & ringan di Vercel.
- Semua tambahan data live harus aman: JANGAN minta API key yang harus
  dirahasiakan di sisi klien; pakai API publik tanpa auth, atau buat
  serverless function Vercel jika butuh menyembunyikan key.
- Pertahankan disclaimer edukasi di footer dan halaman.
```

---

## Catatan tambahan

- **Sistem diagram (`assets/css/viz.css` + `assets/js/viz.js`)** — semua diagram
  memakai panel gelap "cyberpunk-navy". Interaksi: segmented toggle
  (`[data-viz]` + `.viz-seg button[data-state]` + `[data-show]`), tooltip
  hotspot (`[data-tip="Judul|Isi"]`), dan meter beranimasi (`.meter__fill[data-w]`).
- **Slot gambar auto-isi (`.ai-img`)** — lihat bagian "ISI OTOMATIS SEMUA GAMBAR"
  di atas. Tinggal sediakan file di `assets/img/` sesuai `data-ai-file`.
- **Slot data live** sudah disiapkan di `bab-4-investasi.html` — cari `data-widget="fear-greed"`. Styling `.widget` sudah ada di `components.css`.
- Jika ingin menambah bab atau halaman baru, daftarkan di array `PAGES` pada `assets/js/site.js` agar otomatis muncul di nav, footer, dan tombol prev/next.
- Untuk mengubah warna brand, edit variabel di `assets/css/tokens.css` (blok `:root` dan varian `[data-accent="…"]`).
