FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon ts-node

EXPOSE 5001

CMD ["npm", "run", "dev"]