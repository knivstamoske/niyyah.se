# ----- Builder -----
FROM node:24-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY libs/db/package.json ./libs/db/
COPY apps/www-niyyah-se/package.json ./apps/www-niyyah-se/
RUN pnpm install --frozen-lockfile

# Build the application
WORKDIR /app/apps/www-niyyah-se
COPY libs/db ../../libs/db
COPY apps/www-niyyah-se ./
RUN pnpm build

# -----------------------------------------------------------------

# ----- Runtime -----
FROM node:24-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml /app/pnpm-lock.yaml ./
COPY --from=builder /app/libs/db/package.json ./libs/db/
COPY --from=builder /app/apps/www-niyyah-se/package.json ./apps/www-niyyah-se/
RUN pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=builder /app/apps/www-niyyah-se/build ./apps/www-niyyah-se/build

# Set working directory to the app
WORKDIR /app/apps/www-niyyah-se

# Expose port 8050
EXPOSE 8050

# Set environment variables
ENV PORT=8050
ENV ORIGIN=http://localhost:8050
ENV NODE_ENV=production

# Start the application
CMD ["node", "build"]
