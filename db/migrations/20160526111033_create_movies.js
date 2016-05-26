'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.integer('release_year');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('movies');
};
