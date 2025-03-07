FROM node:20-alpine AS base
RUN npm i -g pnpm

FROM base AS development
ARG APP
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY .env.docker .env
COPY . .

RUN pnpm run build ${APP}

FROM base AS production
ARG APP
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app/.env .env
COPY package.json pnpm-lock.yaml ./
COPY --from=development /app/node_modules ./node_modules

# Copy dist của product.api
COPY --from=development /app/dist ./dist

ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}
