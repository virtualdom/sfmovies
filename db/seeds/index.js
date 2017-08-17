'use strict';

const Movies = require('./data/movies');

exports.seed = (Knex) => {
  return Knex('movies').truncate()
  .then(() => Knex('movies').insert(Movies));
};
