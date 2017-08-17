'use strict';

const Bookshelf = require('bookshelf');

const Knex = require('./knex');

module.exports = Bookshelf(Knex);
