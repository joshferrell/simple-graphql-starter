FROM node:latest

MAINTAINER Josh Ferrell "josh@joshferrell.me"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

COPY package.json ./srv/
RUN cd ./srv && \
    yarn install

EXPOSE 3000
CMD [ "npm", "run", "build" ]
