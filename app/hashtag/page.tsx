"use client";

import { useState, useCallback, useEffect } from "react";
import Nav from "@/components/nav";
import { Card, Badge, CopyBtn, PricingModal } from "@/components/ui";

// ── Spinner ─────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "36px 0" }}>
      <div style={{
        width: 24, height: 24,
        border: "3px solid rgba(255,255,255,0.15)",
        borderTop: "3px solid #22c55e",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <span style={{ color: "#888", fontSize: 14 }}>AI lagi riset hashtag…</span>
    </div>
  );
}

// ── ClickToCopy tag ─────────────────────────────────────────────
function HashTag({ text, color }: { text: string; color: string }) {
  const [flash, setFlash] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setFlash(true);
    setTimeout(() => setFlash(false), 900);
  };
  return (
    <span
      onClick={handle}
      style={{
        background: flash ? `${color}35` : `${color}15`,
        border: `1px solid ${flash ? color : color + "35"}`,
        color: flash ? "#fff" : color,
        borderRadius: 20,
        padding: "5px 14px",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
        userSelect: "none",
      }}
      {...(!isMobileGlobal && {
        onMouseEnter: (e) => { (e.target as HTMLSpanElement).style.background = `${color}28`; },
        onMouseLeave: (e) => { (e.target as HTMLSpanElement).style.background = flash ? `${color}35` : `${color}15`; },
      })}
    >
      {flash ? "✓ copied" : text}
    </span>
  );
}

// ── clickable emoji ─────────────────────────────────────────────
function EmojiItem({ emoji }: { emoji: string }) {
  const [flash, setFlash] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(emoji);
    setFlash(true);
    setTimeout(() => setFlash(false), 700);
  };
  return (
    <span
      onClick={handle}
      style={{
        fontSize: flash ? 26 : 28,
        cursor: "pointer",
        transition: "transform 0.2s, font-size 0.15s",
        display: "inline-block",
        userSelect: "none",
        filter: flash ? "drop-shadow(0 0 6px rgba(255,107,53,0.7))" : "none",
      }}
      {...(!isMobileGlobal && {
        onMouseEnter: (e) => { (e.target as HTMLSpanElement).style.transform = "scale(1.35)"; },
        onMouseLeave: (e) => { (e.target as HTMLSpanElement).style.transform = "scale(1)"; },
      })}
    >
      {emoji}
    </span>
  );
}

// ── types ───────────────────────────────────────────────────────
interface HashtagData {
  macro: string[];
  mid: string[];
  micro: string[];
  emoji: string[];
  reach: { macro: string; mid: string; micro: string };
}

// ⚠️ Kita tidak bisa pakai `isMobile` langsung di komponen global,
// jadi kita buat helper state di luar untuk dipakai di child components.
let isMobileGlobal = false;

