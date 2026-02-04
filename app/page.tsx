'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import CaptionGenerator from '@/components/caption-generator'
import HashtagGenerator from '@/components/hashtag-generator'
import { DrawerProvider, useDrawer } from '@/lib/drawer-context'

function HomeContent() {
  const [activeTab, setActiveTab] = useState<'caption' | 'hashtag'>('caption')
  const { isDrawerOpen, hasResults } = useDrawer()

  return (
    <motion.div
      animate={{
        marginRight: isDrawerOpen ? '320px' : '0px',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-start px-4 py-8 bg-[#121212] relative"
    >
      {/* Header - Only shown when no results */}
      {!hasResults && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 pt-20"
        >
          <Sparkles size={16} className="text-white mx-auto mb-2" />
          <h1 className="text-4xl sm:text-5xl font-normal text-white mb-3 text-balance">
            Tag Temanin
          </h1>
          <p className="text-[#9a9a9a] text-lg text-balance max-w-2xl">
            Buat caption menarik dan hashtag strategis untuk Instagram, TikTok, dan Facebook dalam hitungan detik
          </p>
        </motion.div>
      )}

      {/* Tabs - Only shown when no results */}
      {!hasResults && (
        <motion.div
          initial={{ opacity: 1 }}
          className="flex gap-2 mb-6 bg-[#1a1a1a] p-1 rounded-lg"
        >
          <button
            onClick={() => setActiveTab('caption')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'caption'
                ? 'bg-[#2a2a2a] text-white shadow-sm'
                : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            Caption
          </button>
          <button
            onClick={() => setActiveTab('hashtag')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === 'hashtag'
                ? 'bg-[#2a2a2a] text-white shadow-sm'
                : 'text-[#9a9a9a] hover:text-white'
            }`}
          >
            Hashtag
          </button>
        </motion.div>
      )}

      {/* Main Content Area */}
      <div className="w-full max-w-2xl flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 w-full"
          >
            {activeTab === 'caption' ? <CaptionGenerator /> : <HashtagGenerator />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <DrawerProvider>
      <HomeContent />
    </DrawerProvider>
  )
}