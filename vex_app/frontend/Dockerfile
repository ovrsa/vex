FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PATH="./node_modules/.bin:$PATH"
RUN npm run build
RUN npm prune --production
RUN npm install -g serve
CMD ["serve", "-s", "dist", "--listen", "tcp://0.0.0.0:3000"]