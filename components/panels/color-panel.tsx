"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HSB {
  h: number
  s: number
  b: number
}

interface RGB {
  r: number
  g: number
  b: number
}

export function ColorPanel() {
  const [selectedColor, setSelectedColor] = useState("#ff0000")
  const [rgb, setRgb] = useState<RGB>({ r: 255, g: 0, b: 0 })
  const [hsb, setHsb] = useState<HSB>({ h: 0, s: 100, b: 100 })
  const [hexInput, setHexInput] = useState("#ff0000")

  // Convert hex to RGB
  const hexToRgb = (hex: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
  }

  // Convert HSB to RGB
  const hsbToRgb = (h: number, s: number, b: number): RGB => {
    h /= 360
    s /= 100
    b /= 100
    
    const c = b * s
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
    const m = b - c
    
    let r1 = 0, g1 = 0, b1 = 0
    
    if (0 <= h && h < 1/6) {
      r1 = c; g1 = x; b1 = 0
    } else if (1/6 <= h && h < 1/3) {
      r1 = x; g1 = c; b1 = 0
    } else if (1/3 <= h && h < 1/2) {
      r1 = 0; g1 = c; b1 = x
    } else if (1/2 <= h && h < 2/3) {
      r1 = 0; g1 = x; b1 = c
    } else if (2/3 <= h && h < 5/6) {
      r1 = x; g1 = 0; b1 = c
    } else if (5/6 <= h && h < 1) {
      r1 = c; g1 = 0; b1 = x
    }
    
    return {
      r: Math.round((r1 + m) * 255),
      g: Math.round((g1 + m) * 255),
      b: Math.round((b1 + m) * 255),
    }
  }

  // Convert RGB to HSB
  const rgbToHsb = (r: number, g: number, b: number): HSB => {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    
    let h = 0
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta) % 6
      else if (max === g) h = (b - r) / delta + 2
      else h = (r - g) / delta + 4
    }
    h = Math.round(h * 60)
    if (h < 0) h += 360
    
    const s = max === 0 ? 0 : Math.round((delta / max) * 100)
    const brightness = Math.round(max * 100)
    
    return { h, s, b: brightness }
  }

  // Update all color representations when one changes
  useEffect(() => {
    const newRgb = hexToRgb(selectedColor)
    const newHsb = rgbToHsb(newRgb.r, newRgb.g, newRgb.b)
    setRgb(newRgb)
    setHsb(newHsb)
    setHexInput(selectedColor)
  }, [selectedColor])

  const updateFromHsb = (newHsb: HSB) => {
    setHsb(newHsb)
    const newRgb = hsbToRgb(newHsb.h, newHsb.s, newHsb.b)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setRgb(newRgb)
    setSelectedColor(newHex)
    setHexInput(newHex)
  }

  const updateFromRgb = (newRgb: RGB) => {
    setRgb(newRgb)
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    const newHsb = rgbToHsb(newRgb.r, newRgb.g, newRgb.b)
    setSelectedColor(newHex)
    setHexInput(newHex)
    setHsb(newHsb)
  }

  const presetColors = [
    "#000000", "#333333", "#666666", "#999999", "#cccccc", "#ffffff",
    "#ff0000", "#ff6600", "#ffff00", "#66ff00", "#00ff00", "#00ff66",
    "#00ffff", "#0066ff", "#0000ff", "#6600ff", "#ff00ff", "#ff0066",
    "#800000", "#804000", "#808000", "#408000", "#008000", "#008040",
    "#008080", "#004080", "#000080", "#400080", "#800080", "#800040",
  ]

  return (
    <div className="w-64 space-y-4 text-white">
      {/* Color Preview */}
      <div className="flex gap-3">
        <div
          className="w-16 h-16 border-2 border-gray-600 rounded cursor-pointer"
          style={{ backgroundColor: selectedColor }}
          title="Current Color"
        />
        <div className="flex-1 space-y-2">
          <div className="text-xs text-gray-400">Current Color</div>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full h-8 rounded border border-gray-600 bg-transparent cursor-pointer"
          />
        </div>
      </div>

      {/* Color Input Tabs */}
      <Tabs defaultValue="hsb" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-700">
          <TabsTrigger value="hsb" className="text-xs data-[state=active]:bg-gray-600">HSB</TabsTrigger>
          <TabsTrigger value="rgb" className="text-xs data-[state=active]:bg-gray-600">RGB</TabsTrigger>
          <TabsTrigger value="hex" className="text-xs data-[state=active]:bg-gray-600">HEX</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hsb" className="space-y-3 mt-3">
          <div>
            <label className="text-xs text-gray-400">Hue: {hsb.h}°</label>
            <Slider
              value={[hsb.h]}
              onValueChange={(value) => updateFromHsb({ ...hsb, h: value[0] })}
              max={360}
              step={1}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Saturation: {hsb.s}%</label>
            <Slider
              value={[hsb.s]}
              onValueChange={(value) => updateFromHsb({ ...hsb, s: value[0] })}
              max={100}
              step={1}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400">Brightness: {hsb.b}%</label>
            <Slider
              value={[hsb.b]}
              onValueChange={(value) => updateFromHsb({ ...hsb, b: value[0] })}
              max={100}
              step={1}
              className="mt-1"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="rgb" className="space-y-3 mt-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-400">R</label>
              <Input
                type="number"
                value={rgb.r}
                onChange={(e) => updateFromRgb({ ...rgb, r: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                min="0"
                max="255"
                className="mt-1 h-8 bg-gray-700 border-gray-600 text-white text-center"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">G</label>
              <Input
                type="number"
                value={rgb.g}
                onChange={(e) => updateFromRgb({ ...rgb, g: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                min="0"
                max="255"
                className="mt-1 h-8 bg-gray-700 border-gray-600 text-white text-center"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">B</label>
              <Input
                type="number"
                value={rgb.b}
                onChange={(e) => updateFromRgb({ ...rgb, b: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) })}
                min="0"
                max="255"
                className="mt-1 h-8 bg-gray-700 border-gray-600 text-white text-center"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="hex" className="mt-3">
          <div>
            <label className="text-xs text-gray-400">Hex Value</label>
            <Input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              onBlur={() => {
                if (/^#[0-9A-F]{6}$/i.test(hexInput)) {
                  setSelectedColor(hexInput)
                }
              }}
              className="mt-1 h-8 bg-gray-700 border-gray-600 text-white"
              placeholder="#ffffff"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Color Swatches */}
      <div>
        <div className="text-xs text-gray-400 mb-2">Color Swatches</div>
        <div className="grid grid-cols-6 gap-1">
          {presetColors.map((color, index) => (
            <Button
              key={index}
              className="w-8 h-8 p-0 rounded border-2 hover:scale-110 transition-transform"
              style={{ 
                backgroundColor: color,
                borderColor: selectedColor === color ? '#ffffff' : '#666666'
              }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
