"use client"

import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PropertiesPanel() {
  return (
    <div className="w-64 space-y-4">
      <div>
        <div className="text-sm font-medium mb-2">Transform</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-muted-foreground">X:</label>
            <Input className="h-6 text-xs" defaultValue="120" />
          </div>
          <div>
            <label className="text-muted-foreground">Y:</label>
            <Input className="h-6 text-xs" defaultValue="80" />
          </div>
          <div>
            <label className="text-muted-foreground">W:</label>
            <Input className="h-6 text-xs" defaultValue="400" />
          </div>
          <div>
            <label className="text-muted-foreground">H:</label>
            <Input className="h-6 text-xs" defaultValue="300" />
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Adjustments</div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Brightness</label>
              <span>0</span>
            </div>
            <Slider defaultValue={[0]} min={-100} max={100} step={1} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Contrast</label>
              <span>0</span>
            </div>
            <Slider defaultValue={[0]} min={-100} max={100} step={1} />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label>Saturation</label>
              <span>0</span>
            </div>
            <Slider defaultValue={[0]} min={-100} max={100} step={1} />
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Filters</div>
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
            Gaussian Blur
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
            Sharpen
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
            Noise Reduction
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7">
            Edge Detection
          </Button>
        </div>
      </div>
    </div>
  )
}
