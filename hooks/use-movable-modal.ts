"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"

export interface Position {
  x: number
  y: number
}

export interface ModalInstance {
  id: string
  title: string
  position: Position
  zIndex: number
  isMinimized: boolean
}

export interface UseMovableModalProps {
  id: string
  initialPosition?: Position
  constrainToViewport?: boolean
  onPositionChange?: (position: Position) => void
  onClose?: () => void
}

export function useMovableModal({
  id,
  initialPosition = { x: 100, y: 100 },
  constrainToViewport = true,
  onPositionChange,
  onClose,
}: UseMovableModalProps) {
  const [position, setPosition] = useState<Position>(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [zIndex, setZIndex] = useState(1000)

  const modalRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null)

  const constrainPosition = useCallback(
    (pos: Position): Position => {
      if (!constrainToViewport || !modalRef.current) return pos

      const modal = modalRef.current
      const rect = modal.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const constrainedX = Math.max(0, Math.min(pos.x, viewportWidth - rect.width))
      const constrainedY = Math.max(0, Math.min(pos.y, viewportHeight - rect.height))

      return { x: constrainedX, y: constrainedY }
    },
    [constrainToViewport],
  )

  const updatePosition = useCallback(
    (newPosition: Position) => {
      const constrainedPosition = constrainPosition(newPosition)
      setPosition(constrainedPosition)
      onPositionChange?.(constrainedPosition)
    },
    [constrainPosition, onPositionChange],
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!modalRef.current) return

    const rect = modalRef.current.getBoundingClientRect()
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    setIsDragging(true)
    setZIndex((prev) => prev + 1)

    // Prevent text selection during drag
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragOffsetRef.current) return

      const newPosition = {
        x: e.clientX - dragOffsetRef.current.x,
        y: e.clientY - dragOffsetRef.current.y,
      }

      updatePosition(newPosition)
    },
    [isDragging, updatePosition],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    dragStartRef.current = null
    dragOffsetRef.current = null
  }, [])

  // Touch support for mobile devices
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!modalRef.current || e.touches.length !== 1) return

    const touch = e.touches[0]
    const rect = modalRef.current.getBoundingClientRect()

    dragStartRef.current = { x: touch.clientX, y: touch.clientY }
    dragOffsetRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }

    setIsDragging(true)
    setZIndex((prev) => prev + 1)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !dragOffsetRef.current || e.touches.length !== 1) return

      const touch = e.touches[0]
      const newPosition = {
        x: touch.clientX - dragOffsetRef.current.x,
        y: touch.clientY - dragOffsetRef.current.y,
      }

      updatePosition(newPosition)
      e.preventDefault() // Prevent scrolling
    },
    [isDragging, updatePosition],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    dragStartRef.current = null
    dragOffsetRef.current = null
  }, [])

  // Global event listeners for drag operations
  useEffect(() => {
    if (isDragging) {
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
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  // Handle window resize to keep modal in bounds
  useEffect(() => {
    const handleResize = () => {
      updatePosition(position)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [position, updatePosition])

  const minimize = useCallback(() => {
    setIsMinimized(true)
  }, [])

  const restore = useCallback(() => {
    setIsMinimized(false)
  }, [])

  const close = useCallback(() => {
    onClose?.()
  }, [onClose])

  const bringToFront = useCallback(() => {
    setZIndex((prev) => prev + 1)
  }, [])

  return {
    modalRef,
    position,
    isDragging,
    isMinimized,
    zIndex,
    handleMouseDown,
    handleTouchStart,
    minimize,
    restore,
    close,
    bringToFront,
    updatePosition,
  }
}
