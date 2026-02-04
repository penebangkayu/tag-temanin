'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader, Copy, Check, Settings, X, RotateCcw } from 'lucide-react'
import { useDrawer } from '@/lib/drawer-context'

interface HashtagData {
  macro: string[]
  mid: string[]
  micro: string[]
  emoji: string[]
  reach: {
    macro: string
    mid: string
    micro: string
  }
}

const PLATFORMS = ['Instagram', 'TikTok', 'Facebook']

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [data, setData] = useState<HashtagData | null>(null)
  const [loading, setLoading] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const { isDrawerOpen, setIsDrawerOpen, setHasResults } = useDrawer()

  const handleGenerate = async () => {
    if (!keyword.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/hashtag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, platform }),
      })

      const result = await res.json()
      if (result.macro) {
        setData(result)
        setHasResults(true)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const copyAllHashtags = () => {
    if (!data) return
    const all = [...data.macro, ...data.mid, ...data.micro].join(' ')
    copyToClipboard(all)
  }

  const handleReset = () => {
    setData(null)
    setKeyword('')
    setHasResults(false)
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Results Section */}
      <AnimatePresence>
        {data ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto pb-4 space-y-6"
          >
            {/* Copy All Button */}
            <button
              onClick={copyAllHashtags}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-lg border border-[#3a3a3a] bg-transparent text-white hover:bg-[#2a2a2a] transition-colors"
            >
              <Copy size={16} />
              <span>
                {copiedText === [...data.macro, ...data.mid, ...data.micro].join(' ')
                  ? 'Semua Tersalin!'
                  : 'Salin Semua Hashtag'}
              </span>
            </button>

            {/* Reset Button */}
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="text-sm text-[#9a9a9a] hover:text-white flex items-center gap-1 px-2 py-1 rounded transition-colors"
                title="Buat hashtag baru"
              >
                <RotateCcw size={16} />
                <span className="hidden sm:inline">Buat Baru</span>
              </button>
            </div>

            {/* Macro Hashtags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  🔥 Hashtag Makro (Volume Tinggi)
                </h3>
                <p className="text-xs text-slate-400">Jangkauan: {data.reach.macro}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.macro.map((tag, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => copyToClipboard(tag)}
                    className="px-3 py-1 rounded-lg bg-[#2a2a2a] hover:bg-blue-900/30 text-slate-300 text-sm font-medium transition-all hover:text-blue-400 border border-[#3a3a3a]"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Mid-Tier Hashtags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  💎 Hashtag Menengah (Seimbang)
                </h3>
                <p className="text-xs text-slate-400">Jangkauan: {data.reach.mid}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.mid.map((tag, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.03 }}
                    onClick={() => copyToClipboard(tag)}
                    className="px-3 py-1 rounded-lg bg-[#2a2a2a] hover:bg-purple-900/30 text-slate-300 text-sm font-medium transition-all hover:text-purple-400 border border-[#3a3a3a]"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Micro Hashtags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  ⚡ Hashtag Mikro (Niche)
                </h3>
                <p className="text-xs text-slate-400">Jangkauan: {data.reach.micro}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.micro.map((tag, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.03 }}
                    onClick={() => copyToClipboard(tag)}
                    className="px-3 py-1 rounded-lg bg-[#2a2a2a] hover:bg-amber-900/30 text-slate-300 text-sm font-medium transition-all hover:text-amber-400 border border-[#3a3a3a]"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Viral Emojis */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  ✨ Emoji Trending
                </h3>
                <p className="text-xs text-slate-400">
                  Tingkatkan engagement dengan emoji yang sedang trending
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.emoji.map((emoji, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.03 }}
                    onClick={() => copyToClipboard(emoji)}
                    className="px-3 py-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-xl transition-all transform hover:scale-110 border border-[#3a3a3a]"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#9a9a9a]">
            🔍 Hashtag Anda akan muncul di sini
          </div>
        )}
      </AnimatePresence>

      {/* Input Section — Sticky Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky bottom-0 bg-[#121212] pt-2 pb-4"
      >
        <div className="relative group">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Masukkan kata kunci atau nama produk..."
            // padding kanan diperbesar untuk memberi ruang dua tombol
            className="w-full px-4 py-3 pr-32 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] text-white placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#3a3a3a] focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGenerate()
              }
            }}
          />

          {/* Tombol-tombol di dalam input — posisi bottom-4 */}
          <div className="absolute bottom-2 right-3 flex items-center gap-2">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className={`p-2 rounded-lg transition-all ${
                isDrawerOpen
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-[#1a1a1a] text-slate-400 hover:bg-[#3a3a3a] hover:text-white'
              }`}
              title="Pengaturan"
            >
              <Settings size={18} />
            </button>

            <button
              onClick={handleGenerate}
              disabled={!keyword.trim() || loading}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${
                !keyword.trim() || loading
                  ? 'bg-[#9a9a9a] text-[#1a1a1a] cursor-not-allowed'
                  : 'bg-white text-[#1a1a1a] hover:bg-[#3a3a3a] hover:text-white'
              }`}
              title="Riset Hashtag"
            >
              {loading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                'Riset Hashtag'
              )}
            </button>
          </div>

          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '320px', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen bg-[#1a1a1a] border-l border-[#2a2a2a] overflow-hidden z-50 shadow-2xl"
          >
            <div className="w-80 h-full overflow-y-auto p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
                <h2 className="text-lg font-semibold text-white">Pengaturan</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-slate-400 hover:text-white"
                  title="Tutup"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Platform
                </label>
                <div className="space-y-1.5">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                        platform === p
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                          : 'bg-[#2a2a2a] text-slate-300 hover:bg-[#333333] border border-transparent'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}