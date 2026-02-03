"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/nav";
import { PricingModal } from "@/components/ui";

const STATS = [
  { label: "Daerah Didukung", value: "3+", icon: "🗺️" },
  { label: "Platform", value: "3", icon: "📱" },
  { label: "Caption per Generate", value: "5", icon: "✍️" },
  { label: "Hashtag per Riset", value: "30", icon: "#️⃣" },
];

const WHY = [
  { icon: "🇮🇩", title: "Hyper-Local", desc: "Slang Jogja, Makassar, Medan — bukan English-generic." },
  { icon: "⚡", title: "Instan", desc: "Dari keyword → caption siap posting dalam hitungan detik." },
  { icon: "🎯", title: "Target Pasar Indo", desc: "Hashtag & emoji yang beneran trending di Indonesia." },
  { icon: "💰", title: "Terjangkau", desc: "Mulai dari Rp 15.000 — no subscription trap." },
];

export default function HomePage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi ukuran layar untuk responsivitas
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Nav onPricingClick={() => setPricingOpen(true)} />

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 80px" }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", animation: "fadeUp 0.5s ease" }}>
          {/* pill badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,107,53,0.1)",
            border: "1px solid rgba(255,107,53,0.25)",
            borderRadius: 30,
            padding: "5px 16px 5px 6px",
            marginBottom: 22,
          }}>
            <span style={{
              background: "linear-gradient(135deg,#ff6b35,#e84393)",
              borderRadius: "50%", width: 28, height: 28,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>🇮🇩</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#ff6b35" }}>
              Hyper-Local AI for Indonesia
            </span>
          </span>

          {/* headline */}
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(34px, 7vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: "0 0 14px",
            color: "#fff",
          }}>
            Caption & Hashtag
            <br />
            <span style={{
              background: "linear-gradient(135deg, #ff6b35 0%, #e84393 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>yang Beneran Work</span>
          </h1>

          {/* sub */}
          <p style={{
            color: "#777", fontSize: 16, margin: "0 auto 36px",
            maxWidth: 440, lineHeight: 1.6,
          }}>
            Solusi caption & hashtag lokal untuk UMKM Indonesia.
            Pakai slang daerah, emoji viral, dan strategi hashtag yang tepat sasaran. 🔥
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/caption" style={{
              textDecoration: "none",
              background: "linear-gradient(135deg, #ff6b35, #e84393)",
              color: "#fff",
              borderRadius: 14,
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "inherit",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 20px rgba(255,107,53,0.35)",
            }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,107,53,0.5)";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,107,53,0.35)";
                }
              }}
            >
              ✍️ Coba Caption AI
            </Link>
            <Link href="/hashtag" style={{
              textDecoration: "none",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
              borderRadius: 14,
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "inherit",
              transition: "background 0.2s",
            }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }
              }}
            >
              🔍 Riset Hashtag
            </Link>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 10,
          marginTop: 56,
          animation: "fadeUp 0.6s ease 0.15s both",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "18px 10px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: "#ff6b35", fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#666", fontSize: 11, marginTop: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Two big feature cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 16,
          marginTop: 44,
          animation: "fadeUp 0.55s ease 0.25s both",
        }}>
          {/* Caption card */}
          <Link href="/caption" style={{ textDecoration: "none" }}>
            <div style={{
              background: "linear-gradient(145deg, rgba(255,107,53,0.12) 0%, rgba(255,107,53,0.03) 100%)",
              border: "1px solid rgba(255,107,53,0.25)",
              borderRadius: 22,
              padding: "28px 22px",
              transition: "border-color 0.25s, transform 0.2s",
              cursor: "pointer",
            }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.55)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = "rgba(255,107,53,0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>✍️</div>
              <h3 style={{ color: "#fff", margin: "0 0 6px", fontSize: 18, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>
                Caption Generator
              </h3>
              <p style={{ color: "#888", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                Generate 5 varian caption pakai slang daerah & emoji lokal. Pilih platform & tone.
              </p>
              <div style={{ marginTop: 16, color: "#ff6b35", fontSize: 13, fontWeight: 600 }}>
                Mulai gratis → <span style={{ opacity: 0.6 }}>Rp 25k/bulan</span>
              </div>
            </div>
          </Link>

          {/* Hashtag card */}
          <Link href="/hashtag" style={{ textDecoration: "none" }}>
            <div style={{
              background: "linear-gradient(145deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.02) 100%)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 22,
              padding: "28px 22px",
              transition: "border-color 0.25s, transform 0.2s",
              cursor: "pointer",
            }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.55)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                if (!isMobile) {
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.25)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <h3 style={{ color: "#fff", margin: "0 0 6px", fontSize: 18, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>
                Hashtag Optimizer
              </h3>
              <p style={{ color: "#888", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                1 keyword → 30 hashtag segmented + 10 emoji viral + estimasi reach.
              </p>
              <div style={{ marginTop: 16, color: "#22c55e", fontSize: 13, fontWeight: 600 }}>
                Mulai gratis → <span style={{ opacity: 0.6 }}>Rp 15k/riset</span>
              </div>
            </div>
          </Link>
        </div>

        {/* ── Why section ── */}
        <div style={{ marginTop: 60, animation: "fadeUp 0.6s ease 0.35s both" }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            color: "#fff", fontSize: 22, fontWeight: 800,
            margin: "0 0 6px", textAlign: "center",
          }}>
            Kenapa TagTemanin?
          </h2>
          <p style={{ color: "#555", fontSize: 14, textAlign: "center", margin: "0 0 24px" }}>
            Dibuat khusus untuk marketer & UMKM Indonesia
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 12,
          }}>
            {WHY.map((w, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "18px 18px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{w.icon}</span>
                <div>
                  <h4 style={{ color: "#fff", margin: "0 0 4px", fontSize: 14, fontWeight: 700 }}>{w.title}</h4>
                  <p style={{ color: "#666", fontSize: 12, margin: 0, lineHeight: 1.5 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pricing CTA ── */}
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <button
            onClick={() => setPricingOpen(true)}
            style={{
              background: "rgba(255,107,53,0.1)",
              border: "1px solid rgba(255,107,53,0.3)",
              color: "#ff6b35",
              borderRadius: 14,
              padding: "13px 30px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              animation: "pulse 2.8s infinite",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = "rgba(255,107,53,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = "rgba(255,107,53,0.1)";
              }
            }}
          >
            💰 Lihat Semua Paket Pricing
          </button>
        </div>

        {/* footer */}
        <p style={{ textAlign: "center", color: "#333", fontSize: 11, marginTop: 48 }}>
          © 2025 TagTemanin — Hyper-Local AI Toolbox for UMKM Indonesia
        </p>
      </main>

      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </>
  );
}