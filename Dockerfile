FROM node:20-alpine
WORKDIR /app

COPY package*.json yarn.lock ./

RUN npm install && npm install -g typescript

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:dev"]