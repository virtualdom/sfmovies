'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};
