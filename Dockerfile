# Build stage
FROM node:lts as build

WORKDIR /usr/src/server

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm ci && npm run build

# Production stage
FROM node:lts-alpine

WORKDIR /server
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --production && npm cache clean --force

COPY --from=build /usr/src/server/dist ./dist

EXPOSE 3001

CMD [ "node", "/server/dist/index.js" ]

