'use strict';

exports.up = (Knex) => {
  return Knex.schema.table('movies', (table) => table.text('name'))
  .then(() => Knex.raw('ALTER TABLE movies ALTER COLUMN title DROP NOT NULL'));
};

exports.down = (Knex) => {
  return Knex.schema.table('movies', (table) => table.dropColumn('name'))
  .then(() => Knex.raw('ALTER TABLE movies ALTER COLUMN title SET NOT NULL'));
};
