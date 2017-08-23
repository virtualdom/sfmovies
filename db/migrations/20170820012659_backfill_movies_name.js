'use strict';

exports.up = (Knex) => Knex.raw('UPDATE movies SET name = title');

exports.down = (Knex, Promise) => Promise.resolve();
