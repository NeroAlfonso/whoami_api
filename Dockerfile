#for develop
FROM node:10-alpine as build-step
RUN apk add git &&\
    mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD npm run start:watch