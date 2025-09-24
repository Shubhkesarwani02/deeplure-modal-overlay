"use client"

import type React from "react"
import { forwardRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, Minus, Square, GripHorizontal, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMovableModal, type Position } from "@/hooks/use-movable-modal"
import { useResizable, RESIZE_HANDLES } from "@/hooks/use-resizable"
import { useFocusTrap } from "@/hooks/use-focus-trap"

export interface MovableModalProps {
  id: string
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  initialPosition?: Position
  className?: string
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  resizable?: boolean
  constrainToViewport?: boolean
  showMinimize?: boolean
  showMaximize?: boolean
  onPositionChange?: (position: Position) => void
  onSizeChange?: (size: { width: number; height: number }) => void
}

export const MovableModal = forwardRef<HTMLDivElement, MovableModalProps>(
  (
    {
      id,
      title,
      children,
      isOpen,
      onClose,
      initialPosition,
      className,
      width = 400,
      height = 300,
      minWidth = 300,
      minHeight = 200,
      maxWidth,
      maxHeight,
      resizable = true,
      constrainToViewport = true,
      showMinimize = true,
      showMaximize = true,
      onPositionChange,
      onSizeChange,
    },
    ref,
  ) => {
    const [isMaximized, setIsMaximized] = useState(false)
    const [preMaximizeState, setPreMaximizeState] = useState<{
      position: Position
      size: { width: number; height: number }
    } | null>(null)

    const {
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
    } = useMovableModal({
      id,
      initialPosition,
      constrainToViewport,
      onPositionChange,
      onClose,
    })

    const {
      elementRef: resizeRef,
      size,
      isResizing,
      handleMouseDown: handleResizeMouseDown,
      handleTouchStart: handleResizeTouchStart,
    } = useResizable({
      initialSize: { width, height },
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      constrainToViewport,
      onSizeChange,
    })

    const focusTrapRef = useFocusTrap(isOpen && !isMinimized)

    // Maximize/restore functionality
    const maximize = () => {
      if (typeof window === 'undefined') return
      
      if (!isMaximized) {
        // Store current state before maximizing
        setPreMaximizeState({
          position,
          size,
        })
        setIsMaximized(true)
      } else {
        // Restore from maximized state
        if (preMaximizeState) {
          // This would need to be implemented in the hooks
          setIsMaximized(false)
          setPreMaximizeState(null)
        }
      }
    }

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && !isMinimized) {
          close()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
      }
    }, [close, isOpen, isMinimized])

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(modalRef.current)
        } else {
          ref.current = modalRef.current
        }
      }
    }, [ref])

    if (!isOpen) return null

    const currentWidth = isMaximized ? window?.innerWidth || size.width : size.width
    const currentHeight = isMaximized ? window?.innerHeight || size.height : size.height
    const currentX = isMaximized ? 0 : position.x
    const currentY = isMaximized ? 0 : position.y

    const modalContent = (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px]"
          style={{ zIndex: zIndex - 1 }}
          onClick={bringToFront}
        />

        {/* Snap Indicators */}
        {snapTarget && isDragging && (
          <div
            className="fixed pointer-events-none border-2 border-dashed border-blue-400 bg-blue-400/20 transition-all duration-150"
            style={{
              zIndex: zIndex + 10,
              left: snapTarget.x,
              top: snapTarget.y,
              width: size.width,
              height: size.height,
            }}
          >
            <div className="absolute inset-0 bg-blue-400/10 animate-pulse" />
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
              📌 {snapTarget.type === 'edge' ? 'Snap to Edge' : snapTarget.type === 'panel' ? 'Dock with Panel' : 'Snap to Grid'}
            </div>
          </div>
        )}

        {/* Modal */}
        <div
          ref={(node) => {
            if (node) {
              // Set up all ref references to the same node
              if (modalRef.current !== node) {
                Object.assign(modalRef, { current: node })
              }
              if (resizeRef.current !== node) {
                Object.assign(resizeRef, { current: node })
              }
              if (focusTrapRef.current !== node) {
                Object.assign(focusTrapRef, { current: node })
              }
            }
          }}
          className={cn(
            "fixed bg-[#2b2b2b] border border-[#4a4a4a] rounded-lg shadow-2xl",
            "flex flex-col overflow-hidden",
            "modal-panel",
            isDragging && "modal-dragging",
            isResizing && "modal-resizing",
            isMinimized && "h-auto",
            isMaximized && "!fixed !inset-0 !rounded-none",
            className,
          )}
          style={{
            left: currentX,
            top: currentY,
            width: isMinimized ? "auto" : currentWidth,
            height: isMinimized ? "auto" : currentHeight,
            minWidth: isMinimized ? "auto" : minWidth,
            minHeight: isMinimized ? "auto" : minHeight,
            maxWidth: isMaximized ? "none" : (isMinimized ? "none" : maxWidth),
            maxHeight: isMaximized ? "none" : (isMinimized ? "none" : maxHeight),
            zIndex,
          }}
          onClick={bringToFront}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${id}`}
        >
          {/* Header */}
          <div
            className={cn(
              "flex items-center justify-between px-3 py-2 border-b border-[#4a4a4a]",
              "bg-[#383838] cursor-move select-none text-white",
              "hover:bg-[#404040] transition-colors",
              isMaximized && "cursor-default"
            )}
            onMouseDown={!isMaximized ? handleMouseDown : undefined}
            onTouchStart={!isMaximized ? handleTouchStart : undefined}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <GripHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <h2 id={`modal-title-${id}`} className="text-sm font-medium truncate text-white">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {showMinimize && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-[#4a4a4a] text-gray-300 hover:text-white"
                  onClick={isMinimized ? restore : minimize}
                  aria-label={isMinimized ? "Restore" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                </Button>
              )}

              {showMaximize && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-[#4a4a4a] text-gray-300 hover:text-white"
                  onClick={maximize}
                  aria-label={isMaximized ? "Restore" : "Maximize"}
                >
                  <Square className="w-3 h-3" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-red-600 text-gray-300 hover:text-white"
                onClick={close}
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="flex-1 overflow-auto modal-scrollbar p-4 bg-[#2b2b2b] text-white">
              {children}
            </div>
          )}

          {/* Resize handles */}
          {resizable && !isMinimized && !isMaximized && (
            <>
              {RESIZE_HANDLES.map((handle) => (
                <div
                  key={handle.direction}
                  className={cn(
                    "absolute resize-handle",
                    `resize-handle-${handle.direction}`
                  )}
                  style={{ cursor: handle.cursor }}
                  onMouseDown={(e) => handleResizeMouseDown(e, handle.direction)}
                  onTouchStart={(e) => handleResizeTouchStart(e, handle.direction)}
                />
              ))}
            </>
          )}
        </div>
      </>
    )

    return createPortal(modalContent, document.body)
  },
)

MovableModal.displayName = "MovableModal"
