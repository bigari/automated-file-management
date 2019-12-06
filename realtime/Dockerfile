FROM node:12.13.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "start:dev"]