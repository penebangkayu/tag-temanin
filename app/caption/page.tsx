"use client";

import { useState, useCallback, useEffect } from "react";
import Nav from "@/components/nav";
import { Card, Badge, CopyBtn, PricingModal } from "@/components/ui";

// ── Select helper (mobile-friendly) ───────────────────────────────
function Select({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ 
        fontSize: 11, 
        fontWeight: 600, 
        color: "#888", 
        textTransform: "uppercase", 
        letterSpacing: 1 
      }}>
        {label}
      </label>
      <div style={{
        position: "relative",
        width: "100%",
      }}>
        <select 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "#fff",
            borderRadius: 10,
            padding: "9px 32px 9px 12px", // ruang untuk panah custom
            fontSize: 14,
            cursor: "pointer",
            outline: "none",
            appearance: "none", // ← sembunyikan panah bawaan
            fontFamily: "inherit",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <span style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "#aaa",
          fontSize: 14,
        }}>▼</span>
      </div>
    </div>
  );
}

// ── Spinner ─────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "32px 0" }}>
      <div style={{
        width: 24, height: 24,
        border: "3px solid rgba(255,255,255,0.15)",
        borderTop: "3px solid #ff6b35",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <span style={{ color: "#888", fontSize: 14 }}>AI lagi mikirin…</span>
    </div>
  );
}

export default function CaptionPage() {
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("Jogja");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Humoris");
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── platform tips ──
  const TIPS: Record<string, string> = {
    Instagram: "Taruh hashtag di komentar pertama. Max 2200 karakter.",
    TikTok: "Caption harus singkat & punchy. Max 150 karakter. Hashtag langsung di caption.",
    Facebook: "Hashtag lebih sedikit di FB (3–5 max). Tone santai.",
  };

  const handleGenerate = useCallback(async () => {
    if (!keyword.trim() || loading) return;
    setLoading(true);
    setError(null);
    setCaptions([]);

    try {
      const res = await fetch("/api/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), region, platform, tone }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Gagal generate");
      setCaptions(json.captions);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Oops, something went wrong");
    } finally {
      setLoading(false);
    }
  }, [keyword, region, platform, tone, loading]);

  return (
    <>
      <Nav onPricingClick={() => setPricingOpen(true)} />

      <main style={{ maxWidth: 660, margin: "0 auto", padding: "36px 20px 80px" }}>

        {/* header */}
        <div style={{ marginBottom: 28, animation: "fadeUp 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>✍️</span>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? 22 : 26, fontWeight: 800, color: "#fff", margin: 0 }}>
              Caption Generator
            </h1>
            <Badge color="#7c3aed">AI</Badge>
          </div>
          <p style={{ color: "#666", fontSize: 14, margin: 0 }}>
            Masukin keyword produk → AI bikin 5 caption siap posting dengan slang daerah
          </p>
        </div>

        {/* ── input card ── */}
        <Card style={{ 
          animation: "fadeUp 0.45s ease 0.05s both",
          padding: isMobile ? "20px 16px" : "20px 22px"
        }}>
          {/* keyword input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              color: "#888", 
              textTransform: "uppercase", 
              letterSpacing: 1, 
              display: "block", 
              marginBottom: 6 
            }}>
              Keyword / Produk
            </label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="Misal: Batik Jogja, Ayam Taliwang, Parfum Lokal…"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
                borderRadius: 10,
                padding: "12px 14px",
                fontSize: 15,
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* 3 selects in row — responsive grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: isMobile ? 16 : 12,
            marginBottom: 16,
          }}>
            <Select label="Daerah" options={["Jogja", "Makassar", "Medan"]} value={region} onChange={setRegion} />
            <Select label="Platform" options={["Instagram", "TikTok", "Facebook"]} value={platform} onChange={setPlatform} />
            <Select label="Nada" options={["Humoris", "Religi", "Gen-Z"]} value={tone} onChange={setTone} />
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!keyword.trim() || loading}
            style={{
              width: "100%",
              background: keyword.trim() && !loading
                ? "linear-gradient(135deg, #ff6b35, #e84393)"
                : "rgba(255,255,255,0.08)",
              border: "none",
              color: "#fff",
              borderRadius: 12,
              padding: "14px 0",
              fontSize: 16,
              fontWeight: 700,
              cursor: keyword.trim() && !loading ? "pointer" : "not-allowed",
              opacity: keyword.trim() ? 1 : 0.45,
              transition: isMobile ? "opacity 0.2s" : "transform 0.15s, opacity 0.2s",
              fontFamily: "inherit",
            }}
            {...(!isMobile && {
              onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "scale(0.97)"; },
              onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "scale(1)"; },
              onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.transform = "scale(1)"; },
            })}
          >
            {loading ? "⏳ Generating…" : "⚡ Generate 5 Varian"}
          </button>

          {/* platform tip */}
          <div style={{
            marginTop: 16,
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            color: "#c4b5fd",
            lineHeight: 1.5,
          }}>
            💡 <strong>Tips {platform}:</strong> {TIPS[platform]}
          </div>
        </Card>

        {/* ── loading ── */}
        {loading && <Spinner />}

        {/* ── error ── */}
        {error && (
          <div style={{
            marginTop: 16,
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: 12,
            padding: "12px 16px",
            color: "#f87171",
            fontSize: 14,
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ── results ── */}
        {captions.length > 0 && (
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.4s ease" }}>
            {/* top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 700 }}>
                📦 5 Varian Caption
              </h3>
              <CopyBtn text={captions.join("\n\n---\n\n")} label="Copy All" />
            </div>

            {/* caption cards */}
            {captions.map((cap, i) => (
              <Card key={i} style={{ 
                animation: "fadeUp 0.35s ease both", 
                animationDelay: `${i * 0.06}s`,
                padding: isMobile ? "16px" : "20px 22px"
              }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start", 
                  gap: 12, 
                  flexDirection: isMobile ? "column" : "row" 
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%" }}>
                    {/* number badge */}
                    <span style={{
                      background: "linear-gradient(135deg,#ff6b35,#e84393)",
                      color: "#fff",
                      borderRadius: 8,
                      width: 28, height: 28,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 800, flexShrink: 0,
                    }}>{i + 1}</span>
                    <p style={{ 
                      margin: 0, 
                      color: "#ddd", 
                      fontSize: 14, 
                      lineHeight: 1.6, 
                      whiteSpace: "pre-line", 
                      flexGrow: 1 
                    }}>{cap}</p>
                  </div>
                  <div style={{ 
                    alignSelf: isMobile ? "flex-end" : "flex-start", 
                    marginTop: isMobile ? 8 : 0 
                  }}>
                    <CopyBtn text={cap} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* pricing CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={() => setPricingOpen(true)} style={{
            background: "rgba(255,107,53,0.1)",
            border: "1px solid rgba(255,107,53,0.3)",
            color: "#ff6b35", 
            borderRadius: 12,
            padding: "10px 24px", 
            fontSize: 14, 
            fontWeight: 600,
            cursor: "pointer", 
            fontFamily: "inherit",
            animation: "pulse 2.8s infinite",
          }}>
            💰 Lihat Paket Pricing
          </button>
        </div>
      </main>

      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </>
  );
}