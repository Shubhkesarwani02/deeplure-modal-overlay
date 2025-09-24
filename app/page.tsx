"use client"

import { useState, useEffect } from "react"
import { ModalManagerProvider, useModalManager } from "@/components/modal-manager"
import { ToolPalette } from "@/components/tool-palette"
import { CanvasArea } from "@/components/canvas-area"
import { ColorPanel } from "@/components/panels/color-panel"
import { LayersPanel } from "@/components/panels/layers-panel"
import { BrushesPanel } from "@/components/panels/brushes-panel"
import { HistoryPanel } from "@/components/panels/history-panel"
import { PropertiesPanel } from "@/components/panels/properties-panel"
import { CharacterPanel } from "@/components/panels/character-panel"
import { ParagraphPanel } from "@/components/panels/paragraph-panel"
import { SwatchesPanel } from "@/components/panels/swatches-panel"
import { NavigatorPanel } from "@/components/panels/navigator-panel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Palette,
  Layers,
  Paintbrush,
  History,
  Settings,
  FileText,
  Save,
  FolderOpen,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Type,
  AlignLeft,
  Grid3X3,
  Navigation,
  Plus,
  X,
} from "lucide-react"

function ImageEditor() {
  const { openModal, openNewInstance, closeAllModals, closeAllOfType, getOpenModals, getModalsByType } =
    useModalManager()
  const [selectedTool, setSelectedTool] = useState("select")
  const [currentTime, setCurrentTime] = useState("")

  // Update time only on client side to avoid hydration mismatch
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    
    updateTime() // Set initial time
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Use a safe default for SSR, will be updated on client
  const getInitialX = (offset: number) => {
    if (typeof window !== 'undefined') {
      return window.innerWidth - offset
    }
    return 1200 - offset // Default fallback for SSR
  }

  const panelConfigs = [
    {
      id: "color",
      panelType: "color",
      title: "Color",
      content: <ColorPanel />,
      initialPosition: { x: getInitialX(300), y: 100 },
      width: 280,
      height: 400,
      icon: Palette,
    },
    {
      id: "layers",
      panelType: "layers",
      title: "Layers",
      content: <LayersPanel />,
      initialPosition: { x: getInitialX(320), y: 520 },
      width: 300,
      height: 350,
      icon: Layers,
    },
    {
      id: "brushes",
      panelType: "brushes",
      title: "Brushes",
      content: <BrushesPanel />,
      initialPosition: { x: 120, y: 100 },
      width: 280,
      height: 450,
      icon: Paintbrush,
    },
    {
      id: "history",
      panelType: "history",
      title: "History",
      content: <HistoryPanel />,
      initialPosition: { x: 120, y: 570 },
      width: 200,
      height: 300,
      icon: History,
    },
    {
      id: "properties",
      panelType: "properties",
      title: "Properties",
      content: <PropertiesPanel />,
      initialPosition: { x: 420, y: 100 },
      width: 280,
      height: 400,
      icon: Settings,
    },
    {
      id: "character",
      panelType: "character",
      title: "Character",
      content: <CharacterPanel />,
      initialPosition: { x: 720, y: 100 },
      width: 260,
      height: 380,
      icon: Type,
    },
    {
      id: "paragraph",
      panelType: "paragraph",
      title: "Paragraph",
      content: <ParagraphPanel />,
      initialPosition: { x: 720, y: 500 },
      width: 260,
      height: 320,
      icon: AlignLeft,
    },
    {
      id: "swatches",
      panelType: "swatches",
      title: "Swatches",
      content: <SwatchesPanel />,
      initialPosition: { x: 420, y: 520 },
      width: 280,
      height: 300,
      icon: Grid3X3,
    },
    {
      id: "navigator",
      panelType: "navigator",
      title: "Navigator",
      content: <NavigatorPanel />,
      initialPosition: { x: 120, y: 880 },
      width: 200,
      height: 250,
      icon: Navigation,
    },
  ]

  const openModals = getOpenModals()

  return (
    <div className="h-screen bg-[#1a1a1a] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#2b2b2b] border-b border-[#4a4a4a] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            <span className="font-semibold text-white">Photoshop-like Panel System</span>
          </div>

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 hover:text-white hover:bg-[#4a4a4a]">
              <FolderOpen className="w-4 h-4 mr-1" />
              Open
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 hover:text-white hover:bg-[#4a4a4a]">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>

          <div className="h-6 w-px bg-[#4a4a4a]" />

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 hover:text-white hover:bg-[#4a4a4a]">
              <Undo className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 hover:text-white hover:bg-[#4a4a4a]">
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <div className="h-6 w-px bg-[#4a4a4a]" />

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 hover:text-white hover:bg-[#4a4a4a]">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-300 px-2">100%</span>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-300 hover:text-white hover:bg-[#4a4a4a]">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">
            {openModals.length} panel{openModals.length !== 1 ? "s" : ""} open
          </span>
          {openModals.length > 0 && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={closeAllModals}
              className="border-[#4a4a4a] bg-[#383838] text-gray-300 hover:bg-[#4a4a4a] hover:text-white"
            >
              Close All Panels
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 flex relative">
        <ToolPalette selectedTool={selectedTool} onToolSelect={setSelectedTool} />

        <CanvasArea selectedTool={selectedTool} />

        <div className="absolute top-4 right-4 bg-[#2b2b2b] border border-[#4a4a4a] rounded-lg p-3 shadow-lg max-w-sm">
          <div className="text-xs text-gray-400 mb-3 px-1">Workspace Panels</div>
          <div className="grid grid-cols-3 gap-2">
            {panelConfigs.map((config) => {
              const Icon = config.icon
              const instanceCount = getModalsByType(config.panelType).length
              const hasInstances = instanceCount > 0

              return (
                <div key={config.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Button
                      variant={hasInstances ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 flex-shrink-0",
                        hasInstances
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "text-gray-300 hover:text-white hover:bg-[#4a4a4a]"
                      )}
                      onClick={() => openModal(config)}
                      title={`Open ${config.title}`}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 flex-shrink-0 text-gray-400 hover:text-white hover:bg-[#4a4a4a]"
                      onClick={() => openNewInstance(config)}
                      title={`New ${config.title} instance`}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    {instanceCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 flex-shrink-0 text-gray-400 hover:text-red-400 hover:bg-[#4a4a4a]"
                        onClick={() => closeAllOfType(config.panelType)}
                        title={`Close all ${config.title} panels`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-center text-gray-400 truncate">
                    {config.title}
                    {instanceCount > 0 && (
                      <span className="ml-1 bg-blue-600/20 text-blue-400 px-1 rounded text-xs">{instanceCount}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="h-6 bg-[#383838] border-t border-[#4a4a4a] flex items-center justify-between px-4 text-xs text-gray-300">
        <div className="flex items-center gap-4">
          <span>Tool: {selectedTool}</span>
          <span>Canvas: 800x600px</span>
          <span>RGB/8</span>
          <span>Zoom: 100%</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ready</span>
          {currentTime && <span>{currentTime}</span>}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <ModalManagerProvider>
      <ImageEditor />
    </ModalManagerProvider>
  )
}
