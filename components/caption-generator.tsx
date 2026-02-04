'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader, Copy, Check, Settings, X, RotateCcw } from 'lucide-react'
import { useDrawer } from '@/lib/drawer-context'

const PLATFORMS = ['Instagram', 'TikTok', 'Facebook']
const REGIONS = ['Jogja', 'Makassar', 'Medan']
const TONES = ['Humoris', 'Religi', 'Gen-Z']

export default function CaptionGenerator() {
  const [keyword, setKeyword] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [region, setRegion] = useState('Jogja')
  const [tone, setTone] = useState('Humoris')
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { isDrawerOpen, setIsDrawerOpen, setHasResults } = useDrawer()

  const handleGenerate = async () => {
    if (!keyword.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, platform, region, tone }),
      })
      const data = await res.json()
      if (data.captions) {
        setCaptions(data.captions)
        setHasResults(true)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleReset = () => {
    setCaptions([])
    setKeyword('')
    setHasResults(false)
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Results Section */}
      <AnimatePresence>
        {captions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-y-auto pb-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-white font-medium text-lg">Caption yang Dihasilkan</h2>
              <button
                onClick={handleReset}
                className="text-sm text-[#9a9a9a] hover:text-white flex items-center gap-1 px-2 py-1 rounded transition-colors"
                title="Buat caption baru"
              >
                <RotateCcw size={16} />
                <span className="hidden sm:inline">Buat Baru</span>
              </button>
            </div>

            {captions.map((caption, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative p-4 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] hover:border-[#9a9a9a] transition-all"
              >
                <p className="text-white whitespace-pre-line">{caption}</p>
                <button
                  onClick={() => copyToClipboard(caption, idx)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#3a3a3a] transition-colors opacity-0 group-hover:opacity-100"
                  title="Salin caption"
                >
                  {copiedIndex === idx ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-slate-400" />
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#9a9a9a]">
            💬 Caption Anda akan muncul di sini
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
          <textarea
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Deskripsikan produk atau ide konten Anda..."
            className="w-full px-4 py-3 pr-28 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] text-white placeholder-[#9a9a9a] focus:outline-none focus:ring-2 focus:ring-[#3a3a3a] focus:border-transparent resize-none h-30 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleGenerate()
              }
            }}
          />

          {/* Tombol-tombol di kanan bawah textarea — sedikit naik */}
          <div className="absolute bottom-4 right-3 flex items-center gap-2">
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
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                !keyword.trim() || loading
                  ? 'bg-[#9a9a9a] text-[#1a1a1a] cursor-not-allowed'
                  : 'bg-white text-[#1a1a1a] hover:bg-[#3a3a3a] hover:text-white'
              }`}
              title="Generate caption"
            >
              {loading ? <Loader size={16} className="animate-spin" /> : 'Generate'}
            </button>
          </div>

          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-blue-500/10 to-purple-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <p className="text-xs text-[#9a9a9a] mt-2">
          Tekan <kbd className="px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-white">Enter</kbd> untuk generate •{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-[#2a2a2a] border border-[#3a3a3a] text-white">Shift + Enter</kbd> untuk baris baru
        </p>
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
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Platform</label>
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

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Regional</label>
                <div className="space-y-1.5">
                  {REGIONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                        region === r
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                          : 'bg-[#2a2a2a] text-slate-300 hover:bg-[#333333] border border-transparent'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gaya Bahasa</label>
                <div className="space-y-1.5">
                  {TONES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                        tone === t
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/10'
                          : 'bg-[#2a2a2a] text-slate-300 hover:bg-[#333333] border border-transparent'
                      }`}
                    >
                      {t}
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