export default function HashtagPage() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<HashtagData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 600;
      setIsMobile(mobile);
      isMobileGlobal = mobile; // update global flag
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSearch = useCallback(async () => {
    if (!keyword.trim() || loading) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/hashtag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error || "Gagal riset");
      setData(json as HashtagData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Oops, something went wrong");
    } finally {
      setLoading(false);
    }
  }, [keyword, loading]);

  // segment config
  const SEGMENTS = data ? [
    { label: "Macro", color: "#ff6b35", reach: data.reach.macro, items: data.macro, icon: "🌐" },
    { label: "Mid-Tier", color: "#7c3aed", reach: data.reach.mid, items: data.mid, icon: "📊" },
    { label: "Micro", color: "#22c55e", reach: data.reach.micro, items: data.micro, icon: "🎯" },
  ] : [];

  return (
    <>
      <Nav onPricingClick={() => setPricingOpen(true)} />

      <main style={{ maxWidth: 660, margin: "0 auto", padding: "36px 20px 80px" }}>

        {/* header */}
        <div style={{ marginBottom: 28, animation: "fadeUp 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>🔍</span>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? 22 : 26, fontWeight: 800, color: "#fff", margin: 0 }}>
              Hashtag Optimizer
            </h1>
            <Badge color="#22c55e">30 Hashtag</Badge>
          </div>
          <p style={{ color: "#666", fontSize: 14, margin: 0 }}>
            1 keyword → 30 hashtag segmented + 10 emoji viral + estimasi reach Indonesia
          </p>
        </div>

        {/* ── input card ── */}
        <Card style={{ 
          animation: "fadeUp 0.45s ease 0.05s both",
          padding: isMobile ? "16px" : "20px 22px"
        }}>
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Masukkan keyword… misal: sepatu lokal, kosmetik halal"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "12px 14px",
                  fontSize: 15,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleSearch}
                disabled={!keyword.trim() || loading}
                style={{
                  width: "100%",
                  background: keyword.trim() && !loading
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "rgba(255,255,255,0.08)",
                  border: "none",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "12px 0",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: keyword.trim() && !loading ? "pointer" : "not-allowed",
                  opacity: keyword.trim() ? 1 : 0.45,
                  transition: "opacity 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {loading ? "⏳ Analyzing…" : "🚀 Riset Sekarang"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Masukkan keyword… misal: sepatu lokal, kosmetik halal"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "11px 14px",
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleSearch}
                disabled={!keyword.trim() || loading}
                style={{
                  background: keyword.trim() && !loading
                    ? "linear-gradient(135deg, #22c55e, #16a34a)"
                    : "rgba(255,255,255,0.08)",
                  border: "none",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "0 26px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: keyword.trim() && !loading ? "pointer" : "not-allowed",
                  opacity: keyword.trim() ? 1 : 0.45,
                  transition: "transform 0.15s",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
                onMouseDown={(e) => { if (keyword.trim()) e.currentTarget.style.transform = "scale(0.97)"; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                {loading ? "⏳ Analyzing…" : "🚀 Riset Sekarang"}
              </button>
            </div>
          )}
          <p style={{ color: "#555", fontSize: 12, margin: "10px 0 0" }}>
            💡 Tips: Gunakan kata spesifik untuk hasil yang lebih relevan di pasar Indonesia
          </p>
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
        {data && (
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.4s ease" }}>

            {/* reach overview cards */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", 
              gap: 10 
            }}>
              {[
                { label: "Macro Reach", value: data.reach.macro, color: "#ff6b35", icon: "🌐" },
                { label: "Mid Reach", value: data.reach.mid, color: "#7c3aed", icon: "📊" },
                { label: "Micro Reach", value: data.reach.micro, color: "#22c55e", icon: "🎯" },
              ].map((r, i) => (
                <Card key={i} style={{ textAlign: "center", animation: "fadeUp 0.3s ease both", animationDelay: `${i * 0.07}s` }}>
                  <div style={{ fontSize: 20 }}>{r.icon}</div>
                  <p style={{ margin: "5px 0 2px", color: "#666", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.7 }}>{r.label}</p>
                  <p style={{ margin: 0, color: r.color, fontSize: 17, fontWeight: 800 }}>{r.value}</p>
                </Card>
              ))}
            </div>

            {/* hashtag segments */}
            {SEGMENTS.map((seg, si) => (
              <Card key={si} style={{ 
                animation: "fadeUp 0.38s ease both", 
                animationDelay: `${(si + 3) * 0.07}s`,
                padding: isMobile ? "16px" : "20px 22px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ background: seg.color, borderRadius: 5, width: 10, height: 10, display: "inline-block" }} />
                    <h4 style={{ margin: 0, color: "#fff", fontSize: 14, fontWeight: 700 }}>{seg.icon} {seg.label}</h4>
                  </div>
                  <span style={{ color: seg.color, fontSize: 12, fontWeight: 600 }}>Est. Reach: {seg.reach}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 6 : 8 }}>
                  {seg.items.map((h, i) => <HashTag key={i} text={h} color={seg.color} />)}
                </div>
              </Card>
            ))}

            {/* viral emoji */}
            <Card style={{ 
              animation: "fadeUp 0.4s ease both", 
              animationDelay: "0.65s",
              padding: isMobile ? "16px" : "20px 22px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <h4 style={{ margin: 0, color: "#fff", fontSize: 14, fontWeight: 700 }}>🔥 10 Emoji Viral Indonesia</h4>
                <CopyBtn text={data.emoji.join(" ")} label="Copy All" />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 10 : 12, justifyContent: "center" }}>
                {data.emoji.map((em, i) => <EmojiItem key={i} emoji={em} />)}
              </div>
            </Card>

            {/* export all */}
            <div style={{ textAlign: "center" }}>
              <CopyBtn
                text={`MACRO:\n${data.macro.join(" ")}\n\nMID-TIER:\n${data.mid.join(" ")}\n\nMICRO:\n${data.micro.join(" ")}\n\nEMOJI:\n${data.emoji.join(" ")}`}
                label="Export All"
              />
            </div>
          </div>
        )}

        {/* pricing CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={() => setPricingOpen(true)} style={{
            background: "rgba(255,107,53,0.1)",
            border: "1px solid rgba(255,107,53,0.3)",
            color: "#ff6b35", borderRadius: 12,
            padding: "10px 24px", fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
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