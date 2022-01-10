'use strict'
const _ = require('lodash')
const Confidence = require('confidence')
const ToBoolean = require('to-boolean')

const pack = require('./package')

const config = {
  name: pack.name,
  version: pack.version,
  description: pack.description,
  author: pack.author,
  app: {
    name: process.env.APP_NAME || 'ExpressBaseline',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || '8000',
    env: process.env.APP_ENV || 'development',
    secret: process.env.APP_SECRET || 'lionmane2022'
  },
  db: {
    host: process.env.DB_HOST || 'database',
    port: process.env.DB_PORT || '33060',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'lionmane'
  },
  emails: {
    recovery: "recovery_password",
    welcome: "welcome"
  },
  logger: {
    options: {
      console: ToBoolean(_.defaultTo(process.env.LOGGER_DEBUG, true))
    }
  }
}

const store = new Confidence.Store(config)
const criteria = {
  env: process.env.APP_ENV
}

module.exports = {
  get: key => store.get(key, criteria),
  meta: key => stop.meta(key, criteria)
}
