"use client"

import { useEffect, useRef } from "react"

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  'input[type="text"]:not([disabled])',
  'input[type="radio"]:not([disabled])',
  'input[type="checkbox"]:not([disabled])',
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    previousActiveElement.current = document.activeElement as HTMLElement

    const focusableElements = container.querySelectorAll(FOCUSABLE_ELEMENTS) as NodeListOf<HTMLElement>
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus the first element
    if (firstElement) {
      firstElement.focus()
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        // Let the modal handle the escape key
        const escapeEvent = new CustomEvent("modal-escape", { bubbles: true })
        container.dispatchEvent(escapeEvent)
      }
    }

    document.addEventListener("keydown", handleTabKey)
    document.addEventListener("keydown", handleEscapeKey)

    return () => {
      document.removeEventListener("keydown", handleTabKey)
      document.removeEventListener("keydown", handleEscapeKey)

      // Restore focus to the previously active element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isActive])

  return containerRef
}
