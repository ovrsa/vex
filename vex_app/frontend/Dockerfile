FROM node:18
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
