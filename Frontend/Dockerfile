# ---- Stage 1: Build the React app ----
    FROM node:20-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy all files
    COPY . .
    
    # Build the app
    RUN npm run build
    
    
    # ---- Stage 2: Run with a lightweight web server ----
    FROM nginx:stable-alpine
    
    # Copy built files from builder
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Copy custom nginx config (optional, for SPA routing)
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port
    EXPOSE 80
    
    # Start nginx
    CMD ["nginx", "-g", "daemon off;"]
     