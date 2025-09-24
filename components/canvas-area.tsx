"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"

interface CanvasAreaProps {
  selectedTool: string
}

export function CanvasArea({ selectedTool }: CanvasAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Set default styles
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== "brush") return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setLastPosition({ x, y })
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedTool !== "brush") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(x, y)
    ctx.stroke()

    setLastPosition({ x, y })
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-muted/20 p-8">
      <div className="bg-white border-2 border-border shadow-lg rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  )
}
