"use client";

import { useState } from "react";

// ── Card ────────────────────────────────────────────────────────
export function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.11)",
      borderRadius: 18,
      padding: "20px 22px",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Badge ───────────────────────────────────────────────────────
export function Badge({ children, color = "#ff6b35" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      background: color,
      color: "#fff",
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 20,
      letterSpacing: 0.6,
      textTransform: "uppercase" as const,
    }}>
      {children}
    </span>
  );
}

// ── CopyBtn ─────────────────────────────────────────────────────
export function CopyBtn({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <button onClick={handle} style={{
      background: copied ? "#22c55e" : "rgba(255,255,255,0.1)",
      border: "none",
      color: "#fff",
      borderRadius: 8,
      padding: "5px 13px",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      transition: "background 0.25s, transform 0.15s",
      fontFamily: "inherit",
      transform: copied ? "scale(0.95)" : "scale(1)",
    }}>
      {copied ? "✓ Copied!" : `📋 ${label}`}
    </button>
  );
}

// ── PricingModal ────────────────────────────────────────────────
const PLANS = [
  {
    title: "Caption AI",
    sub: "Unlimited caption / bulan",
    price: "Rp 25.000",
    tag: "Popular",
    tagColor: "#7c3aed",
    features: ["5 varian AI per generate", "3 daerah (Jogja, Makassar, Medan)", "3 platform (IG, TikTok, FB)", "3 tone style"],
  },
  {
    title: "Hashtag Per-Riset",
    sub: "Bayar per riset",
    price: "Rp 15.000",
    tag: null,
    tagColor: "",
    features: ["30 hashtag segmented", "10 emoji viral", "Estimasi reach"],
  },
  {
    title: "Hashtag Unlimited",
    sub: "Unlimited riset / bulan",
    price: "Rp 50.000",
    tag: "Best Value",
    tagColor: "#ff6b35",
    features: ["Semua fitur Hashtag", "AI-powered suggestions", "Export semua", "Priority update"],
  },
];

export function PricingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(5px)",
      zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 16px",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "linear-gradient(145deg, #1a1a35 0%, #0f0f1f 100%)",
        border: "1px solid rgba(255,107,53,0.25)",
        borderRadius: 24,
        padding: "32px 28px",
        maxWidth: 540,
        width: "100%",
        position: "relative",
        animation: "fadeUp 0.25s ease",
      }}>
        {/* close */}
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 18,
          background: "none", border: "none", color: "#777", fontSize: 20, cursor: "pointer",
        }}>✕</button>

        <h2 style={{ margin: 0, color: "#fff", fontSize: 21, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>
          💰 Pilih Paket
        </h2>
        <p style={{ color: "#666", fontSize: 13, margin: "4px 0 22px" }}>
          Semua paket bisa dicoba gratis selama 7 hari
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {PLANS.map((p, i) => (
            <div key={i} style={{
              flex: "1 1 140px",
              background: p.tag === "Best Value" ? "rgba(255,107,53,0.1)" : "rgba(255,255,255,0.04)",
              border: p.tag === "Best Value" ? "1px solid rgba(255,107,53,0.35)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "18px 16px",
            }}>
              {p.tag && <Badge color={p.tagColor}>{p.tag}</Badge>}
              <h3 style={{ color: "#fff", margin: "10px 0 2px", fontSize: 15, fontWeight: 700 }}>{p.title}</h3>
              <p style={{ color: "#666", fontSize: 11, margin: "0 0 10px" }}>{p.sub}</p>
              <p style={{ color: "#ff6b35", fontSize: 23, fontWeight: 800, margin: "0 0 14px" }}>{p.price}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ color: "#aaa", fontSize: 12, padding: "3px 0" }}>✓ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ color: "#444", fontSize: 11, marginTop: 20, textAlign: "center" }}>
          * Demo — pricing untuk referensi saja
        </p>
      </div>
    </div>
  );
}