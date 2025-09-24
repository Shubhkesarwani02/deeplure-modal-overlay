# Movable Modal System

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*A sophisticated, production-ready modal system with advanced drag-and-drop functionality, built for modern web applications*

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 🚀 Overview

The **Movable Modal System** is a comprehensive, enterprise-grade modal management solution that brings desktop-like window management to web applications. Built with React, TypeScript, and modern web standards, it provides a powerful foundation for creating complex UI layouts with floating panels, tool palettes, and dynamic workspaces.

Perfect for creative applications, dashboards, IDEs, design tools, and any application requiring sophisticated modal management.

## ✨ Features

### 🪟 Advanced Modal Management
- **Multi-Instance Support** - Open multiple instances of the same modal type
- **Intelligent Z-Index Management** - Automatic stacking and focus management
- **Global Modal Control** - Close all modals or filter by type
- **Context-Aware Management** - Built-in modal manager with React Context API

### 🎯 Drag & Drop Excellence
- **Smooth Dragging** - Native mouse and touch support with hardware acceleration
- **Viewport Constraints** - Keep modals within screen boundaries
- **Smart Snapping** - Snap to edges, grids, and other panels
- **Multi-Touch Support** - Full touch device compatibility

### 📏 Flexible Resizing
- **8-Point Resizing** - Resize from all corners and edges
- **Aspect Ratio Constraints** - Maintain proportions when needed
- **Min/Max Dimensions** - Configurable size limits
- **Responsive Behavior** - Adapts to different screen sizes

### 🎨 Rich UI Components
- **9 Specialized Panels** - Pre-built panels for common use cases:
  - Color Panel - Advanced color picker and palette management
  - Layers Panel - Layer management with visibility controls
  - Brushes Panel - Tool selection and brush customization
  - History Panel - Undo/redo functionality
  - Properties Panel - Dynamic property editing
  - Character Panel - Typography and text formatting
  - Paragraph Panel - Text alignment and spacing
  - Swatches Panel - Color swatch management
  - Navigator Panel - Viewport navigation and minimap

### 🛠️ Developer Experience
- **TypeScript First** - Full type safety and IntelliSense support
- **Hook-Based Architecture** - Composable and reusable logic
- **Customizable Theming** - Built on Tailwind CSS with CSS variables
- **Accessibility Ready** - WCAG 2.1 compliant with focus management
- **SSR Compatible** - Works with Next.js and other SSR frameworks

### 🎛️ Window Controls
- **Minimize/Maximize** - Standard window controls
- **Custom Title Bars** - Fully customizable headers
- **Focus Trapping** - Proper keyboard navigation
- **Modal Stacking** - Intelligent layering system

## 📋 Prerequisites

Before installing, ensure you have:

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **React** 18.0 or higher
- **TypeScript** 5.0 or higher (recommended)

## 🛠️ Installation

### Option 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/movable-modal-system.git

# Navigate to the project directory
cd movable-modal-system

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Option 2: Use as a Template

```bash
# Create a new project using this template
npx create-next-app@latest my-modal-app --typescript --tailwind --eslint

# Navigate to your project
cd my-modal-app

# Copy the modal system files
# (Copy components/, hooks/, lib/, and styles/ directories)

# Install additional dependencies
pnpm add @radix-ui/react-dialog @radix-ui/react-tabs lucide-react class-variance-authority clsx
```

### Option 3: Manual Installation

Add to your existing project:

```bash
# Install core dependencies
pnpm add react react-dom next

# Install UI dependencies
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-dialog
pnpm add @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-popover
pnpm add lucide-react class-variance-authority clsx tailwind-merge

# Install development dependencies
pnpm add -D @types/react @types/react-dom @types/node typescript tailwindcss autoprefixer postcss
```

## 🚀 Quick Start

### 1. Basic Setup

```tsx
import { ModalManagerProvider } from '@/components/modal-manager'
import { MovableModal } from '@/components/movable-modal'

function App() {
  return (
    <ModalManagerProvider>
      <YourAppContent />
    </ModalManagerProvider>
  )
}
```

### 2. Open a Modal

```tsx
import { useModalManager } from '@/components/modal-manager'
import { ColorPanel } from '@/components/panels/color-panel'

function MyComponent() {
  const { openModal } = useModalManager()

  const handleOpenColorPanel = () => {
    openModal({
      id: 'color-panel',
      title: 'Color Picker',
      content: <ColorPanel />,
      width: 300,
      height: 400,
      resizable: true,
    })
  }

  return (
    <button onClick={handleOpenColorPanel}>
      Open Color Panel
    </button>
  )
}
```

### 3. Custom Modal

```tsx
function CustomModal() {
  const { openModal } = useModalManager()

  const openCustomModal = () => {
    openModal({
      id: 'my-custom-modal',
      title: 'My Custom Panel',
      content: (
        <div className="p-4">
          <h2>Custom Content</h2>
          <p>Your custom modal content here</p>
        </div>
      ),
      width: 500,
      height: 300,
      minWidth: 300,
      minHeight: 200,
      showMinimize: true,
      showMaximize: true,
      resizable: true,
    })
  }

  return <button onClick={openCustomModal}>Open Custom Modal</button>
}
```

