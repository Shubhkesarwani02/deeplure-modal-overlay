"use client"

import type React from "react"
import { forwardRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, Minus, Square, GripHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMovableModal, type Position } from "@/hooks/use-movable-modal"
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
      resizable = false,
      constrainToViewport = true,
      showMinimize = true,
      showMaximize = false,
      onPositionChange,
    },
    ref,
  ) => {
    const {
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
    } = useMovableModal({
      id,
      initialPosition,
      constrainToViewport,
      onPositionChange,
      onClose,
    })

    const focusTrapRef = useFocusTrap(isOpen && !isMinimized)

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: Event) => {
        if (e instanceof CustomEvent && e.type === "modal-escape") {
          close()
        }
      }

      if (modalRef.current) {
        modalRef.current.addEventListener("modal-escape", handleEscape)
        return () => {
          modalRef.current?.removeEventListener("modal-escape", handleEscape)
        }
      }
    }, [close])

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

    const modalContent = (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          style={{ zIndex: zIndex - 1 }}
          onClick={bringToFront}
        />

        {/* Modal */}
        <div
          ref={(node) => {
            modalRef.current = node
            focusTrapRef.current = node
          }}
          className={cn(
            "fixed bg-card border border-border rounded-lg shadow-2xl",
            "flex flex-col overflow-hidden",
            isDragging ? "modal-dragging" : "modal-not-dragging",
            isMinimized && "h-auto",
            className,
          )}
          style={{
            left: position.x,
            top: position.y,
            width: isMinimized ? "auto" : width,
            height: isMinimized ? "auto" : height,
            minWidth: isMinimized ? "auto" : minWidth,
            minHeight: isMinimized ? "auto" : minHeight,
            maxWidth: isMinimized ? "none" : maxWidth,
            maxHeight: isMinimized ? "none" : maxHeight,
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
              "flex items-center justify-between p-3 border-b border-border",
              "bg-muted/50 cursor-move select-none",
              "hover:bg-muted/70 transition-colors",
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <GripHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <h2 id={`modal-title-${id}`} className="text-sm font-medium truncate">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {showMinimize && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={isMinimized ? restore : minimize}
                  aria-label={isMinimized ? "Restore" : "Minimize"}
                >
                  {isMinimized ? <Square className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                </Button>
              )}

              {showMaximize && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={() => {
                    /* TODO: Implement maximize */
                  }}
                  aria-label="Maximize"
                >
                  <Square className="w-3 h-3" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={close}
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && <div className="flex-1 overflow-auto modal-scrollbar p-4">{children}</div>}
        </div>
      </>
    )

    return createPortal(modalContent, document.body)
  },
)

MovableModal.displayName = "MovableModal"
