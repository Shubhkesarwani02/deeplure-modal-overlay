"use client"

import { useState } from "react"
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

  const panelConfigs = [
    {
      id: "color",
      panelType: "color",
      title: "Color",
      content: <ColorPanel />,
      initialPosition: { x: window.innerWidth - 300, y: 100 },
      width: 280,
      height: 400,
      icon: Palette,
    },
    {
      id: "layers",
      panelType: "layers",
      title: "Layers",
      content: <LayersPanel />,
      initialPosition: { x: window.innerWidth - 320, y: 520 },
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Movable Modal System</span>
          </div>

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <FolderOpen className="w-4 h-4 mr-1" />
              Open
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <Undo className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-2">100%</span>
            <Button size="sm" variant="ghost" className="h-8 px-2">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {openModals.length} panel{openModals.length !== 1 ? "s" : ""} open
          </span>
          {openModals.length > 0 && (
            <Button size="sm" variant="outline" onClick={closeAllModals}>
              Close All Panels
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 flex relative">
        <ToolPalette selectedTool={selectedTool} onToolSelect={setSelectedTool} />

        <CanvasArea selectedTool={selectedTool} />

        <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg max-w-sm">
          <div className="text-xs text-muted-foreground mb-3 px-1">Workspace Panels</div>
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
                      className="h-8 w-8 p-0 flex-shrink-0"
                      onClick={() => openModal(config)}
                      title={`Open ${config.title}`}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 flex-shrink-0"
                      onClick={() => openNewInstance(config)}
                      title={`New ${config.title} instance`}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    {instanceCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => closeAllOfType(config.panelType)}
                        title={`Close all ${config.title} panels`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-center text-muted-foreground truncate">
                    {config.title}
                    {instanceCount > 0 && (
                      <span className="ml-1 bg-primary/20 text-primary px-1 rounded text-xs">{instanceCount}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="h-6 bg-muted/50 border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Tool: {selectedTool}</span>
          <span>Canvas: 800x600px</span>
          <span>RGB/8</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ready</span>
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
