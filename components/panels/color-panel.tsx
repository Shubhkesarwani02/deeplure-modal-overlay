"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export function ColorPanel() {
  const [selectedColor, setSelectedColor] = useState("#ff0000")
  const [hue, setHue] = useState([0])
  const [saturation, setSaturation] = useState([100])
  const [brightness, setBrightness] = useState([100])

  const colors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#cccccc",
    "#ffffff",
    "#ff0000",
    "#ff6600",
    "#ffff00",
    "#66ff00",
    "#00ff00",
    "#00ff66",
    "#00ffff",
    "#0066ff",
    "#0000ff",
    "#6600ff",
    "#ff00ff",
    "#ff0066",
    "#800000",
    "#804000",
    "#808000",
    "#408000",
    "#008000",
    "#008040",
    "#008080",
    "#004080",
    "#000080",
    "#400080",
    "#800080",
    "#800040",
  ]

  return (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="w-12 h-12 border-2 border-border rounded" style={{ backgroundColor: selectedColor }} />
          <div className="flex-1">
            <div className="text-xs text-muted-foreground mb-1">Current Color</div>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-8 rounded border border-border"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground">Hue</label>
          <Slider value={hue} onValueChange={setHue} max={360} step={1} className="mt-1" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Saturation</label>
          <Slider value={saturation} onValueChange={setSaturation} max={100} step={1} className="mt-1" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Brightness</label>
          <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} className="mt-1" />
        </div>
      </div>

      <div>
        <div className="text-xs text-muted-foreground mb-2">Color Swatches</div>
        <div className="grid grid-cols-6 gap-1">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
