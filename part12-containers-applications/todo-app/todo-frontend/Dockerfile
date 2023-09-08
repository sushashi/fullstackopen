FROM node:16 as test-stage

WORKDIR /usr/src/app

COPY . .

ENV CI=true

RUN npm ci

RUN npm run test

FROM test-stage as build-stage

ENV REACT_APP_BACKEND_URL=http://localhost/api

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]