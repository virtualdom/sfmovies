'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');
const Knex       = require('../../../../lib/libraries/knex');

const firstMovie  = { title: 'The Prestige', release_year: 2006 };
const secondMovie = { title: 'Memento' };
const thirdMovie  = { title: 'The Departed', release_year: 2006 };

describe('movie controller', () => {

  beforeEach(() => {
    return Knex('movies').insert([firstMovie, secondMovie, thirdMovie]);
  });

  describe('create', () => {

    it('creates a movie without release year', () => {
      const payload = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

    it('creates a movie with release year', () => {
      const payload = { title: 'Toy Story', release_year: 1995 };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
        expect(movie.get('release_year')).to.eql(payload.release_year);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
        expect(movie.get('release_year')).to.eql(payload.release_year);
      });
    });

  });

  describe('list', () => {

    it('should properly sort based on query params', () => {
      const query = { sort: 'release_year' , q: '' };
      const reverseQuery = { sort: '-release_year', q: '' };

      Controller.list(query)
      .then((movies) => {
        let ordered = true;

        expect(movies.length).to.be.at.least(1);

        movies.each((movie, index) => {
          if (!movie.release_year || !movies[index + 1].release_year) {
            return;
          }

          if (movie.release_year < movies[index + 1].release_year) {
            ordered = false;
          }
        });

        expect(ordered).to.be.true;
      });

      return Controller.list(reverseQuery)
      .then((movies) => {
        let ordered = true;

        expect(movies.length).to.be.at.least(1);

        movies.each((movie, index) => {
          if (!movie.release_year || !movies[index + 1].release_year) {
            return;
          }

          if (movie.release_year > movies[index + 1].release_year) {
            ordered = false;
          }
        });

        expect(ordered).to.be.true;
      });
    });

    it('should filter titles based request query', () => {
      const q = 'amer';
      const query = { q, sort: 'release_year' };

      Controller.list(query)
      .then((movies) => {
        let filtered = true;

        expect(movies.length).to.be.at.least(1);

        movies.each((movie) => {
          if (!movie.match(q)) {
            filtered = false;
          }
        });

        expect(filtered).to.be.true;
      });
    });

  });

});
