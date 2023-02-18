from node:alpine

#RUN apk add --no-cache python3 g++ make

EXPOSE 8080
WORKDIR /app

copy package.json .
run npm install 

copy . .