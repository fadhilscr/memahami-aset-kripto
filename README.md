# Memahami Aset Kripto — Website Edukasi

Website edukasi statis (multi-halaman) tentang aset kripto, dari dasar hingga lanjutan. Dibangun dengan **HTML + CSS + JavaScript murni** — tanpa framework, tanpa build step. Siap di-deploy ke Vercel/Netlify/GitHub Pages secara gratis.

## Struktur

```
.
├── index.html                  # Beranda (hero + peta 8 bab)
├── pendahuluan.html            # Pendahuluan + 3 prinsip
├── bab-1-dasar-dasar.html      # Bab 1 — Dasar-dasar
├── bab-2-teknologi.html        # Bab 2 — Teknologi (blockchain, konsensus, wallet)
├── bab-3-ekosistem.html        # Bab 3 — Ekosistem (DeFi, stablecoin, NFT…)
├── bab-4-investasi.html        # Bab 4 — Investasi & analisis
├── bab-5-risiko-keamanan.html  # Bab 5 — Risiko & keamanan
├── bab-6-regulasi.html         # Bab 6 — Regulasi & pajak Indonesia
├── tools.html                  # Bab 7 — Direktori tools (filterable) + akun X
├── glosarium.html              # Bab 8 — Glosarium (searchable)
└── assets/
    ├── css/
    │   ├── tokens.css          # Variabel desain: warna, tipografi, tema gelap/terang, skema warna
    │   └── components.css      # Semua komponen (nav, kartu, tabel, callout, timeline, dll)
    └── js/
        ├── site.js             # Nav + footer + toggle tema/warna + menu mobile + TOC + prev/next
        ├── viz.js              # Interaktivitas diagram (toggle, tooltip, meter)
        ├── tools.js            # Data + filter direktori tools
        └── glossary.js         # Data + pencarian glosarium
    └── css/
        ├── tokens.css          # Variabel desain
        ├── components.css      # Komponen umum
        └── viz.css             # Sistem diagram cyberpunk + slot gambar auto-isi (.ai-img)
```

## Fitur

- **Multi-halaman** — satu file HTML per bab, navigasi top-nav (sticky).
- **Mode terang/gelap** — toggle di nav, tersimpan di `localStorage` (otomatis ikut preferensi sistem saat pertama dibuka).
- **3 skema warna** (Biru / Teal / Ungu) — toggle palet di nav, tersimpan di `localStorage`.
- **Daftar isi melayang** (TOC) dengan scrollspy di tiap bab.
- **Direktori tools interaktif** — filter per kategori & level (Bab 7).
- **Glosarium dengan pencarian** real-time + navigasi alfabet (Bab 8).
- **Slot data live** — placeholder Fear & Greed Index di Bab 4 (`[data-widget]`), siap diisi API.
- Responsif (mobile menu), aksesibel (skip-link, focus states), animasi reveal-on-scroll.

## Menjalankan secara lokal

Karena ini situs statis murni, cukup buka `index.html` di browser. Untuk menghindari batasan path, jalankan server lokal sederhana:

```bash
npx serve .
# atau
python3 -m http.server 8000
```

## Deploy ke Vercel

1. Push folder ini ke repo GitHub.
2. Di Vercel: **New Project → Import** repo tersebut.
3. Framework Preset: **Other**. Build Command: *(kosongkan)*. Output Directory: *(kosongkan / root)*.
4. **Deploy**. Selesai — situs langsung live.

> Tidak perlu konfigurasi build apa pun karena tidak ada langkah kompilasi.

## Disclaimer

Seluruh konten bersifat **edukatif**, bukan nasihat investasi, hukum, atau pajak. Data regulasi & pajak akurat hingga periode penyusunan; selalu verifikasi dari sumber resmi (OJK, DJP, BI).
