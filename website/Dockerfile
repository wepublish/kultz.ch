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

COPY --chown=node:node ./dist/ ./dist/
COPY --chown=node:node ./static ./static
COPY --chown=node:node ./assets ./assets

EXPOSE 5000
CMD [ "yarn", "start"]
