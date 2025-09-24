"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Database, Code, Palette, FileText } from "lucide-react"

export function SettingsModalContent() {
  const [settings, setSettings] = useState({
    theme: "dark",
    notifications: true,
    autoSave: true,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Preferences</h3>
        <p className="text-sm text-muted-foreground">Customize your application settings</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <select
            id="theme"
            className="w-full p-2 bg-input border border-border rounded-md"
            value={settings.theme}
            onChange={(e) => setSettings((prev) => ({ ...prev, theme: e.target.value }))}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <input
            id="notifications"
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings((prev) => ({ ...prev, notifications: e.target.checked }))}
            className="rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autosave">Auto Save</Label>
          <input
            id="autosave"
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => setSettings((prev) => ({ ...prev, autoSave: e.target.checked }))}
            className="rounded"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save Changes</Button>
      </div>
    </div>
  )
}

export function UserProfileContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">John Doe</h3>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
          <Badge variant="secondary" className="mt-1">
            Pro User
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself..."
            defaultValue="Full-stack developer passionate about creating amazing user experiences."
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Update Profile</Button>
      </div>
    </div>
  )
}

export function DatabaseViewerContent() {
  const tables = [
    { name: "users", rows: 1234, size: "2.3 MB" },
    { name: "posts", rows: 5678, size: "12.1 MB" },
    { name: "comments", rows: 9876, size: "5.7 MB" },
    { name: "sessions", rows: 432, size: "0.8 MB" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Database Overview</h3>
        <p className="text-sm text-muted-foreground">Current database statistics and tables</p>
      </div>

      <div className="space-y-2">
        {tables.map((table) => (
          <Card key={table.name} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{table.name}</span>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div>{table.rows.toLocaleString()} rows</div>
                <div>{table.size}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          <Code className="w-4 h-4 mr-2" />
          Query Editor
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          Export Data
        </Button>
      </div>
    </div>
  )
}

export function ColorPaletteContent() {
  const colors = [
    { name: "Primary", value: "#8B5CF6", usage: "Buttons, links, highlights" },
    { name: "Secondary", value: "#64748B", usage: "Secondary text, borders" },
    { name: "Success", value: "#10B981", usage: "Success states, confirmations" },
    { name: "Warning", value: "#F59E0B", usage: "Warnings, cautions" },
    { name: "Error", value: "#EF4444", usage: "Errors, destructive actions" },
    { name: "Background", value: "#0F172A", usage: "Main background color" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Color Palette</h3>
        <p className="text-sm text-muted-foreground">Current theme color definitions</p>
      </div>

      <div className="space-y-3">
        {colors.map((color) => (
          <div key={color.name} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded border border-border flex-shrink-0"
              style={{ backgroundColor: color.value }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium">{color.name}</div>
              <div className="text-xs text-muted-foreground truncate">{color.usage}</div>
            </div>
            <code className="text-xs bg-muted px-2 py-1 rounded">{color.value}</code>
          </div>
        ))}
      </div>

      <Button size="sm" className="w-full">
        <Palette className="w-4 h-4 mr-2" />
        Edit Palette
      </Button>
    </div>
  )
}

export function DocumentationContent() {
  const sections = [
    { title: "Getting Started", items: ["Installation", "Quick Start", "Configuration"] },
    { title: "Components", items: ["Buttons", "Forms", "Modals", "Navigation"] },
    { title: "Hooks", items: ["useMovableModal", "useFocusTrap", "useModalManager"] },
    { title: "Examples", items: ["Basic Usage", "Advanced Features", "Custom Styling"] },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Documentation</h3>
        <p className="text-sm text-muted-foreground">Comprehensive guide and API reference</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="font-medium mb-2">{section.title}</h4>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item}
                  className="block w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 px-2 py-1 rounded transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button size="sm" className="w-full">
        <FileText className="w-4 h-4 mr-2" />
        View Full Documentation
      </Button>
    </div>
  )
}
