"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ onPricingClick }: { onPricingClick?: () => void }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const links = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/caption", label: "Caption AI", icon: "✍️" },
    { href: "/hashtag", label: "Hashtag", icon: "🔍" },
  ];

  return (
    <>
      {/* Navbar Utama */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(13,13,26,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0 20px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
          onClick={() => setMenuOpen(false)}
        >
          <span style={{
            background: "linear-gradient(135deg, #ff6b35, #e84393)",
            borderRadius: 10,
            width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>🇮🇩</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff" }}>
            Tag<span style={{ color: "#ff6b35" }}>Temanin</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  color: pathname === l.href ? "#fff" : "#888",
                  background: pathname === l.href ? "rgba(255,107,53,0.15)" : "transparent",
                  border: pathname === l.href ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                {l.icon} {l.label}
              </Link>
            ))}

            <button
              onClick={onPricingClick}
              style={{
                marginLeft: 12,
                background: "linear-gradient(135deg, #ff6b35, #e84393)",
                border: "none",
                color: "#fff",
                borderRadius: 10,
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              💰 Pricing
            </button>
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 24,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 8,
              padding: 0,
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}
      </nav>

      {/* Overlay Menu Mobile */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed",
          top: 56,
          left: 0,
          right: 0,
          background: "rgba(13,13,26,0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 20px",
          zIndex: 49,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                color: pathname === l.href ? "#fff" : "#aaa",
                background: pathname === l.href ? "rgba(255,107,53,0.15)" : "transparent",
                border: pathname === l.href ? "1px solid rgba(255,107,53,0.3)" : "1px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
              onClick={() => setMenuOpen(false)}
            >
              <span style={{ fontSize: 18 }}>{l.icon}</span>
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onPricingClick?.();
            }}
            style={{
              background: "linear-gradient(135deg, #ff6b35, #e84393)",
              border: "none",
              color: "#fff",
              borderRadius: 10,
              padding: "10px 16px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              marginTop: 4,
            }}
          >
            💰 Lihat Pricing
          </button>
        </div>
      )}
    </>
  );
}