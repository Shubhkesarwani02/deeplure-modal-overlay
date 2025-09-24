# Deeplure Modal Overlay

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.0+-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A sophisticated, production-ready modal overlay system with advanced movable, resizable, and dockable capabilities built on Next.js 14 and React 18.

## 🚀 Features

### Core Functionality
- **🎯 Movable Modals**: Drag-and-drop functionality with viewport constraints
- **📏 Resizable Components**: Dynamic resizing with customizable constraints
- **🔧 Tool Palette**: Comprehensive design tool interface
- **🎨 Advanced Panel System**: Multiple specialized panels (Colors, Layers, Brushes, History)
- **📱 Responsive Design**: Mobile-first approach with adaptive layouts
- **🌙 Theme Support**: Dark/light mode with system preference detection

### Technical Highlights
- **⚡ High Performance**: Optimized React components with efficient state management
- **🛡️ Type Safety**: Full TypeScript implementation with strict type checking
- **🎨 Modern UI**: Radix UI components with Tailwind CSS styling
- **🔄 State Management**: Context-based state management with custom hooks
- **📦 Component Library**: Comprehensive reusable component system
- **🐳 Docker Ready**: Multi-stage production builds with nginx optimization

## 📋 Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js**: >= 18.17.0 (recommended: 18.x LTS)
- **pnpm**: >= 8.0.0 (package manager)
- **Git**: Latest stable version
- **Docker** (optional): >= 20.10.0 for containerized deployment

## 🛠️ Installation

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubhkesarwani02/deeplure-modal-overlay.git
   cd deeplure-modal-overlay
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Access the application**
   ```
   http://localhost:3000
   ```

### Docker Development Setup

1. **Start development environment**
   ```bash
   docker-compose up dev
   ```

2. **Access the containerized application**
   ```
   http://localhost:3000
   ```

## 🏗️ Build & Deployment

### Production Build

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Docker Production Deployment

```bash
# Build and run production container
docker-compose up production

# Or build manually
docker build -f Dockerfile -t deeplure-modal-overlay:latest .
docker run -p 80:80 deeplure-modal-overlay:latest
```

### Performance Optimizations

The production build includes:
- **Static optimization**: Pre-rendered pages and assets
- **Code splitting**: Dynamic imports and route-based splitting
- **Image optimization**: Next.js automatic image optimization
- **Bundle analysis**: Webpack bundle analyzer integration
- **Nginx optimization**: Gzip compression, caching headers, security headers

## 📁 Project Architecture

```
deeplure-modal-overlay/
├── app/                     # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── canvas-area.tsx     # Main canvas component
│   ├── modal-manager.tsx   # Modal state management
│   ├── movable-modal.tsx   # Core modal component
│   ├── tool-palette.tsx    # Tool interface
│   ├── panels/             # Specialized UI panels
│   │   ├── brushes-panel.tsx
│   │   ├── color-panel.tsx
│   │   ├── layers-panel.tsx
│   │   └── ...
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── dialog.tsx
│       └── ...
├── hooks/                  # Custom React hooks
│   ├── use-movable-modal.ts
│   ├── use-resizable.ts
│   └── use-focus-trap.ts
├── lib/                    # Utility functions
│   └── utils.ts
├── styles/                 # Styling files
│   └── globals.css
├── public/                 # Static assets
├── docker/                 # Docker configuration
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── docker-compose.yml
│   └── nginx.conf
└── config files            # Configuration
    ├── next.config.mjs
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application Configuration
NEXT_PUBLIC_APP_NAME=Deeplure Modal Overlay
NEXT_PUBLIC_APP_VERSION=0.1.0

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Development
NODE_ENV=development
```

### TypeScript Configuration

