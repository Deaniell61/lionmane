module.exports = {
  local: {
    "username": "root",
    "password": "1234",
    "database": "lionmane",
    "host": "localhost",
    "dialect": "mysql",
    "logging": true
  },
  development: {
    "username": "root",
    "password": "1234",
    "database": "lionmane",
    "host": "localhost",
    "dialect": "mysql",
    "logging": true
  },
  test: {
    "username": 'database_test',
    "password": null,
    "database": 'database_test',
    "host": 'localhost',
    "dialect": 'mysql',
    "logging": true
  },
  production: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOSTNAME,
    "dialect": 'mysql',
    "logging": true
  }
};
