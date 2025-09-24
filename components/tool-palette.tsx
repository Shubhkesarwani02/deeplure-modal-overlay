"use client"
import { Button } from "@/components/ui/button"
import {
  MousePointer2,
  Square,
  Circle,
  Paintbrush,
  Eraser,
  Type,
  Pipette,
  Hand,
  ZoomIn,
  Crop,
  Move3D,
  Pen,
  Scissors,
} from "lucide-react"

const tools = [
  { id: "select", icon: MousePointer2, name: "Selection Tool" },
  { id: "move", icon: Move3D, name: "Move Tool" },
  { id: "rectangle", icon: Square, name: "Rectangle Select" },
  { id: "ellipse", icon: Circle, name: "Ellipse Select" },
  { id: "brush", icon: Paintbrush, name: "Brush Tool" },
  { id: "eraser", icon: Eraser, name: "Eraser Tool" },
  { id: "text", icon: Type, name: "Text Tool" },
  { id: "eyedropper", icon: Pipette, name: "Eyedropper" },
  { id: "hand", icon: Hand, name: "Hand Tool" },
  { id: "zoom", icon: ZoomIn, name: "Zoom Tool" },
  { id: "crop", icon: Crop, name: "Crop Tool" },
  { id: "pen", icon: Pen, name: "Pen Tool" },
  { id: "cut", icon: Scissors, name: "Cut Tool" },
]

interface ToolPaletteProps {
  onToolSelect: (toolId: string) => void
  selectedTool: string
}

export function ToolPalette({ onToolSelect, selectedTool }: ToolPaletteProps) {
  return (
    <div className="fixed left-2 top-16 z-10 bg-card border border-border rounded-lg p-2 shadow-lg">
      <div className="grid grid-cols-2 gap-1 w-20">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onToolSelect(tool.id)}
              title={tool.name}
            >
              <Icon className="h-4 w-4" />
            </Button>
          )
        })}
      </div>
    </div>
  )
}
