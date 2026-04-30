FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT [ "node", "--import", "./instrumentation.js" ,"index.js" ]