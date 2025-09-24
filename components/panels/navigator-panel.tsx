"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

export function NavigatorPanel() {
  const [zoom, setZoom] = useState([100])

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">Navigator</div>
        <div className="aspect-video bg-muted rounded border relative overflow-hidden">
          <div className="absolute inset-2 bg-background border border-primary/50 rounded">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-primary bg-primary/20 rounded" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Zoom</span>
          <span className="text-xs text-muted-foreground">{zoom[0]}%</span>
        </div>
        <Slider value={zoom} onValueChange={setZoom} max={800} min={25} step={25} className="w-full" />
      </div>

      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-8 flex-1">
          <ZoomOut className="h-4 w-4 mr-1" />
          Fit
        </Button>
        <Button variant="ghost" size="sm" className="h-8 flex-1">
          <ZoomIn className="h-4 w-4 mr-1" />
          100%
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
