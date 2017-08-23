'use strict';

exports.up = function (Knex, Promise) {
  return Knex.schema.table('movies', (table) => {
    table.dropColumn('title');
  })
  .then(() => {
    return Knex.raw('ALTER TABLE movies ALTER COLUMN name SET NOT NULL');
  });
};

exports.down = function (Knex, Promise) {
  return Knex.schema.table('movies', (table) => {
    table.text('title');
  })
  .then(() => {
    return Knex.raw('ALTER TABLE movies ALTER COLUMN name DROP NOT NULL');
  });
};
