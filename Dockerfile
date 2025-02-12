FROM node:20-alpine
WORKDIR /app

# ARG NODE_ENV=development
ARG DATABASE_HOST
# ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_HOST=${DATABASE_HOST}
 

COPY package*.json yarn.lock ./

RUN npm install && npm install -g typescript

COPY . .
RUN yarn build
#RUN yarn migration:run

EXPOSE 3000

CMD ["yarn", "start:dev"]