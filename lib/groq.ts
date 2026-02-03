/**
 * lib/groq.ts
 * -----------
 * Groq client with automatic model-fallback chain.
 * Order = quality priority. On 429 / 5xx / network error we slide to the next model.
 * All models below are on Groq's free tier (as of early 2026).
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// ── fallback chain ──────────────────────────────────────────────
const MODEL_CHAIN: string[] = [
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-120b",
  "llama-3.1-8b-instant",
  "moonshotai/kimi-k2-instruct-0905",
  "openai/gpt-oss-20b",
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "groq/compound",
];

// ── types ───────────────────────────────────────────────────────
interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqCallOptions {
  messages: GroqMessage[];
  temperature?: number;
  max_tokens?: number;
}

// ── core caller with fallback ────────────────────────────────────
export async function groqCall(opts: GroqCallOptions): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set in .env.local");

  let lastError: Error | null = null;

  for (const model of MODEL_CHAIN) {
    console.log(`[TagTemanin] 🔄 Mencoba model: ${model}`); // <-- LOG: mencoba model

    try {
      const res = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: opts.messages,
          temperature: opts.temperature ?? 0.85,
          max_tokens: opts.max_tokens ?? 1024,
        }),
      });

      // ── rate-limit or server error → try next model ──
      if (res.status === 429 || res.status >= 500) {
        console.log(`[TagTemanin] ⚠️ Model ${model} gagal: HTTP ${res.status}`);
        lastError = new Error(`model ${model} → HTTP ${res.status}`);
        continue;
      }

      if (!res.ok) {
        const body = await res.text();
        console.log(
          `[TagTemanin] ❌ Model ${model} error: HTTP ${res.status}`,
          body,
        );
        lastError = new Error(`model ${model} → HTTP ${res.status}: ${body}`);
        continue;
      }

      const json = await res.json();
      const text: string | undefined = json?.choices?.[0]?.message?.content;
      if (!text) {
        console.log(
          `[TagTemanin] 🚫 Model ${model} mengembalikan respons kosong`,
        );
        lastError = new Error(`model ${model} → empty response`);
        continue;
      }

      // ✅ Berhasil! Log model yang digunakan
      console.log(`[TagTemanin] ✅ Berhasil menggunakan model: ${model}`);
      return text;
    } catch (err: unknown) {
      console.log(`[TagTemanin] 🌐 Error jaringan pada model ${model}:`, err);
      lastError = err instanceof Error ? err : new Error(String(err));
      continue;
    }
  }

  // all models exhausted
  console.error("[TagTemanin] 💥 Semua model gagal.");
  throw lastError ?? new Error("groqCall: all models in fallback chain failed");
}
