#!/bin/bash
#run migration

../../node_modules/.bin/sequelize model:generate \
  --name Referencias \
  --attributes UsuarioId:integer,nombre:string,apellido:string,

../../node_modules/.bin/sequelize db:migrate

../../node_modules/.bin/sequelize db:seed:all
