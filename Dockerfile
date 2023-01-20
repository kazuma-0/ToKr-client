FROM node:18.10-alpine3.15

WORKDIR /usr/src/app

EXPOSE 3000

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]