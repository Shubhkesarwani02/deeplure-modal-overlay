"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function PropertiesPanel() {
  const [transform, setTransform] = useState({
    x: 120,
    y: 80,
    width: 400,
    height: 300,
    rotation: 0
  })

  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    opacity: 100
  })

  const [blendMode, setBlendMode] = useState("normal")
  const [lockAspectRatio, setLockAspectRatio] = useState(false)

  const blendModes = [
    "normal", "multiply", "screen", "overlay", "soft-light", "hard-light",
    "color-dodge", "color-burn", "darken", "lighten", "difference", "exclusion"
  ]

  const updateTransform = (key: string, value: number) => {
    setTransform(prev => {
      if (lockAspectRatio && (key === 'width' || key === 'height')) {
        const aspectRatio = prev.width / prev.height
        if (key === 'width') {
          return { ...prev, width: value, height: Math.round(value / aspectRatio) }
        } else {
          return { ...prev, height: value, width: Math.round(value * aspectRatio) }
        }
      }
      return { ...prev, [key]: value }
    })
  }

  return (
    <div className="w-72 space-y-4 text-white p-1">
      {/* Transform Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white border-b border-gray-600 pb-1">Transform</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-gray-400">X</Label>
            <Input
              type="number"
              value={transform.x}
              onChange={(e) => updateTransform('x', parseInt(e.target.value) || 0)}
              className="mt-1 h-8 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-400">Y</Label>
            <Input
              type="number"
              value={transform.y}
              onChange={(e) => updateTransform('y', parseInt(e.target.value) || 0)}
              className="mt-1 h-8 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Label className="text-xs text-gray-400">W</Label>
              {lockAspectRatio && <span className="text-xs text-blue-400">🔗</span>}
            </div>
            <Input
              type="number"
              value={transform.width}
              onChange={(e) => updateTransform('width', parseInt(e.target.value) || 0)}
              className="mt-1 h-8 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-400">H</Label>
            <Input
              type="number"
              value={transform.height}
              onChange={(e) => updateTransform('height', parseInt(e.target.value) || 0)}
              className="mt-1 h-8 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={lockAspectRatio}
            onCheckedChange={setLockAspectRatio}
          />
          <Label className="text-xs text-gray-400">Lock Aspect Ratio</Label>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-xs text-gray-400">Rotation</Label>
            <span className="text-xs text-white">{transform.rotation}°</span>
          </div>
          <Slider
            value={[transform.rotation]}
            onValueChange={(value) => updateTransform('rotation', value[0])}
            min={-180}
            max={180}
            step={1}
          />
        </div>
      </div>

      <Separator className="bg-gray-600" />

      {/* Adjustments Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white border-b border-gray-600 pb-1">Adjustments</h3>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-xs text-gray-400">Brightness</Label>
            <span className="text-xs text-white">{adjustments.brightness}</span>
          </div>
          <Slider
            value={[adjustments.brightness]}
            onValueChange={(value) => setAdjustments(prev => ({ ...prev, brightness: value[0] }))}
            min={-100}
            max={100}
            step={1}
            className="brightness-slider"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-xs text-gray-400">Contrast</Label>
            <span className="text-xs text-white">{adjustments.contrast}</span>
          </div>
          <Slider
            value={[adjustments.contrast]}
            onValueChange={(value) => setAdjustments(prev => ({ ...prev, contrast: value[0] }))}
            min={-100}
            max={100}
            step={1}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-xs text-gray-400">Saturation</Label>
            <span className="text-xs text-white">{adjustments.saturation}</span>
          </div>
          <Slider
            value={[adjustments.saturation]}
            onValueChange={(value) => setAdjustments(prev => ({ ...prev, saturation: value[0] }))}
            min={-100}
            max={100}
            step={1}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-xs text-gray-400">Opacity</Label>
            <span className="text-xs text-white">{adjustments.opacity}%</span>
          </div>
          <Slider
            value={[adjustments.opacity]}
            onValueChange={(value) => setAdjustments(prev => ({ ...prev, opacity: value[0] }))}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>

      <Separator className="bg-gray-600" />

      {/* Blend Mode */}
      <div className="space-y-2">
        <Label className="text-xs text-gray-400">Blend Mode</Label>
        <Select value={blendMode} onValueChange={setBlendMode}>
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            {blendModes.map(mode => (
              <SelectItem key={mode} value={mode} className="text-white hover:bg-gray-600 capitalize">
                {mode.replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-gray-600" />

      {/* Filters Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-white border-b border-gray-600 pb-1">Filters</h3>
        
        <div>
          <Button 
            variant="outline" 
            className="w-full justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            Gaussian Blur
          </Button>
        </div>

        <div>
          <Button 
            variant="outline" 
            className="w-full justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            Sharpen
          </Button>
        </div>

        <div>
          <Button 
            variant="outline" 
            className="w-full justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            Add Noise
          </Button>
        </div>
      </div>

      <Separator className="bg-gray-600" />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          onClick={() => {
            setTransform({ x: 120, y: 80, width: 400, height: 300, rotation: 0 })
            setAdjustments({ brightness: 0, contrast: 0, saturation: 0, opacity: 100 })
          }}
        >
          Reset All
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          Auto Adjust
        </Button>
      </div>
    </div>
  )
}
