'use strict';

exports.up = function (Knex, Promise) {
  return Knex.raw('UPDATE movies SET name = title');
};

exports.down = function (Knex, Promise) {
  return Promise.resolve();
};
