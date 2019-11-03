FROM node:12-alpine
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
        bcrypt \
    && apk del .gyp

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "start:dev"]