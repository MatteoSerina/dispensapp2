FROM node:14.15.1-alpine

ENV NODE_ENV=production

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3100

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
RUN npm install react-scripts@3.4.1 -g --silent

COPY . .

CMD ["npm", "start"]