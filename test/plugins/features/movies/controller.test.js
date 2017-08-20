'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { name: 'Dom 5ever' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.name);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => expect(movie.get('title')).to.eql(payload.title));
    });

  });

});