The project uses strict TypeScript settings for maximum type safety:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./*"]}
  }
}
```

## 🎨 Component Usage

### Basic Modal Implementation

```tsx
import { MovableModal } from '@/components/movable-modal'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MovableModal
      id="example-modal"
      title="Example Modal"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      initialPosition={{ x: 100, y: 100 }}
      width={400}
      height={300}
      resizable
      constrainToViewport
    >
      <div className="p-4">
        <p>Modal content goes here</p>
      </div>
    </MovableModal>
  )
}
```

### Advanced Modal with Custom Hooks

```tsx
import { useMovableModal } from '@/hooks/use-movable-modal'
import { useModalManager } from '@/components/modal-manager'

function AdvancedModalExample() {
  const { openModal, closeModal } = useModalManager()
  const { position, updatePosition } = useMovableModal()

  const handleOpenModal = () => {
    openModal({
      id: 'advanced-modal',
      title: 'Advanced Features',
      component: <YourCustomComponent />,
      options: {
        resizable: true,
        showMinimize: true,
        showMaximize: true,
        minWidth: 300,
        minHeight: 200,
      }
    })
  }

  return (
    <button onClick={handleOpenModal}>
      Open Advanced Modal
    </button>
  )
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run end-to-end tests
pnpm test:e2e
```

### Test Structure

```
__tests__/
├── components/
│   ├── movable-modal.test.tsx
│   └── modal-manager.test.tsx
├── hooks/
│   ├── use-movable-modal.test.ts
│   └── use-resizable.test.ts
└── utils/
    └── utils.test.ts
```

## 📊 Performance Monitoring

### Built-in Analytics

The application includes Vercel Analytics for performance monitoring:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Performance Metrics

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Docker Production

```bash
# Build production image
docker build -f Dockerfile -t deeplure-modal-overlay:prod .

# Run with docker-compose
docker-compose -f docker-compose.yml up production
```

### Manual Server Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start

# Or use PM2 for process management
pm2 start ecosystem.config.js
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **ESLint**: Follow the established linting rules
- **Prettier**: Use consistent code formatting
- **TypeScript**: Maintain strict type checking
- **Testing**: Include tests for new features
- **Documentation**: Update docs for API changes

### Commit Message Convention

```
type(scope): description

feat(modal): add drag constraints
fix(resize): resolve boundary calculation
docs(readme): update installation guide
test(hooks): add resizable hook tests
```

## 📝 API Documentation

### MovableModal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique modal identifier |
| `title` | `string` | required | Modal title text |
| `isOpen` | `boolean` | required | Modal visibility state |
| `onClose` | `() => void` | required | Close handler function |
| `initialPosition` | `Position` | `{x: 50, y: 50}` | Initial modal position |
| `width` | `number` | `400` | Modal width in pixels |
| `height` | `number` | `300` | Modal height in pixels |
| `resizable` | `boolean` | `false` | Enable resize functionality |
| `constrainToViewport` | `boolean` | `true` | Limit movement to viewport |

### Custom Hooks

#### useMovableModal

```tsx
const {
  position,
  updatePosition,
  isDragging,
  dragHandlers
} = useMovableModal({
  initialPosition: { x: 100, y: 100 },
  constrainToViewport: true
})
```

#### useResizable

```tsx
const {
  size,
  updateSize,
  isResizing,
  resizeHandlers
} = useResizable({
  initialSize: { width: 400, height: 300 },
  minWidth: 200,
  minHeight: 150
})
```

## 🛠️ Troubleshooting

### Common Issues

**Issue**: Modal not appearing
```bash
# Check z-index conflicts in CSS
# Verify portal mounting
# Check isOpen state management
```

**Issue**: Drag functionality not working
```bash
# Ensure pointer events are enabled
# Check event handler attachments
# Verify touch device compatibility
```

**Issue**: Performance issues with multiple modals
```bash
# Implement modal virtualization
# Use React.memo for optimization
# Check for memory leaks
```

### Browser Compatibility

- **Chrome**: >= 90
- **Firefox**: >= 88
- **Safari**: >= 14
- **Edge**: >= 90

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Shubh Kesarwani](https://github.com/Shubhkesarwani02)
- **Project**: Deeplure Modal Overlay System

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- [Vercel](https://vercel.com/) - Deployment and hosting platform

## 📞 Support

- **Documentation**: [Wiki](https://github.com/Shubhkesarwani02/deeplure-modal-overlay/wiki)
- **Issues**: [GitHub Issues](https://github.com/Shubhkesarwani02/deeplure-modal-overlay/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Shubhkesarwani02/deeplure-modal-overlay/discussions)

---

<div align="center">

**Built with ❤️ by the Deeplure Team**

[⭐ Star this repository](https://github.com/Shubhkesarwani02/deeplure-modal-overlay) if you find it helpful!

</div>