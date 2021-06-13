FROM node:14 AS client-build

WORKDIR /client

COPY ./client/packag*.json ./
RUN npm install

COPY ./client/*.config.js ./
COPY ./client/*.config.ts ./
COPY ./client/tsconfig.json ./
COPY ./client/public ./public
COPY ./client/src ./src
COPY ./client/index.html ./


COPY ./types.d.ts ./

RUN npm run build

FROM node:14 AS server-build-bundle

WORKDIR /server

COPY ./server/packag*.json ./
RUN npm install

COPY ./server/src ./src
COPY ./server/rollup.config.js ./
COPY ./server/tsconfig.json ./
COPY ./types.d.ts ../
RUN npm run build-simple && npm run rollup

FROM node:14

WORKDIR /

COPY ./server/packag*.json ./
RUN npm install --production

COPY --from=client-build /client/dist ./web-dist
COPY --from=server-build-bundle /server/bundle ./bundle

ENV NODE_ENV production

ENTRYPOINT [ "npm", "run", "start"]
