FROM node:18.12-bullseye-slim

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
