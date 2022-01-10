FROM node:8.11-alpine

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

ARG APP_HOST
ENV APP_HOST=${APP_HOST}

ARG APP_PORT
ENV APP_PORT=${APP_PORT}

ARG APP_ENV
ENV APP_ENV=${APP_ENV}

ARG APP_SECRET
ENV APP_SECRET=${APP_SECRET}

ARG DB_HOST
ENV DB_HOST=${DB_HOST}

ARG DB_PORT
ENV DB_PORT=${DB_PORT}

ARG DB_USERNAME
ENV DB_USERNAME=${DB_USERNAME}

ARG DB_PASSWORD
ENV DB_PASSWORD=${DB_PASSWORD}

ARG DB_DATABASE
ENV DB_DATABASE=${DB_DATABASE}

ARG LOGGER_DEBUG
ENV LOGGER_DEBUG=${LOGGER_DEBUG}

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        gcc \
    && npm install \
        npm install --production --silent && \
        apk del python \
        make \
        g++ \
        gcc \
    && apk del .gyp


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD ["npm", "start"]
