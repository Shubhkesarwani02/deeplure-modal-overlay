"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Lock, Unlock, Plus, Trash2, Copy, ChevronDown, ChevronRight } from "lucide-react"

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
    { id: "5", name: "Effects Layer", visible: true, locked: false, opacity: 75, blendMode: "Overlay" },
  ])
  const [selectedLayer, setSelectedLayer] = useState("2")

  const addLayer = () => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      name: `Layer ${layers.length}`,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: "Normal"
    }
    setLayers([...layers, newLayer])
    setSelectedLayer(newLayer.id)
  }

  const duplicateLayer = () => {
    const selectedLayerData = layers.find(layer => layer.id === selectedLayer)
    if (selectedLayerData) {
      const duplicatedLayer: Layer = {
        ...selectedLayerData,
        id: Date.now().toString(),
        name: `${selectedLayerData.name} copy`
      }
      const selectedIndex = layers.findIndex(layer => layer.id === selectedLayer)
      const newLayers = [...layers]
      newLayers.splice(selectedIndex + 1, 0, duplicatedLayer)
      setLayers(newLayers)
      setSelectedLayer(duplicatedLayer.id)
    }
  }

  const deleteLayer = () => {
    if (layers.length <= 1) return // Keep at least one layer
    const newLayers = layers.filter(layer => layer.id !== selectedLayer)
    setLayers(newLayers)
    setSelectedLayer(newLayers[0]?.id || "")
  }

  const toggleVisibility = (id: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)))
  }

  const toggleLock = (id: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, locked: !layer.locked } : layer)))
  }

  const updateOpacity = (id: string, opacity: number[]) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, opacity: opacity[0] } : layer)))
  }

  const updateBlendMode = (id: string, blendMode: string) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, blendMode } : layer)))
  }

  const blendModes = ["Normal", "Multiply", "Screen", "Overlay", "Soft Light", "Hard Light", "Color Dodge", "Color Burn", "Darken", "Lighten", "Difference", "Exclusion"]

  return (
    <div className="w-72 space-y-3 text-white">
      {/* Layer Controls */}
      <div className="flex gap-1">
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 px-2 bg-gray-700 hover:bg-gray-600 border border-gray-600"
          onClick={addLayer}
          title="Add new layer"
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 px-2 bg-gray-700 hover:bg-gray-600 border border-gray-600"
          onClick={duplicateLayer}
          title="Duplicate selected layer"
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-7 px-2 bg-gray-700 hover:bg-gray-600 border border-gray-600"
          onClick={deleteLayer}
          disabled={layers.length <= 1}
          title="Delete selected layer"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Blend Mode */}
      <div className="space-y-1">
        <label className="text-xs text-gray-400">Blend Mode</label>
        <Select 
          value={layers.find(l => l.id === selectedLayer)?.blendMode || "Normal"} 
          onValueChange={(value) => updateBlendMode(selectedLayer, value)}
        >
          <SelectTrigger className="h-7 bg-gray-700 border-gray-600 text-white text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {blendModes.map(mode => (
              <SelectItem key={mode} value={mode} className="text-white hover:bg-gray-600 text-xs">
                {mode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Layers List */}
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {layers
          .slice()
          .reverse()
          .map((layer, index) => (
            <div
              key={layer.id}
              className={`p-2 rounded border cursor-pointer transition-all ${
                selectedLayer === layer.id 
                  ? "bg-blue-600/30 border-blue-400" 
                  : "bg-gray-700 border-gray-600 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedLayer(layer.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 w-5 p-0 hover:bg-gray-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleVisibility(layer.id)
                  }}
                >
                  {layer.visible ? 
                    <Eye className="h-3 w-3 text-gray-300" /> : 
                    <EyeOff className="h-3 w-3 text-gray-500" />
                  }
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 w-5 p-0 hover:bg-gray-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLock(layer.id)
                  }}
                >
                  {layer.locked ? 
                    <Lock className="h-3 w-3 text-yellow-400" /> : 
                    <Unlock className="h-3 w-3 text-gray-300" />
                  }
                </Button>
                <span className="text-sm flex-1 truncate text-white">{layer.name}</span>
                <div className="text-xs text-gray-400">
                  {layers.length - index}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 w-12">Opacity:</span>
                  <Slider
                    value={[layer.opacity]}
                    onValueChange={(value) => updateOpacity(layer.id, value)}
                    max={100}
                    step={1}
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="w-8 text-right text-gray-300">{layer.opacity}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 w-12">Blend:</span>
                  <span className="flex-1 text-gray-300">{layer.blendMode}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Layer Info */}
      <div className="text-xs text-gray-400 border-t border-gray-600 pt-2">
        <div>Total Layers: {layers.length}</div>
        <div>Selected: {layers.find(l => l.id === selectedLayer)?.name || "None"}</div>
      </div>
    </div>
  )
}
