FROM node:12.20.1-alpine

#RUN apk add --no-cache python gcc g++ make

USER node
RUN mkdir -p /home/node
WORKDIR /home/node
ENV NODE_ENV=production
ENV ADDRESS=0.0.0.0
ENV PORT=5000

COPY --chown=node:node ./package.json ./package.json
RUN yarn install

COPY --chown=node:node .next/ .next/
COPY --chown=node:node ./public ./public

EXPOSE 5000
CMD [ "yarn", "start", "-p", "5000"]
