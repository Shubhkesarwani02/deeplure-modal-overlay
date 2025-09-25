# Docker Configuration

This project includes comprehensive Docker configuration for both development and production environments.

## 🚀 Complete Beginner's Guide - Step by Step

### Prerequisites
1. **Docker Desktop**: You've already downloaded it - great! 
2. **PowerShell**: Available on Windows by default
3. **This project**: Downloaded to your computer

### Step 1: Install and Setup Docker Desktop

1. **Install Docker Desktop**:
   - Run the Docker Desktop installer you downloaded
   - Follow the installation wizard
   - **Important**: When prompted, ensure "Use WSL 2 instead of Hyper-V" is checked (recommended)

2. **Start Docker Desktop**:
   - Launch Docker Desktop from Start Menu
   - Wait for Docker to start (you'll see "Docker Desktop is running" in the system tray)
   - The Docker whale icon should appear in your system tray

3. **Verify Docker is Running**:
   - Open PowerShell as Administrator
   - Run this command to test Docker:
   ```powershell
   docker --version
   ```
   - You should see something like: `Docker version 24.0.6, build ed223bc`

### Step 2: Navigate to Your Project

1. **Open PowerShell**:
   - Press `Win + X` and select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Navigate to your project folder**:
   ```powershell
   cd "C:\Users\LENOVO\Downloads\deeplure-movable-overlay"
   ```

3. **Verify you're in the right place**:
   ```powershell
   ls
   ```
   - You should see files like `Dockerfile`, `package.json`, `docker-compose.yml`

### Step 3: Build Your Application (First Time)

1. **Build the Docker image**:
   ```powershell
   docker build -t deeplure-modal-overlay .
   ```
   - This will take 5-10 minutes the first time
   - You'll see lots of text scrolling - this is normal!
   - Wait for "Successfully tagged deeplure-modal-overlay:latest"

2. **Verify the image was created**:
   ```powershell
   docker images
   ```
   - You should see `deeplure-modal-overlay` in the list

### Step 4: Run Your Application

1. **Start the container**:
   ```powershell
   docker run -d -p 80:80 --name deeplure-modal-overlay deeplure-modal-overlay
   ```
   - `-d` runs it in the background
   - `-p 80:80` makes it available on port 80
   - `--name deeplure-modal-overlay` gives it a friendly name

2. **Check if it's running**:
   ```powershell
   docker ps
   ```
   - You should see your container with status "Up"

3. **Open your application**:
   - Open your web browser
   - Go to: http://localhost
   - Your application should be running! 🎉

### Step 5: Managing Your Container

**Stop the application**:
```powershell
docker stop deeplure-modal-overlay
```

**Start it again**:
```powershell
docker start deeplure-modal-overlay
```

**Remove the container** (when you're done):
```powershell
docker stop deeplure-modal-overlay
docker rm deeplure-modal-overlay
```

**View logs** (if something goes wrong):
```powershell
docker logs deeplure-modal-overlay
```

### Alternative: Using Docker Compose (Easier Method)

If you want an even easier way to run everything:

1. **Start everything with one command**:
   ```powershell
   docker-compose up -d
   ```

2. **Stop everything**:
   ```powershell
   docker-compose down
   ```

3. **Rebuild and start** (if you change code):
   ```powershell
   docker-compose up --build -d
   ```

### Troubleshooting Common Issues

**Issue**: "docker: command not found"
- **Solution**: Make sure Docker Desktop is running and restart PowerShell

**Issue**: "port is already allocated"
- **Solution**: Stop any existing containers or use a different port:
  ```powershell
  docker run -d -p 8080:80 --name deeplure-modal-overlay deeplure-modal-overlay
  ```
  Then visit http://localhost:8080

**Issue**: Build fails with "network timeout"
- **Solution**: Check your internet connection and try again

**Issue**: "Cannot connect to the Docker daemon"
- **Solution**: Make sure Docker Desktop is running (check system tray)

**Issue**: Container starts but immediately stops
- **Solution**: Check container logs:
  ```powershell
  docker logs deeplure-modal-overlay
  ```
  Common causes:
  - nginx configuration syntax error
  - Missing files in the build
  - Port conflicts

**Issue**: "nginx: [emerg] invalid value" error
- **Solution**: This was fixed in the nginx.conf file. Rebuild the image:
  ```powershell
  docker build -t deeplure-modal-overlay .
  ```

### Development Mode (For Making Changes)

If you want to make changes to your code and see them immediately:

1. **Run in development mode**:
   ```powershell
   docker-compose --profile dev up frontend-dev
   ```

2. **Your app will be available at**: http://localhost:3000

3. **Stop development mode**:
   ```powershell
   docker-compose --profile dev down
   ```

### Quick Reference Commands

```powershell
# Build the app
docker build -t deeplure-modal-overlay .

# Run the app
docker run -d -p 80:80 --name deeplure-modal-overlay deeplure-modal-overlay

# Check running containers
docker ps

# Check all containers
docker ps -a

# Stop container
docker stop deeplure-modal-overlay

# Start container
docker start deeplure-modal-overlay

# Remove container
docker rm deeplure-modal-overlay

# View logs
docker logs deeplure-modal-overlay

# Clean up everything
docker system prune
```

### 🎯 Super Easy Method - One-Click Scripts

For absolute beginners who want to skip the command line:

1. **To start your app**: Double-click `start-app.bat`
   - This script will automatically build and start your application
   - It will open your browser to http://localhost when ready
   - Takes 5-10 minutes the first time

2. **To stop your app**: Double-click `stop-app.bat`
   - This completely stops and removes the container

**What these scripts do**:
- `start-app.bat`: Checks Docker → Builds app → Starts container → Opens browser
- `stop-app.bat`: Stops and removes the container cleanly

**First time using the scripts**:
1. Make sure Docker Desktop is running (whale icon in system tray)
2. Double-click `start-app.bat`
3. Wait for it to finish (you'll see a success message)
4. Your browser will open automatically to your app

### 🔄 Making Changes to Your Code

**If you modify your code and want to see changes**:

**Method 1 - Using Scripts (Easiest)**:
- Double-click `stop-app.bat`
- Double-click `start-app.bat`

**Method 2 - Using PowerShell**:
```powershell
docker stop deeplure-modal-overlay
docker rm deeplure-modal-overlay
docker build -t deeplure-modal-overlay .
docker run -d -p 80:80 --name deeplure-modal-overlay deeplure-modal-overlay
```

**Method 3 - Development Mode (Live Changes)**:
```powershell
docker-compose --profile dev up frontend-dev
```
Then visit http://localhost:3000 for live reloading.

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