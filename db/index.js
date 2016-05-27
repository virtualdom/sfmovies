'use strict';

const Config = require('../config');

module.exports = {
  client: 'postgresql',
  connection: {
    database: Config.DB_NAME,
    host: Config.DB_HOST,
    password: Config.DB_PASSWORD,
    port: Config.DB_PORT,
    user: Config.DB_USER
  }
};
