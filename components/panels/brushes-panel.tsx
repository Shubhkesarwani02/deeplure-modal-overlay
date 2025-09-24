"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const brushTypes = [
  { id: "round", name: "Round", preview: "●" },
  { id: "square", name: "Square", preview: "■" },
  { id: "soft", name: "Soft Round", preview: "◉" },
  { id: "texture", name: "Textured", preview: "◈" },
  { id: "scatter", name: "Scatter", preview: "⋯" },
  { id: "chalk", name: "Chalk", preview: "◐" },
  { id: "flat", name: "Flat", preview: "▬" },
  { id: "angle", name: "Angled", preview: "◢" },
  { id: "fan", name: "Fan", preview: "🎭" },
  { id: "detail", name: "Detail", preview: "•" },
  { id: "watercolor", name: "Watercolor", preview: "🎨" },
  { id: "oil", name: "Oil Paint", preview: "⚡" },
]

export function BrushesPanel() {
  const [selectedBrush, setSelectedBrush] = useState("round")
  const [size, setSize] = useState([20])
  const [hardness, setHardness] = useState([100])
  const [opacity, setOpacity] = useState([100])
  const [flow, setFlow] = useState([100])

  const presetSizes = [1, 3, 5, 9, 13, 17, 21, 35, 50, 100]

  return (
    <div className="w-64 space-y-4 text-white">
      {/* Current Brush Preview */}
      <div className="bg-gray-800 p-3 rounded border border-gray-600">
        <div className="text-xs text-gray-400 mb-2">Current Brush</div>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 border border-gray-600 rounded bg-gray-700 flex items-center justify-center text-2xl"
            title={brushTypes.find(b => b.id === selectedBrush)?.name}
          >
            {brushTypes.find(b => b.id === selectedBrush)?.preview}
          </div>
          <div>
            <div className="text-sm font-medium text-white">{brushTypes.find(b => b.id === selectedBrush)?.name}</div>
            <div className="text-xs text-gray-400">Size: {size[0]}px</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2 text-white">Brush Presets</div>
        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
          {brushTypes.map((brush) => (
            <Button
              key={brush.id}
              variant="ghost"
              className={cn(
                "h-16 flex flex-col items-center justify-center text-xs border border-gray-600 hover:border-blue-400",
                selectedBrush === brush.id 
                  ? "bg-blue-600 border-blue-400 text-white" 
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              )}
              onClick={() => setSelectedBrush(brush.id)}
            >
              <span className="text-lg mb-1">{brush.preview}</span>
              <span>{brush.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Size</label>
            <span className="text-white">{size[0]}px</span>
          </div>
          <Slider value={size} onValueChange={setSize} min={1} max={200} step={1} />
          {/* Size Presets */}
          <div className="grid grid-cols-5 gap-1 mt-2">
            {presetSizes.map((presetSize) => (
              <Button
                key={presetSize}
                variant="ghost"
                size="sm"
                className="h-6 px-1 text-xs bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300"
                onClick={() => setSize([presetSize])}
              >
                {presetSize}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Hardness</label>
            <span className="text-white">{hardness[0]}%</span>
          </div>
          <Slider value={hardness} onValueChange={setHardness} max={100} step={1} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Opacity</label>
            <span className="text-white">{opacity[0]}%</span>
          </div>
          <Slider value={opacity} onValueChange={setOpacity} max={100} step={1} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Flow</label>
            <span className="text-white">{flow[0]}%</span>
          </div>
          <Slider value={flow} onValueChange={setFlow} max={100} step={1} />
        </div>
      </div>

      <div className="pt-2 border-t border-gray-600">
        <div className="text-sm font-medium mb-2 text-white">Brush Dynamics</div>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            Shape Dynamics
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            Scattering
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            Texture
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
            Dual Brush
          </label>
        </div>
      </div>
    </div>
  )
}
