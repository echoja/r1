FROM node:14 AS client

WORKDIR /

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY ./client ./client
COPY ./*.config.js ./
COPY ./*.config.ts ./
COPY ./typedef.ts ./

RUN npm run build

FROM node:14 AS server-build-bundle

WORKDIR /server

COPY ./server/packag*.json ./
RUN npm install 

COPY ./server/src ./src
COPY ./server/rollup.config.js ./
COPY ./server/tsconfig.json ./
COPY ./typedef.ts ../
RUN npm run build-simple && npm run rollup

FROM node:14

WORKDIR /

COPY ./server/packag*.json ./
RUN npm install --production

COPY --from=client /client/dist ./web-dist
COPY --from=server-build-bundle /server/bundle ./bundle

ENV NODE_ENV production

ENTRYPOINT [ "node",  "./bundle/index.js" ]
