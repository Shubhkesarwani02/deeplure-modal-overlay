"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { MovableModal, type MovableModalProps } from "./movable-modal"

interface ModalConfig extends Omit<MovableModalProps, "isOpen" | "onClose" | "children"> {
  content: ReactNode
  panelType?: string // Added panel type for grouping
}

interface ModalManagerContextType {
  openModal: (config: ModalConfig) => void
  openNewInstance: (config: ModalConfig) => void // Added method for new instances
  closeModal: (id: string) => void
  closeAllModals: () => void
  closeAllOfType: (panelType: string) => void // Added method to close all of a type
  isModalOpen: (id: string) => boolean
  getOpenModals: () => string[]
  getModalsByType: (panelType: string) => string[] // Added method to get modals by type
  bringToFront: (id: string) => void // Added bring to front functionality
}

const ModalManagerContext = createContext<ModalManagerContextType | null>(null)

export function useModalManager() {
  const context = useContext(ModalManagerContext)
  if (!context) {
    throw new Error("useModalManager must be used within a ModalManagerProvider")
  }
  return context
}

interface ModalManagerProviderProps {
  children: ReactNode
}

export function ModalManagerProvider({ children }: ModalManagerProviderProps) {
  const [modals, setModals] = useState<Map<string, ModalConfig>>(new Map())
  const [zIndexCounter, setZIndexCounter] = useState(1000) // Added z-index counter for stacking

  const computeSafeInitial = (cfg: ModalConfig) => {
    if (typeof window === 'undefined') {
      return cfg.initialPosition ?? { x: 100, y: 100 }
    }
    const vw = window.innerWidth
    const vh = window.innerHeight
    const margin = 8
    const w = Math.min(Math.max(cfg.width ?? 400, cfg.minWidth ?? 300), (cfg.maxWidth ?? (vw - margin * 2)))
    const h = Math.min(Math.max(cfg.height ?? 300, cfg.minHeight ?? 200), (cfg.maxHeight ?? (vh - margin * 2)))
    const baseX = cfg.initialPosition?.x ?? 100
    const baseY = cfg.initialPosition?.y ?? 100
    const jitterX = Math.round(Math.random() * 80 - 40)
    const jitterY = Math.round(Math.random() * 80 - 40)
    const x = Math.max(margin, Math.min(baseX + jitterX, vw - w - margin))
    const y = Math.max(margin, Math.min(baseY + jitterY, vh - h - margin))
    return { x, y }
  }

  const openModal = useCallback((config: ModalConfig) => {
    // Check if modal of this type already exists
    const existingModalId = Array.from(modals.keys()).find(id => 
      id.startsWith(config.id) || id === config.id
    )
    
    if (existingModalId) {
      // If it exists, bring it to front
      setZIndexCounter((prev) => prev + 1)
    } else {
      // If it doesn't exist, create new instance
      const timestamp = Date.now()
      const instanceId = config.id.includes('-') ? config.id : `${config.id}-${timestamp}`
      const instanceConfig = {
        ...config,
        id: instanceId,
        title: config.title,
        // Safe, jittered within viewport
        initialPosition: computeSafeInitial(config),
      }
      setModals((prev) => new Map(prev).set(instanceId, instanceConfig))
      setZIndexCounter((prev) => prev + 1)
    }
  }, [modals])

  const openNewInstance = useCallback(
    (config: ModalConfig) => {
      const timestamp = Date.now()
      const instanceId = `${config.id}-${timestamp}`
      const instanceConfig = {
        ...config,
        id: instanceId,
        title: `${config.title} ${Array.from(modals.keys()).filter((id) => id.startsWith(config.id)).length + 1}`,
        // Safe, jittered within viewport
        initialPosition: computeSafeInitial(config),
      }
      setModals((prev) => new Map(prev).set(instanceId, instanceConfig))
      setZIndexCounter((prev) => prev + 1)
    },
    [modals],
  )

  const closeModal = useCallback((id: string) => {
    setModals((prev) => {
      const newModals = new Map(prev)
      newModals.delete(id)
      return newModals
    })
  }, [])

  const closeAllModals = useCallback(() => {
    setModals(new Map())
  }, [])

  const closeAllOfType = useCallback((panelType: string) => {
    setModals((prev) => {
      const newModals = new Map()
      for (const [id, config] of prev.entries()) {
        if (config.panelType !== panelType) {
          newModals.set(id, config)
        }
      }
      return newModals
    })
  }, [])

  const isModalOpen = useCallback(
    (id: string) => {
      return modals.has(id)
    },
    [modals],
  )

  const getOpenModals = useCallback(() => {
    return Array.from(modals.keys())
  }, [modals])

  const getModalsByType = useCallback(
    (panelType: string) => {
      return Array.from(modals.entries())
        .filter(([_, config]) => config.panelType === panelType)
        .map(([id, _]) => id)
    },
    [modals],
  )

  const bringToFront = useCallback((id: string) => {
    setZIndexCounter((prev) => prev + 1)
  }, [])

  const contextValue: ModalManagerContextType = {
    openModal,
    openNewInstance,
    closeModal,
    closeAllModals,
    closeAllOfType,
    isModalOpen,
    getOpenModals,
    getModalsByType,
    bringToFront,
  }

  return (
    <ModalManagerContext.Provider value={contextValue}>
      {children}
      {Array.from(modals.entries()).map(([id, config]) => (
        <MovableModal
          key={id}
          {...config}
          isOpen={true}
          onClose={() => closeModal(id)}
        >
          {config.content}
        </MovableModal>
      ))}
    </ModalManagerContext.Provider>
  )
}
