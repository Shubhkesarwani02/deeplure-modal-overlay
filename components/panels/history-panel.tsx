"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, RotateCw } from "lucide-react"

const historySteps = [
  "Open Document",
  "Create Layer",
  "Brush Tool",
  "Paint Stroke",
  "Add Text",
  "Apply Filter",
  "Adjust Levels",
  "Crop Image",
]

export function HistoryPanel() {
  const [currentStep, setCurrentStep] = useState(7)

  return (
    <div className="w-48 space-y-3">
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2" title="Undo">
          <RotateCcw className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2" title="Redo">
          <RotateCw className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-1">
        {historySteps.map((step, index) => (
          <div
            key={index}
            className={`px-2 py-1 text-sm rounded cursor-pointer transition-colors ${
              index <= currentStep
                ? index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
            onClick={() => setCurrentStep(index)}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  )
}
