FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./src .

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]