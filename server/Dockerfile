FROM node:latest-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install --frozen-lockfile
FROM base AS build
COPY . .
RUN npm prisma generate
RUN npm build
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock
RUN npm install --production --frozen-lockfile
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/__generated__ ./prisma/__generated__
CMD ["node", "dist/main"]