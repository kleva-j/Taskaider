# FROM node:20 AS base

# FROM base AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update
# # Set working directory
# WORKDIR /app
# RUN yarn global add turbo
# COPY . .
# RUN turbo prune --scope=web --docker

# # Add lockfile and package.json's of isolated subworkspace
# FROM base AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
# WORKDIR /app

# # First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
# RUN yarn install

# # Build the project
# COPY --from=builder /app/out/full/ .
# RUN yarn turbo run build --filter=web...

# FROM base AS runner
# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# COPY --from=installer /app/apps/web/next.config.js .
# COPY --from=installer /app/apps/web/package.json .

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# CMD node apps/web/server.js


FROM node:20 as base
# Update apt-get and install the necessary libraries
# This is mainly so that the `canvas` package can be installed
RUN apt-get update && \
  apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev


FROM base AS builder
WORKDIR /app

ENV APP_NAME=web

# This might be necessary when switching to alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

RUN npm install -g turbo

COPY . .

RUN turbo prune --scope=web --docker


FROM base as installer
WORKDIR /app
ENV APP_NAME=web

RUN npm install -g pnpm
RUN npm install -g turbo
RUN npm install -g dotenv-cli

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN dotenv -- turbo run build --filter=web

FROM base AS runner
WORKDIR /app
ENV APP_NAME=web


RUN npm install -g pnpm

# Don't run production as root
# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs

# USER expressjs
COPY --from=installer /app .

# TODO: Maybe use the npm script?
CMD pnpm --filter web run start

# GITHUB TURBO PNPM ISSUE
# https://github.com/vercel/turbo/issues/5462