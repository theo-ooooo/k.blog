FROM node:16

WORKDIR /kblog-server
COPY . .
RUN mv ~/.aws ./

RUN yarn install

RUN yarn build

CMD ["yarn", "start:prod"]
EXPOSE 8080


