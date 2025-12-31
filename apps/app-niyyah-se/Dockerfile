# ----- Builder -----
FROM node:24-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY libs/db/package.json ./libs/db/
COPY apps/app-niyyah-se/package.json ./apps/app-niyyah-se/
RUN pnpm install --frozen-lockfile

# Build the application
WORKDIR /app/apps/app-niyyah-se
COPY libs/db ../../libs/db
COPY apps/app-niyyah-se ./

# Use .env.example for build-time environment variables (Zod validation)
RUN cp .env.example .env

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
COPY --from=builder /app/apps/app-niyyah-se/package.json ./apps/app-niyyah-se/
RUN pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=builder /app/apps/app-niyyah-se/build ./apps/app-niyyah-se/build

# Set working directory to the app
WORKDIR /app/apps/app-niyyah-se

# Expose port 8020
EXPOSE 8020

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8020
ENV ORIGIN=http://localhost:8020
ENV DATABASE_URL="postgresql://niyyah:niyyah@localhost:5432/niyyah?options=-c%20search_path%3Dcandidate"
ENV SMTP_HOST=localhost
ENV SMTP_PORT=1025
ENV SMTP_FROM=noreply@niyyah.se
ENV AUTH_SECRET=dev-secret-change-in-production-use-openssl-rand-base64-32
ENV LINK_EXPIRY=600

# Start the application
CMD ["node", "build"]
