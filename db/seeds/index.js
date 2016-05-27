'use strict';

const Movies = require('./data/movies')

exports.seed = function (Knex) {
  return Knex('movies').truncate()
  .then(() => {
    return Knex('movies').insert(Movies);
  });
};
