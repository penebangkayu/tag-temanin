
# 📖 Dokumentasi Developer - Tag Temanin

Tag Temanin adalah platform **generasi konten AI open-source** yang membantu membuat caption dan hashtag cerdas untuk berbagai platform sosial media.  
Proyek ini sepenuhnya open source dan tersedia di GitHub untuk kontribusi dan kustomisasi.

---

## 🚀 Fitur

- ⚡ **Generasi Bertenaga AI**  
  Menggunakan model AI canggih untuk generasi caption dan hashtag yang cerdas.

- 💻 **Open Source**  
  Sepenuhnya open source dan tersedia di GitHub untuk kontribusi dan kustomisasi.

- 📚 **Integrasi Mudah**  
  API endpoint sederhana yang dapat diintegrasikan ke platform atau aplikasi apapun.

---

## 🔌 API Endpoint

### 1. Generate Caption
**Method:** `POST`  
**Path:** `/api/caption`  
**Deskripsi:** Generate caption berdasarkan keyword, platform, region, dan tone.

**Request Body:**
```json
{
  "keyword": "string",
  "platform": "Instagram | TikTok | Facebook",
  "region": "Jogja | Makassar | Medan",
  "tone": "Humoris | Religi | Gen-Z"
}
```

**Response:**
```json
{
  "captions": ["caption1", "caption2", "caption3", "caption4", "caption5"]
}
```

**Contoh Implementasi (cURL):**
```bash
curl -X POST http://localhost:3000/api/caption \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "kopi",
    "platform": "Instagram",
    "region": "Jogja",
    "tone": "Humoris"
  }'
```

**Contoh Implementasi (JavaScript - fetch):**
```javascript
const response = await fetch("/api/caption", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    keyword: "kopi",
    platform: "Instagram",
    region: "Jogja",
    tone: "Humoris"
  })
});

const data = await response.json();
console.log(data.captions);
```

---

### 2. Riset Hashtag dan Emoji
**Method:** `POST`  
**Path:** `/api/hashtag`  
**Deskripsi:** Riset hashtag dan emoji berdasarkan keyword.

**Request Body:**
```json
{
  "keyword": "string"
}
```

**Response:**
```json
{
  "macro": ["#hashtag1", "#hashtag2"],
  "mid": ["#hashtag1", "#hashtag2"],
  "micro": ["#hashtag1", "#hashtag2"],
  "emoji": ["🔥", "✨"],
  "reach": {
    "macro": "rentang jangkauan",
    "mid": "rentang jangkauan",
    "micro": "rentang jangkauan"
  }
}
```

**Contoh Implementasi (cURL):**
```bash
curl -X POST http://localhost:3000/api/hashtag \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "kopi"
  }'
```

**Contoh Implementasi (JavaScript - fetch):**
```javascript
const response = await fetch("/api/hashtag", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ keyword: "kopi" })
});

const data = await response.json();
console.log(data);
```

---

## 🛠️ Memulai

Ikuti langkah-langkah berikut untuk menjalankan proyek secara lokal:

1. **Clone Repository**
   ```bash
   git clone https://github.com/penebangkayu/tag-temanin.git
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Environment Variables**
   ```bash
   GROQ_API_KEY=your_api_key_here
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

---

## 🤝 Kontribusi

Kami menyambut kontribusi dari developer di semua level.  
Bergabunglah dengan kami di GitHub dan bantu tingkatkan **Tag Temanin**!

- 🌐 Repository GitHub: Tag Temanin [(github.com)](https://github.com/penebangkayu/tag-temanin)

---

## 📜 Lisensi

Proyek ini bersifat **open source** dan tersedia untuk kontribusi serta kustomisasi sesuai kebutuhan komunitas.
