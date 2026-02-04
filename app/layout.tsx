import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/Header'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Tag Temanin - AI Caption & Hashtag Generator',
  description: 'Generate engaging captions and strategic hashtags for Instagram, TikTok, and Facebook with AI. Open source content generation platform.',
  icons: {
    icon: [
      { url: '/tana-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/tana.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/tana-pwa.png',
  },
}

// Viewport export khusus Next.js 13+
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#121212]">
        <Header />

        <main className="min-h-screen">
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  )
}