FROM node:16.16-alpine3.16 AS build

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY . ./
RUN yarn install && yarn global add typescript
RUN yarn run build


FROM node:16.16-alpine3.16 AS production
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY --from=build /app/build ./
ENV NODE_ENV=production
RUN yarn install --prod
EXPOSE 3000

CMD [ "node", "app.js"]