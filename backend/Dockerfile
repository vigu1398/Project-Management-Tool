FROM node:14.16.1-alpine3.10
RUN mkdir /app
COPY package.json ./app
WORKDIR /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm","run", "dev"]