'use strict';

const Knex = require('../lib/libraries/knex');

beforeEach(() => {
  return Knex('movies').truncate();
});
