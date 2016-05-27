'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.list = (filter) => {
  let sortProperty = null;
  let sortDirection = null;
  const query = filter.q;

  if (filter.sort.charAt(0) === '-') {
    sortProperty = filter.sort.slice(1);
    sortDirection = 'DESC';
  } else {
    sortProperty = filter.sort;
    sortDirection = 'ASC';
  }

  return new Movie()
  .query((qb) => {
    qb.whereRaw('lower(title) LIKE ?', `%${query}%`);
  })
  .orderBy(sortProperty, sortDirection)
  .fetchAll();
};
