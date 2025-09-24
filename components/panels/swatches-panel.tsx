"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

const defaultSwatches = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#800080",
  "#008080",
  "#C0C0C0",
  "#808080",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
]

export function SwatchesPanel() {
  const [swatches, setSwatches] = useState(defaultSwatches)
  const [selectedSwatch, setSelectedSwatch] = useState(swatches[0])

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Swatches</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1">
        {swatches.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded border-2 transition-all ${
              selectedSwatch === color ? "border-primary scale-110" : "border-border hover:border-muted-foreground"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedSwatch(color)}
            title={color}
          />
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Selected Color</div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded border border-border" style={{ backgroundColor: selectedSwatch }} />
          <span className="text-sm font-mono">{selectedSwatch}</span>
        </div>
      </div>
    </div>
  )
}
