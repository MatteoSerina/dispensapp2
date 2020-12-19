FROM node:14.15.1-alpine

ENV NODE_ENV=production

EXPOSE 3100

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "server.js"]