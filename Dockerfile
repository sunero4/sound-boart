FROM node:latest

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY app.ts ./
COPY src/ ./src
COPY package-lock.json ./

RUN apt update \
    && apt-get -y install ffmpeg

RUN npm install -g npm@latest \
    && npm install

RUN npm install -g npm@latest \
    && npm ci \
    && npm install -g typescript

RUN tsc

CMD [ "node", "./dist/app.js" ]