## 📖 API Reference

### Modal Manager

#### `useModalManager()`

Hook for managing modals globally.

```tsx
const {
  openModal,
  openNewInstance,
  closeModal,
  closeAllModals,
  closeAllOfType,
  isModalOpen,
  getOpenModals,
  getModalsByType,
  bringToFront
} = useModalManager()
```

**Methods:**
- `openModal(config)` - Open a modal (reuses existing if same ID)
- `openNewInstance(config)` - Always creates a new modal instance
- `closeModal(id)` - Close a specific modal
- `closeAllModals()` - Close all open modals
- `closeAllOfType(type)` - Close all modals of a specific type
- `isModalOpen(id)` - Check if a modal is open
- `getOpenModals()` - Get array of all open modal IDs
- `getModalsByType(type)` - Get modals filtered by type
- `bringToFront(id)` - Bring a modal to the front

### MovableModal Props

```tsx
interface MovableModalProps {
  id: string                                    // Unique identifier
  title: string                                 // Modal title
  children: React.ReactNode                     // Modal content
  isOpen: boolean                               // Open/closed state
  onClose: () => void                           // Close callback
  initialPosition?: Position                    // Starting position
  className?: string                            // Custom CSS classes
  width?: number                                // Initial width
  height?: number                               // Initial height
  minWidth?: number                             // Minimum width
  minHeight?: number                            // Minimum height
  maxWidth?: number                             // Maximum width
  maxHeight?: number                            // Maximum height
  resizable?: boolean                           // Enable resizing
  constrainToViewport?: boolean                 // Keep within viewport
  showMinimize?: boolean                        // Show minimize button
  showMaximize?: boolean                        // Show maximize button
  onPositionChange?: (position: Position) => void  // Position change callback
  onSizeChange?: (size: {width: number, height: number}) => void  // Size change callback
}
```

### Hooks

#### `useMovableModal()`

Core hook for modal positioning and dragging.

```tsx
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
  bringToFront
} = useMovableModal(options)
```

#### `useResizable()`

Hook for modal resizing functionality.

```tsx
const {
  elementRef,
  size,
  isResizing,
  handleMouseDown,
  handleTouchStart
} = useResizable(options)
```

#### `useFocusTrap()`

Hook for managing focus within modals.

```tsx
const { trapRef } = useFocusTrap(isActive)
```

## 🎨 Customization

### Styling

The system uses Tailwind CSS with CSS variables for theming:

```css
:root {
  --modal-bg: hsl(0 0% 100%);
  --modal-border: hsl(214.3 31.8% 91.4%);
  --modal-shadow: hsl(222.2 84% 4.9% / 0.1);
}

.dark {
  --modal-bg: hsl(222.2 84% 4.9%);
  --modal-border: hsl(217.2 32.6% 17.5%);
  --modal-shadow: hsl(222.2 84% 4.9% / 0.8);
}
```

### Custom Panels

Create custom panels by extending the base structure:

```tsx
export function CustomPanel() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Custom Panel</h3>
      </div>
      {/* Your custom content */}
    </div>
  )
}
```

### Themes

Toggle between light and dark themes:

```tsx
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

## 🏗️ Architecture

The system is built with a modular architecture:

```
├── components/
│   ├── modal-manager.tsx      # Global modal state management
│   ├── movable-modal.tsx      # Core modal component
│   ├── tool-palette.tsx       # Tool selection interface
│   ├── canvas-area.tsx        # Main workspace area
│   └── panels/                # Specialized panel components
├── hooks/
│   ├── use-movable-modal.ts   # Modal positioning logic
│   ├── use-resizable.ts       # Resizing functionality
│   └── use-focus-trap.ts      # Accessibility focus management
└── lib/
    └── utils.ts               # Utility functions
```

## 📱 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+
- **Mobile Safari** 14+
- **Chrome Mobile** 88+

## ⚡ Performance

- **Optimized Rendering** - Uses React.memo and useMemo for expensive operations
- **Hardware Acceleration** - CSS transforms for smooth animations
- **Event Delegation** - Efficient event handling
- **Memory Management** - Proper cleanup of event listeners and timeouts

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e
```

## 📦 Build

```bash
# Development build
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/movable-modal-system.git`
3. Install dependencies: `pnpm install`
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes and add tests
6. Run tests: `pnpm test`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (ESLint + Prettier)
- Add JSDoc comments for public APIs
- Include tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** - For the excellent headless UI primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide React** - For the beautiful icons
- **Next.js** - For the powerful React framework
- **Vercel** - For hosting and deployment

## 📞 Support

- 📧 **Email**: support@your-domain.com
- 💬 **Discord**: [Join our community](https://discord.gg/your-invite)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/movable-modal-system/issues)
- 📖 **Documentation**: [Full Documentation](https://your-docs-site.com)

---

<div align="center">

**[⭐ Star this project](https://github.com/your-username/movable-modal-system)** if you find it useful!

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>