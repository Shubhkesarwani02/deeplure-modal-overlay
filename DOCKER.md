# Docker Configuration

This project includes comprehensive Docker configuration for both development and production environments.

## Files Overview

- `Dockerfile` - Multi-stage production build with nginx
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Orchestration for both environments
- `nginx.conf` - Custom nginx configuration
- `.dockerignore` - Files to exclude from Docker build context

## Production Build

The production Dockerfile creates a multi-stage build that:

1. **Build Stage**: Uses Node.js 18 Alpine to build the Next.js application
2. **Production Stage**: Uses nginx Alpine to serve the static files
3. **Creates `dist.tar.gz`**: Contains the built application files
4. **Optimized nginx**: Configured with compression, caching, and security headers

### Build and Run Production

```bash
# Build the production image
docker build -t deeplure-modal-overlay .

# Run the container
docker run -p 80:80 deeplure-modal-overlay

# Or use docker-compose
docker-compose up --build
```

## Development Environment

For development with hot reloading:

```bash
# Run development environment
docker-compose --profile dev up frontend-dev

# Or build and run manually
docker build -f Dockerfile.dev -t deeplure-modal-overlay-dev .
docker run -p 3000:3000 -v $(pwd):/app deeplure-modal-overlay-dev
```

## Key Features

### Production Features
- **Static Export**: Next.js app built as static files for optimal performance
- **nginx Serving**: High-performance web server with optimized configuration
- **Gzip Compression**: Automatic compression for faster loading
- **Security Headers**: XSS protection, CORS, and other security measures
- **Asset Caching**: Long-term caching for static assets
- **Health Checks**: Built-in health monitoring
- **Small Image Size**: Alpine-based images for minimal footprint

### Configuration Details

#### nginx Configuration
- Gzip compression for text files
- Long-term caching for static assets (1 year)
- Security headers for XSS and clickjacking protection
- Support for Next.js static export routing
- Error page handling

#### Next.js Configuration Updates
- `output: 'export'` - Enables static export
- `trailingSlash: true` - Ensures compatibility with static hosting
- `images: { unoptimized: true }` - Required for static export

## Environment Variables

You can pass environment variables to the containers:

```bash
# Production
docker run -p 80:80 -e NODE_ENV=production deeplure-modal-overlay

# Development
docker run -p 3000:3000 -e NODE_ENV=development deeplure-modal-overlay-dev
```

## Deployment

### Local Development
```bash
docker-compose --profile dev up frontend-dev
```

### Production Deployment
```bash
docker-compose up -d frontend
```

### Building for Different Platforms
```bash
# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t deeplure-modal-overlay .
```

## Troubleshooting

### Common Issues

1. **Build Fails**: Ensure all dependencies are properly defined in `package.json`
2. **Static Export Issues**: Check that your Next.js code is compatible with static export
3. **nginx 404 Errors**: Verify that the `out/` directory is properly created and copied

### Debugging

```bash
# Check container logs
docker logs <container-id>

# Access container shell
docker exec -it <container-id> /bin/sh

# Test nginx configuration
docker exec -it <container-id> nginx -t
```

## Performance Optimization

The Docker setup includes several performance optimizations:

- Multi-stage builds to reduce final image size
- Nginx with gzip compression
- Long-term caching for static assets
- Optimized nginx worker configuration
- Health checks for container monitoring

## Security Features

- Security headers (XSS protection, CORS, etc.)
- Non-root user execution
- Minimal attack surface with Alpine Linux
- Content Security Policy headers
- Protection against common web vulnerabilities