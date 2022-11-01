FROM node:16

WORKDIR /kblog-server
COPY . .
RUN yarn install
RUN npx prisma db push
RUN npx prisma generate


RUN yarn build

CMD ["yarn", "start:pm2"]
EXPOSE 8080


