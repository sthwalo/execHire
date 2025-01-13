# Use Node.js LTS (Debian-based)
FROM node:18-bullseye-slim as builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including dev dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image
FROM node:18-bullseye-slim as runner

# Set working directory
WORKDIR /app

# Install production dependencies only
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.js ./

# Add backports for any required packages
RUN echo 'deb http://deb.debian.org/debian bullseye-backports main' > /etc/apt/sources.list.d/backports.list

# Install any required system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
