/**
 * app/api/caption/route.ts
 * ------------------------
 * POST { keyword, region, platform, tone }
 * → returns { captions: string[] }
 */

import { NextResponse } from "next/server";
import { groqCall } from "@/lib/groq";

// ── regional context fed into the prompt ────────────────────────
const REGION_CONTEXT: Record<string, string> = {
  Jogja: `Daerah: Yogyakarta. Gunakan slang Jogja yang natural seperti "yooo", "santai ae", "njing", "gombal", "wkwk", "nggak jelas". Sisipkan emoji lokal: 🏯🧁☕🌸💜. Frasa chas: "Cim karo Jogja", "Saklik!", "Santai ae".`,
  Makassar: `Daerah: Makassar. Gunakan slang Makassar yang natural seperti "anging", "kaddee", "santai ji", "bale", "bajinya". Sisipkan emoji lokal: 🦀🌊🔥⚡🎯. Frasa chas: "Makassar style", "Santai ji bro", "Hei bale!".`,
  Medan: `Daerah: Medan. Gunakan slang Medan yang natural seperti "lae", "bah", "tak", "medan style", "kheloo". Sisipkan emoji lokal: 🥩🌶️💪🔥😤. Frasa chas: "Medan punya!", "Santai lae", "Tak takut".`,
};

const PLATFORM_CONTEXT: Record<string, string> = {
  Instagram: "Platform: Instagram. Caption boleh panjang (max 2200 karakter). Taruh hashtag di komentar pertama, jangan di caption. Gunakan line break dan emoji untuk visual.",
  TikTok:    "Platform: TikTok. Caption harus singkat dan punchy (max 150 karakter). Hashtag langsung di caption. Tone energik dan viral.",
  Facebook: "Platform: Facebook. Caption boleh lebih santai dan panjang. Hashtag secukupnya (3-5 max). Tone lebih personal dan relatable.",
};

const TONE_CONTEXT: Record<string, string> = {
  Humoris: "Tone: Humoris dan lucu. Buat pembaca ketawa atau senyum. Boleh pakai wordplay atau situasi relatable yang lucu.",
  Religi:  "Tone: Religi dan inspiring. Sisipkan kata-kata positif, syukuran, atau kutipan motivatif ringan. Akhiri dengan ucapan seperti 'Barakallah' atau 'Semoga bermanfaat 🌙'.",
  "Gen-Z": "Tone: Gen-Z / Viral. Gunakan bahasa yang trendy: 'no cap', 'fr fr', 'bestie', 'literally', 'it's giving'. Energi tinggi, emoji banyak, vibe aesthetic.",
};

export async function POST(req: Request) {
  try {
    const { keyword, region, platform, tone } = await req.json();

    if (!keyword || !region || !platform || !tone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const prompt = `
Kamu adalah copywriter Indonesia berpengalaman yang ahli bikin konten sosmed untuk UMKM lokal.

${REGION_CONTEXT[region] || ""}
${PLATFORM_CONTEXT[platform] || ""}
${TONE_CONTEXT[tone] || ""}

Produk / Keyword: "${keyword}"

Buatkan PERSIS 5 varian caption yang siap pakai. Masing-masing caption harus:
- Unik dan berbeda satu sama lain (jangan monoton)
- Pakai slang & emoji daerah yang natural, bukan maksa
- Sesuai platform dan tone yang diminta
- Relevan untuk UMKM / jualan online
- Singkat, catchy, dan langsung bikin orang tertarik

Format output HANYA JSON array of strings, tanpa penjelasan tambahan. Contoh:
["caption 1...", "caption 2...", "caption 3...", "caption 4...", "caption 5..."]
`;

    const raw = await groqCall({
      messages: [
        { role: "system", content: "Kamu adalah copywriter Indonesia ahli sosmed. Selalu respond HANYA dengan JSON array of strings. Tanpa markdown, tanpa penjelasan." },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 1024,
    });

    // ── parse JSON safely ── strip markdown fences if present
    const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    let captions: string[];
    try {
      captions = JSON.parse(cleaned);
      if (!Array.isArray(captions)) throw new Error("not array");
      // safety: ensure exactly 5
      captions = captions.slice(0, 5);
      while (captions.length < 5) captions.push(captions[captions.length - 1] || "");
    } catch {
      // fallback: split by newline if JSON parse fails
      captions = cleaned
        .split(/\n/)
        .map((l) => l.replace(/^[\d\.\-\*\s]+/, "").replace(/^["']|["']$/g, "").trim())
        .filter(Boolean)
        .slice(0, 5);
      while (captions.length < 5) captions.push(captions[captions.length - 1] || "Caption tidak berhasil di-generate.");
    }

    return NextResponse.json({ captions });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}