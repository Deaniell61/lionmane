# bin/bash

docker build --build-arg APP_NAME="LionMane" --build-arg APP_HOST=localhost --build-arg APP_PORT=8000 --build-arg APP_ENV="development" --build-arg APP_SECRET="lionmane2022" --build-arg DB_HOST="localhost" --build-arg DB_PORT=33060 --build-arg DB_USERNAME="root" --build-arg DB_PASSWORD="1234" --build-arg DB_DATABASE="lionmane" --build-arg LOGGER_DEBUG="true" --tag lionmane:1.0.0 .
