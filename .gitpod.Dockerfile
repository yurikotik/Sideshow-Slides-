FROM node:18

RUN npm install -g serve

WORKDIR /workspace/Sideshow-Slides-

COPY . .

CMD ["serve", "-s", "public"]