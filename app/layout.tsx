import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TagTemanin — Hyper-Local AI Toolbox for UMKM Indonesia",
  description: "Generate caption & hashtag otomatis pakai slang daerah untuk UMKM Indonesia. Jogja, Makassar, Medan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: "'Outfit', sans-serif",
        background: "#0d0d1a",
        color: "#fff",
        minHeight: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}>
        {/* ── ambient background glows (fixed, behind everything) ── */}
        <div aria-hidden="true" style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-25%", left: "-8%",
            width: "55%", height: "55%",
            background: "radial-gradient(circle, rgba(255,107,53,0.13) 0%, transparent 70%)",
            filter: "blur(48px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-22%", right: "-12%",
            width: "50%", height: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.11) 0%, transparent 70%)",
            filter: "blur(56px)",
          }} />
          <div style={{
            position: "absolute", top: "45%", left: "35%",
            width: "28%", height: "28%",
            background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }} />
        </div>

        {/* ── content ── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>

        {/* ── global styles ── */}
        <style>{`
          * { box-sizing: border-box; }
          input::placeholder { color: #555; }
          select option { background: #1a1a2e; color: #fff; }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,53,0.4); }
            50%      { box-shadow: 0 0 0 10px rgba(255,107,53,0); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 3px; }
        `}</style>
      </body>
    </html>
  );
}