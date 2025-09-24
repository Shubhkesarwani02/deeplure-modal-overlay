"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Eye, EyeOff, Lock, Unlock, Plus, Trash2 } from "lucide-react"

interface Layer {
  id: string
  name: string
  visible: boolean
  locked: boolean
  opacity: number
  blendMode: string
}

export function LayersPanel() {
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", name: "Background", visible: true, locked: true, opacity: 100, blendMode: "Normal" },
    { id: "2", name: "Layer 1", visible: true, locked: false, opacity: 100, blendMode: "Normal" },
    { id: "3", name: "Layer 2", visible: true, locked: false, opacity: 85, blendMode: "Multiply" },
    { id: "4", name: "Text Layer", visible: false, locked: false, opacity: 100, blendMode: "Normal" },
  ])
  const [selectedLayer, setSelectedLayer] = useState("2")

  const toggleVisibility = (id: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)))
  }

  const toggleLock = (id: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, locked: !layer.locked } : layer)))
  }

  const updateOpacity = (id: string, opacity: number[]) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, opacity: opacity[0] } : layer)))
  }

  return (
    <div className="w-72 space-y-3">
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2">
          <Plus className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {layers
          .slice()
          .reverse()
          .map((layer) => (
            <div
              key={layer.id}
              className={`p-2 rounded border cursor-pointer transition-colors ${
                selectedLayer === layer.id ? "bg-primary/20 border-primary" : "bg-card border-border hover:bg-muted/50"
              }`}
              onClick={() => setSelectedLayer(layer.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 w-5 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleVisibility(layer.id)
                  }}
                >
                  {layer.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 w-5 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLock(layer.id)
                  }}
                >
                  {layer.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                </Button>
                <span className="text-sm flex-1 truncate">{layer.name}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-12">Opacity:</span>
                  <Slider
                    value={[layer.opacity]}
                    onValueChange={(value) => updateOpacity(layer.id, value)}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-8 text-right">{layer.opacity}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-12">Blend:</span>
                  <select className="flex-1 bg-background border border-border rounded px-1 py-0.5 text-xs">
                    <option>Normal</option>
                    <option>Multiply</option>
                    <option>Screen</option>
                    <option>Overlay</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
