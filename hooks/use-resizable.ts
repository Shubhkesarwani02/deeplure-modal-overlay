"use client"

import { useState, useRef, useCallback, useEffect } from "react"

export interface Size {
  width: number
  height: number
}

export interface UseResizableProps {
  initialSize: Size
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  constrainToViewport?: boolean
  onSizeChange?: (size: Size) => void
}

export interface ResizeHandle {
  direction: 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'
  cursor: string
}

export const RESIZE_HANDLES: ResizeHandle[] = [
  { direction: 'n', cursor: 'n-resize' },
  { direction: 'ne', cursor: 'ne-resize' },
  { direction: 'e', cursor: 'e-resize' },
  { direction: 'se', cursor: 'se-resize' },
  { direction: 's', cursor: 's-resize' },
  { direction: 'sw', cursor: 'sw-resize' },
  { direction: 'w', cursor: 'w-resize' },
  { direction: 'nw', cursor: 'nw-resize' },
]

export function useResizable({
  initialSize,
  minWidth = 200,
  minHeight = 150,
  maxWidth,
  maxHeight,
  constrainToViewport = true,
  onSizeChange,
}: UseResizableProps) {
  const [size, setSize] = useState<Size>(initialSize)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>("")
  
  const elementRef = useRef<HTMLDivElement>(null)
  const startSizeRef = useRef<Size>({ width: 0, height: 0 })
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const constrainSize = useCallback(
    (newSize: Size): Size => {
      let { width, height } = newSize

      // Apply min/max constraints
      width = Math.max(minWidth, width)
      height = Math.max(minHeight, height)

      if (maxWidth) width = Math.min(maxWidth, width)
      if (maxHeight) height = Math.min(maxHeight, height)

      // Constrain to viewport if enabled
      if (constrainToViewport && elementRef.current && typeof window !== 'undefined') {
        const rect = elementRef.current.getBoundingClientRect()
        const maxViewportWidth = window.innerWidth - rect.left
        const maxViewportHeight = window.innerHeight - rect.top

        width = Math.min(width, maxViewportWidth)
        height = Math.min(height, maxViewportHeight)
      }

      return { width, height }
    },
    [minWidth, minHeight, maxWidth, maxHeight, constrainToViewport]
  )

  const updateSize = useCallback(
    (newSize: Size) => {
      const constrainedSize = constrainSize(newSize)
      setSize(constrainedSize)
      onSizeChange?.(constrainedSize)
    },
    [constrainSize, onSizeChange]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault()
      e.stopPropagation()

      setIsResizing(true)
      setResizeDirection(direction)
      startSizeRef.current = size
      startPosRef.current = { x: e.clientX, y: e.clientY }
    },
    [size]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return

      const deltaX = e.clientX - startPosRef.current.x
      const deltaY = e.clientY - startPosRef.current.y

      let newWidth = startSizeRef.current.width
      let newHeight = startSizeRef.current.height

      // Calculate new size based on resize direction
      if (resizeDirection.includes('e')) newWidth += deltaX
      if (resizeDirection.includes('w')) newWidth -= deltaX
      if (resizeDirection.includes('s')) newHeight += deltaY
      if (resizeDirection.includes('n')) newHeight -= deltaY

      updateSize({ width: newWidth, height: newHeight })
    },
    [isResizing, resizeDirection, updateSize]
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
    setResizeDirection("")
  }, [])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, direction: string) => {
      e.preventDefault()
      e.stopPropagation()

      if (e.touches.length !== 1) return

      const touch = e.touches[0]
      setIsResizing(true)
      setResizeDirection(direction)
      startSizeRef.current = size
      startPosRef.current = { x: touch.clientX, y: touch.clientY }
    },
    [size]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isResizing || !resizeDirection || e.touches.length !== 1) return

      e.preventDefault()

      const touch = e.touches[0]
      const deltaX = touch.clientX - startPosRef.current.x
      const deltaY = touch.clientY - startPosRef.current.y

      let newWidth = startSizeRef.current.width
      let newHeight = startSizeRef.current.height

      if (resizeDirection.includes('e')) newWidth += deltaX
      if (resizeDirection.includes('w')) newWidth -= deltaX
      if (resizeDirection.includes('s')) newHeight += deltaY
      if (resizeDirection.includes('n')) newHeight -= deltaY

      updateSize({ width: newWidth, height: newHeight })
    },
    [isResizing, resizeDirection, updateSize]
  )

  const handleTouchEnd = useCallback(() => {
    setIsResizing(false)
    setResizeDirection("")
  }, [])

  // Global event listeners for resize operations
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  return {
    elementRef,
    size,
    isResizing,
    resizeDirection,
    handleMouseDown,
    handleTouchStart,
    updateSize,
  }
}