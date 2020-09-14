FROM node:12.18.3-alpine

RUN apk --no-cache add shadow \
    gcc \
    musl-dev \
    autoconf \
    automake \
    make \
    libtool \
    nasm \
    tiff \
    jpeg \
    zlib \
    zlib-dev \
    file \
    pkgconf

RUN mkdir -p /build/
WORKDIR /build/

COPY package.json /build/package.json
COPY yarn.lock /build/yarn.lock

RUN yarn --pure-lockfile

COPY . /build/

RUN yarn build:base

CMD yarn docker:copy
