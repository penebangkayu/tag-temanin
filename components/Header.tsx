'use client'

import Link from 'next/link'
import { Github, Home, Code } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-row gap-4 md:top-1/2 md:left-4 md:translate-x-0 md:-translate-y-1/2 md:flex-col">
      {/* Home Button */}
      <Link href="/" className="group relative">
        <Home size={24} className="text-[#9a9a9a] hover:text-[#ffffff] transition-colors" />
        {/* Tooltip */}
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap md:block hidden">
          Home
        </span>
      </Link>

      {/* Developer Button */}
      <Link href="/developer" className="group relative">
        <Code size={24} className="text-[#9a9a9a] hover:text-[#ffffff] transition-colors" />
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap md:block hidden">
          Developer
        </span>
      </Link>

      {/* Github Button */}
      <a
        href="https://github.com/penebangkayu/tag-temanin.git"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <Github size={24} className="text-[#9a9a9a] hover:text-[#ffffff] transition-colors" />
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap md:block hidden">
          GitHub
        </span>
      </a>
    </header>
  )
}