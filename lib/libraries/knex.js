'use strict';

const Knex = require('knex');

const DatabaseConfig = require('../../db');

module.exports = Knex(DatabaseConfig);
