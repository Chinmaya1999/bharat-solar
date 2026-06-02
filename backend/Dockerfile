# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Create uploads directory for file storage
RUN mkdir -p uploads

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["node", "app.js"]
