FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm install -g pm2

CMD ["pm2-runtime", "start", "dist/server.js"]