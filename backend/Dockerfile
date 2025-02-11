FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build