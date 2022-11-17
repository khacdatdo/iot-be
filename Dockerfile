FROM node:16.15.0

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "npm", "start" ]
