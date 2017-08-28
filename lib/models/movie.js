'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  filter: function (filter) {
    if (!filter || !filter.name && !filter.release_year) {
      return this;
    }

    const qb = this.query();

    if (filter.name) {
      qb.where('name', 'ilike', `%${filter.name}%`);
    }

    if (filter.release_year) {
      if (typeof filter.release_year === 'object') {
        if (filter.release_year.gt) {
          qb.where('release_year', '>', filter.release_year.gt);
        }

        if (filter.release_year.gte) {
          qb.where('release_year', '>=', filter.release_year.gte);
        }

        if (filter.release_year.lt) {
          qb.where('release_year', '<', filter.release_year.lt);
        }

        if (filter.release_year.lte) {
          qb.where('release_year', '<=', filter.release_year.lte);
        }
      } else {
        qb.where('release_year', '=', filter.release_year);
      }
    }

    qb.orderBy('release_year', 'desc');

    return this;
  },
  serialize: function () {
    return {
      id: this.get('id'),
      name: this.get('name'),
      release_year: this.get('release_year'),
      object: 'movie'
    };
  }
});
