FROM node:8.11.3-alpine
RUN apk add --update \
    python \
    g++ \ 
    gcc \
    make \
    && rm -rf /var/cache/apk/*

RUN mkdir /node 
COPY . /node 
WORKDIR /node

RUN npm install -g node-gyp yarn
RUN yarn