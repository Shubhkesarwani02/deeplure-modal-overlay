# Multi-stage build for deeplure-modal-overlay with nginx serving

# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js application for static export
RUN pnpm build

# Create dist.tar.gz file containing the built application
RUN tar -czf dist.tar.gz out/

# Production stage with nginx
FROM nginx:alpine AS production

# Install necessary packages
RUN apk add --no-cache tar gzip curl

# Copy the built application from builder stage
COPY --from=builder /app/dist.tar.gz /tmp/

# Extract the built files to nginx html directory
RUN tar -xzf /tmp/dist.tar.gz -C /usr/share/nginx/ && \
    mv /usr/share/nginx/out /usr/share/nginx/html && \
    rm /tmp/dist.tar.gz

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]