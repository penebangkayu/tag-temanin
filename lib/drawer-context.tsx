'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface DrawerContextType {
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  hasResults: boolean
  setHasResults: (has: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [hasResults, setHasResults] = useState(false)

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen, hasResults, setHasResults }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function useDrawer() {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawer must be used within DrawerProvider')
  }
  return context
}