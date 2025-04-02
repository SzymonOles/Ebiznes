FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

RUN npm install --ignore-scripts -g serve
EXPOSE 3000
CMD ["serve", "-s", "build","-p","3000"]