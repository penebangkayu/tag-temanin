/**
 * app/api/hashtag/route.ts
 * ------------------------
 * POST { keyword }
 * → returns { macro: string[], mid: string[], micro: string[], emoji: string[], reach: {...} }
 */

import { NextResponse } from "next/server";
import { groqCall } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "Missing keyword" }, { status: 400 });
    }

    const prompt = `
Kamu adalah ahli riset hashtag dan strategi konten untuk pasar Indonesia.

Keyword yang mau diriset: "${keyword}"

Buatkan riset hashtag yang komprehensif untuk pasar Indonesia. Ikuti struktur ini PERSIS:

1. MACRO hashtag (10 buah): Hashtag dengan volume tinggi, populer di Indonesia. Campurin antara yang relevan ke keyword dan yang general trending di Indonesia.
2. MID-TIER hashtag (10 buah): Hashtag yang lebih spesifik ke niche/kategori keyword. Volume sedang tapi engagement lebih tinggi.
3. MICRO hashtag (10 buah): Hashtag sangat spesifik, low competition tapi high engagement. Kombinasi keyword + atribut spesifik.
4. VIRAL EMOJI (10 buah): Emoji yang lagi trending dan sering dipakai di konten Indonesia di 2025-2026. Pilih yang boost engagement.
5. ESTIMASI REACH per segmen berdasarkan analisis pasar Indonesia.

PENTING:
- Semua hashtag pakai "#" di depan
- Mix bahasa Indonesia dan English yang natural untuk pasar Indo
- Relevan ke keyword tapi juga discoverable
- Jangan asal-asalan, pikirkan strategi reach vs competition

Output HANYA JSON dengan format ini (tanpa markdown, tanpa penjelasan):
{
  "macro": ["#hashtag1", ...],
  "mid": ["#hashtag1", ...],
  "micro": ["#hashtag1", ...],
  "emoji": ["🔥", ...],
  "reach": {
    "macro": "perkiraan reach range",
    "mid": "perkiraan reach range",
    "micro": "perkiraan reach range"
  }
}
`;

    const raw = await groqCall({
      messages: [
        { role: "system", content: "Kamu adalah ahli hashtag Indonesia. Respond HANYA dengan JSON object sesuai format yang diminta. Tanpa markdown fences, tanpa penjelasan." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    // ── parse JSON safely ──
    const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    let data: {
      macro: string[];
      mid: string[];
      micro: string[];
      emoji: string[];
      reach: { macro: string; mid: string; micro: string };
    };

    try {
      data = JSON.parse(cleaned);
    } catch {
      // hard fallback: return sensible defaults so UI doesn't break
      const kw = keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase();
      data = {
        macro:  ["#Indonesia", "#UMKM", "#OnlineShopping", "#Jualan", "#Marketplace", "#Bisnis", "#TikTokShop", "#ShopeeIndonesia", "#LokalBangga", "#JualanOnline"],
        mid:    [`#${kw}Indo`, `#${kw}UMKM`, `#${kw}Online`, `#${kw}Terbaik`, `#${kw}2025`, `#${kw}Promo`, `#${kw}Jakarta`, `#${kw}Murah`, `#${kw}Jualan`, `#${kw}Sale`],
        micro:  [`#${kw}Asli`, `#${kw}Original`, `#${kw}LocalBrand`, `#${kw}MadeInIndonesia`, `#${kw}Review`, `#${kw}Testimoni`, `#${kw}Rekomendasi`, `#${kw}Produk`, `#${kw}Quality`, `#${kw}Terpercaya`],
        emoji:  ["🔥", "✨", "💎", "🚀", "😍", "👀", "💯", "⚡", "🎯", "🤩"],
        reach:  { macro: "50K–200K", mid: "5K–50K", micro: "500–5K" },
      };
    }

    // ── safety: ensure arrays have correct lengths ──
    const ensure = (arr: string[], n: number, prefix = "#tag") =>
      [...arr.slice(0, n), ...Array(Math.max(0, n - arr.length)).fill(prefix)].slice(0, n);

    data.macro  = ensure(data.macro, 10, "#Indonesia");
    data.mid    = ensure(data.mid, 10, `#${keyword}`);
    data.micro  = ensure(data.micro, 10, `#${keyword}Lokal`);
    data.emoji  = ensure(data.emoji, 10, "🔥");
    data.reach  = data.reach || { macro: "50K–200K", mid: "5K–50K", micro: "500–5K" };

    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
