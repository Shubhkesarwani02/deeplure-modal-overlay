"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCcw, Home, Move } from "lucide-react"

export function NavigatorPanel() {
  const [zoom, setZoom] = useState([100])
  const [viewportPos, setViewportPos] = useState({ x: 50, y: 50 }) // Center position in percentage
  const [isDragging, setIsDragging] = useState(false)
  const navigatorRef = useRef<HTMLDivElement>(null)

  const handleNavigatorClick = (e: React.MouseEvent) => {
    if (!navigatorRef.current) return

    const rect = navigatorRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setViewportPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleNavigatorClick(e)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleNavigatorClick(e)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const presetZooms = [25, 50, 100, 200, 400, 800]

  return (
    <div className="p-4 space-y-4 text-white">
      <div className="space-y-2">
        <div className="text-sm font-medium text-white">Navigator</div>
        <div 
          ref={navigatorRef}
          className="aspect-video bg-gray-800 rounded border border-gray-600 relative overflow-hidden cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Canvas Preview */}
          <div className="absolute inset-2 bg-white rounded border border-gray-500">
            <div className="w-full h-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200" />
            {/* Sample content */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded opacity-70" />
            <div className="absolute top-12 right-6 w-6 h-12 bg-blue-500 rounded opacity-70" />
            <div className="absolute bottom-4 left-1/2 w-12 h-4 bg-green-500 rounded opacity-70 transform -translate-x-1/2" />
          </div>
          
          {/* Viewport indicator */}
          <div 
            className="absolute border-2 border-red-500 bg-red-500/10 rounded cursor-move"
            style={{
              left: `${viewportPos.x - 10}%`,
              top: `${viewportPos.y - 10}%`,
              width: `${Math.max(10, 100 / (zoom[0] / 100))}%`,
              height: `${Math.max(10, 100 / (zoom[0] / 100))}%`,
            }}
          />
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400">Zoom</span>
          <span className="text-xs text-white bg-gray-700 px-2 py-1 rounded">{zoom[0]}%</span>
        </div>
        
        <Slider 
          value={zoom} 
          onValueChange={setZoom} 
          max={800} 
          min={25} 
          step={25} 
          className="w-full" 
        />

        {/* Zoom Presets */}
        <div className="grid grid-cols-3 gap-1">
          {presetZooms.map((zoomLevel) => (
            <Button
              key={zoomLevel}
              variant="ghost"
              size="sm"
              className="h-7 text-xs bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300"
              onClick={() => setZoom([zoomLevel])}
            >
              {zoomLevel}%
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300"
          onClick={() => {
            setZoom([100])
            setViewportPos({ x: 50, y: 50 })
          }}
        >
          <Home className="h-3 w-3 mr-1" />
          Fit Screen
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300"
          onClick={() => setZoom([100])}
        >
          <ZoomIn className="h-3 w-3 mr-1" />
          100%
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300"
          onClick={() => setViewportPos({ x: 50, y: 50 })}
        >
          <Move className="h-3 w-3 mr-1" />
          Center
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Canvas Info */}
      <div className="text-xs text-gray-400 space-y-1 border-t border-gray-600 pt-2">
        <div>Document: 800 × 600 px</div>
        <div>Position: {Math.round(viewportPos.x)}%, {Math.round(viewportPos.y)}%</div>
        <div>View: {Math.round(800 * (zoom[0] / 100))} × {Math.round(600 * (zoom[0] / 100))} px</div>
      </div>
    </div>
  )
}
