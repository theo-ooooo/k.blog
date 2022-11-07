FROM node:16

WORKDIR /kblog-server
COPY . .

RUN cat .aws/credentials
RUN yarn install

RUN yarn build

CMD ["yarn", "start:prod"]
EXPOSE 8080


