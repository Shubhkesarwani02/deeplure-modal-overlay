"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

export function CharacterPanel() {
  const [fontSize, setFontSize] = useState([12])
  const [leading, setLeading] = useState([14])
  const [tracking, setTracking] = useState([0])

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Font Family</label>
        <Select defaultValue="arial">
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arial">Arial</SelectItem>
            <SelectItem value="helvetica">Helvetica</SelectItem>
            <SelectItem value="times">Times New Roman</SelectItem>
            <SelectItem value="georgia">Georgia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Size</label>
          <Input
            type="number"
            value={fontSize[0]}
            onChange={(e) => setFontSize([Number.parseInt(e.target.value)])}
            className="h-8"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Leading</label>
          <Input
            type="number"
            value={leading[0]}
            onChange={(e) => setLeading([Number.parseInt(e.target.value)])}
            className="h-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Tracking</label>
        <Slider value={tracking} onValueChange={setTracking} max={200} min={-200} step={1} className="w-full" />
        <div className="text-xs text-muted-foreground text-center">{tracking[0]}</div>
      </div>

      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
