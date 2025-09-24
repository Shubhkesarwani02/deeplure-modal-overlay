"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"

export interface Position {
  x: number
  y: number
}

export interface SnapTarget {
  x: number
  y: number
  type: 'edge' | 'panel' | 'grid'
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
  enableSnapping?: boolean
  snapThreshold?: number
  onPositionChange?: (position: Position) => void
  onClose?: () => void
}

export function useMovableModal({
  id,
  initialPosition = { x: 100, y: 100 },
  constrainToViewport = true,
  enableSnapping = true,
  snapThreshold = 20,
  onPositionChange,
  onClose,
}: UseMovableModalProps) {
  const [position, setPosition] = useState<Position>(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  // Global z-index counter to ensure proper stacking across multiple instances
  // Module-scoped so all hook instances share the same counter
  // Start at a safe base to sit above most app content
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const zIndexBaseRef = useRef<number>(0)
  const [zIndex, setZIndex] = useState<number>(() => {
    // Initialize on first render to the next highest z-index
    if (typeof window !== 'undefined') {
      // @ts-expect-error attach to window for cross-module safety if code reloads
      if (!window.__MOVABLE_MODAL_Z__) window.__MOVABLE_MODAL_Z__ = 1000
      // @ts-expect-error read/write shared counter
      window.__MOVABLE_MODAL_Z__ += 1
      // @ts-expect-error use current counter value
      return window.__MOVABLE_MODAL_Z__ as number
    }
    return 1001
  })
  const [snapTarget, setSnapTarget] = useState<SnapTarget | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null)

  const findSnapTargets = useCallback(
    (pos: Position): SnapTarget | null => {
      if (!enableSnapping || typeof window === 'undefined') return null

      const targets: SnapTarget[] = []
      
      // Screen edge snapping
      if (pos.x < snapThreshold) {
        targets.push({ x: 0, y: pos.y, type: 'edge' })
      }
      if (pos.y < snapThreshold) {
        targets.push({ x: pos.x, y: 0, type: 'edge' })
      }
      if (window.innerWidth - pos.x < snapThreshold + 300) { // Assume modal width ~300
        targets.push({ x: window.innerWidth - 300, y: pos.y, type: 'edge' })
      }
      if (window.innerHeight - pos.y < snapThreshold + 200) { // Assume modal height ~200
        targets.push({ x: pos.x, y: window.innerHeight - 200, type: 'edge' })
      }

      // Return closest target
      return targets.length > 0 ? targets[0] : null
    },
    [enableSnapping, snapThreshold]
  )

  const constrainPosition = useCallback(
    (pos: Position): Position => {
      if (!constrainToViewport || !modalRef.current || typeof window === 'undefined') {
        // Check for snapping even without viewport constraints
        const snapTarget = findSnapTargets(pos)
        return snapTarget ? { x: snapTarget.x, y: snapTarget.y } : pos
      }

      const modal = modalRef.current
      const rect = modal.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let constrainedX = Math.max(0, Math.min(pos.x, viewportWidth - rect.width))
      let constrainedY = Math.max(0, Math.min(pos.y, viewportHeight - rect.height))

      // Apply snapping
      const snapTarget = findSnapTargets({ x: constrainedX, y: constrainedY })
      if (snapTarget) {
        constrainedX = snapTarget.x
        constrainedY = snapTarget.y
        setSnapTarget(snapTarget)
      } else {
        setSnapTarget(null)
      }

      return { x: constrainedX, y: constrainedY }
    },
    [constrainToViewport, findSnapTargets]
  )

  const updatePosition = useCallback(
    (newPosition: Position) => {
      const constrainedPosition = constrainPosition(newPosition)
      setPosition(constrainedPosition)
      onPositionChange?.(constrainedPosition)
    },
    [constrainPosition, onPositionChange],
  )

  // On mount, clamp the initial position to ensure the modal is in the viewport
  useEffect(() => {
    // Defer to next frame to ensure modalRef has layout/rect
    const id = requestAnimationFrame(() => {
      updatePosition(position)
    })
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!modalRef.current) return

    const rect = modalRef.current.getBoundingClientRect()
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    setIsDragging(true)
    // Bring to front using global counter
    if (typeof window !== 'undefined') {
      // @ts-expect-error shared counter
      window.__MOVABLE_MODAL_Z__ += 1
      // @ts-expect-error read value
      const nextZ = window.__MOVABLE_MODAL_Z__ as number
      setZIndex(nextZ)
    } else {
      setZIndex((prev) => prev + 1)
    }

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
    setSnapTarget(null) // Clear snap indicator
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
    if (typeof window !== 'undefined') {
      // @ts-expect-error shared counter
      window.__MOVABLE_MODAL_Z__ += 1
      // @ts-expect-error read value
      const nextZ = window.__MOVABLE_MODAL_Z__ as number
      setZIndex(nextZ)
    } else {
      setZIndex((prev) => prev + 1)
    }
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
    setSnapTarget(null) // Clear snap indicator
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
    if (typeof window === 'undefined') return
    
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
    if (typeof window !== 'undefined') {
      // @ts-expect-error shared counter
      window.__MOVABLE_MODAL_Z__ += 1
      // @ts-expect-error read value
      const nextZ = window.__MOVABLE_MODAL_Z__ as number
      setZIndex(nextZ)
    } else {
      setZIndex((prev) => prev + 1)
    }
  }, [])

  return {
    modalRef,
    position,
    isDragging,
    isMinimized,
    zIndex,
    snapTarget,
    handleMouseDown,
    handleTouchStart,
    minimize,
    restore,
    close,
    bringToFront,
    updatePosition,
  }
}
