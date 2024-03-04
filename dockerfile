FROM node:19-buster

WORKDIR /app

RUN apt-get update
RUN apt-get upgrade -y --fix-missing
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY ./commands /app/commands
COPY ./events /app/events
COPY ./index.js .
COPY ./deploy-commands.js .
COPY ./package.json .
COPY ./package-lock.json .
COPY ./config.json .

RUN npm install
RUN node deploy-commands.js

CMD node .