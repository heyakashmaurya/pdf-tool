FROM node:22-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libreoffice \
    poppler-utils \
    tesseract-ocr \
    tesseract-ocr-eng \
    && rm -rf /var/lib/apt/lists/*

# Application directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy backend source
COPY . .

# Build TypeScript
RUN npm run build

# Production environment
ENV NODE_ENV=production

# Render's default web port
EXPOSE 10000

# Start backend
CMD ["npm", "start"]