"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

const brushTypes = [
  { id: "round", name: "Round", preview: "●" },
  { id: "square", name: "Square", preview: "■" },
  { id: "soft", name: "Soft Round", preview: "◉" },
  { id: "texture", name: "Textured", preview: "◈" },
  { id: "scatter", name: "Scatter", preview: "⋯" },
  { id: "chalk", name: "Chalk", preview: "◐" },
]

export function BrushesPanel() {
  const [selectedBrush, setSelectedBrush] = useState("round")
  const [size, setSize] = useState([20])
  const [hardness, setHardness] = useState([100])
  const [opacity, setOpacity] = useState([100])
  const [flow, setFlow] = useState([100])

  return (
    <div className="w-64 space-y-4">
      <div>
        <div className="text-sm font-medium mb-2">Brush Presets</div>
        <div className="grid grid-cols-3 gap-2">
          {brushTypes.map((brush) => (
            <Button
              key={brush.id}
              variant={selectedBrush === brush.id ? "default" : "outline"}
              className="h-12 flex flex-col items-center justify-center text-xs"
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
            <label>Size</label>
            <span>{size[0]}px</span>
          </div>
          <Slider value={size} onValueChange={setSize} min={1} max={200} step={1} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <label>Hardness</label>
            <span>{hardness[0]}%</span>
          </div>
          <Slider value={hardness} onValueChange={setHardness} max={100} step={1} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <label>Opacity</label>
            <span>{opacity[0]}%</span>
          </div>
          <Slider value={opacity} onValueChange={setOpacity} max={100} step={1} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <label>Flow</label>
            <span>{flow[0]}%</span>
          </div>
          <Slider value={flow} onValueChange={setFlow} max={100} step={1} />
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <div className="text-sm font-medium mb-2">Brush Dynamics</div>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Shape Dynamics
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Scattering
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Texture
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            Dual Brush
          </label>
        </div>
      </div>
    </div>
  )
}
