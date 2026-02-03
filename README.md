
# 🇮🇩 TagTemanin  
### Hyper-Local AI Toolbox for Indonesian Creators & UMKM  

> **Caption & Hashtag yang Beneran Work** — pakai slang daerah, emoji viral, dan strategi yang relevan dengan pasar Indonesia.  

![TagTemanin Preview](https://placehold.co/600x300/121212/ff6b35?text=TagTemanin+Preview)

---

## ✨ Fitur Utama

- **Caption Generator**  
  → 5 varian caption dalam sekali klik  
  → Pilih daerah: **Jogja, Makassar, Medan**  
  → Pilih platform: **Instagram, TikTok, Facebook**  
  → Pilih nada: **Humoris, Religi, Gen-Z**

- **Hashtag Optimizer**  
  → 30 hashtag tersegmentasi (Macro, Mid, Micro)  
  → Estimasi reach per segmen  
  → 10 emoji viral khusus Indonesia  
  → Export semua dalam satu klik

- **Hyper-Local AI**  
  → Tidak pakai template English-generic  
  → Mengerti konteks budaya & tren lokal  
  → Dibuat khusus untuk UMKM & content creator Indonesia

- **UI/UX Santai & Viral-Friendly**  
  → Desain dark mode dengan aksen oranye-gradient  
  → Animasi smooth & micro-interactions  
  → Responsif di semua perangkat (mobile-first)

---

## 🚀 Demo
Belum tersedia publik — tapi kamu bisa jalankan sendiri secara lokal!

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Inline styles + CSS keyframes (zero external CSS lib)
- **AI Backend**: Groq API + fallback model chain
- **Deployment**: Vercel
- **Responsif**: Mobile-first dengan deteksi `window.innerWidth`

---

## 📦 Instalasi Lokal

1. **Clone repositori**
   ```bash
   git clone https://github.com/penebangkayu/tag-temanin.git
   cd tag-temanin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   pnpm install
   ```

3. **Buat file `.env.local`**
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Jalankan dev server**
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000)

---

## 🧠 Struktur Proyek

```
src/
├── app/
│   ├── page.tsx          → Halaman utama
│   ├── caption/page.tsx  → Caption Generator
│   └── hashtag/page.tsx  → Hashtag Optimizer
├── components/
│   ├── nav.tsx           → Navbar responsif (dengan mobile menu)
│   └── ui.tsx            → Card, Badge, CopyBtn, PricingModal
└── lib/
    └── groq.ts           → Groq client dengan fallback model & console.log
```

---

## 💡 Catatan Pengembangan

- Semua halaman **sudah mobile-responsive** (termasuk form, grid, dan overlay).
- Hover effect **otomatis dinonaktifkan di mobile**.
- Dropdown (`<select>`) menggunakan **custom arrow** agar tidak overflow.
- Model AI mana yang dipakai bisa dilihat di **console log** (untuk debugging).
- UI mengikuti preferensi:  
  → Dark background (`#121212`)  
  → Font logo: **Libre Baskerville**  
  → Font konten: **Syne**  
  → Warna aksen: **Oranye-gradient (#ff6b35 → #e84393)**

---

## 💰 Pricing (Demo)

| Paket | Harga | Fitur |
|------|-------|------|
| **Caption AI** | Rp 25.000/bulan | Unlimited generate, 3 daerah, 3 platform |
| **Hashtag Per-Riset** | Rp 15.000/riset | 30 hashtag + emoji + estimasi reach |
| **Hashtag Unlimited** | Rp 50.000/bulan | Semua fitur + export + priority update |

> ⚠️ *Harga hanya untuk referensi. Belum ada integrasi pembayaran.*

---

## 🤝 Kontribusi
Proyek ini bersifat eksperimental. Jika kamu ingin berkontribusi:
1. Fork repositori
2. Buat branch baru (`feat/nama-fitur`)
3. Commit & push
4. Buka Pull Request

---

## 📄 Lisensi
MIT License — bebas pakai untuk personal maupun komersial.

---

Dibuat dengan ❤️ untuk **UMKM & Creator Indonesia** oleh [Nama Kamu].

---

> **TagTemanin** = "Tag" + "Temenin" → AI yang nemenin kamu bikin konten biar makin viral! 🚀