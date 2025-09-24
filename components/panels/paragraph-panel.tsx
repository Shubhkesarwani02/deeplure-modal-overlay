"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ParagraphPanel() {
  const [leftIndent, setLeftIndent] = useState([0])
  const [rightIndent, setRightIndent] = useState([0])
  const [spaceBefore, setSpaceBefore] = useState([0])
  const [spaceAfter, setSpaceAfter] = useState([0])

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Alignment</label>
        <Select defaultValue="left">
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="justify">Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Left Indent</label>
          <Input
            type="number"
            value={leftIndent[0]}
            onChange={(e) => setLeftIndent([Number.parseInt(e.target.value)])}
            className="h-8"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Right Indent</label>
          <Input
            type="number"
            value={rightIndent[0]}
            onChange={(e) => setRightIndent([Number.parseInt(e.target.value)])}
            className="h-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Space Before</label>
          <Input
            type="number"
            value={spaceBefore[0]}
            onChange={(e) => setSpaceBefore([Number.parseInt(e.target.value)])}
            className="h-8"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Space After</label>
          <Input
            type="number"
            value={spaceAfter[0]}
            onChange={(e) => setSpaceAfter([Number.parseInt(e.target.value)])}
            className="h-8"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Hyphenation</label>
        <Select defaultValue="none">
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="auto">Auto</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
