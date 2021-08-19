FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /src

COPY backend /src

RUN npm install

EXPOSE 3000

CMD npm start