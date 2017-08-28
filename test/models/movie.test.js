'use strict';

const Knex  = require('../../lib/libraries/knex');
const Movie = require('../../lib/models/movie');

const oldMovie  = { release_year: 1950, name: 'Lob Interns 1950' };
const newMovie  = { release_year: 2017, name: 'Lob Interns 2017' };
const bestMovie = { release_year: 2016, name: 'Lob Interns 2016' };

describe('movie model', () => {

  describe('filter', () => {

    beforeEach(() => {
      return Knex('movies').truncate()
      .then(() => Knex('movies').insert([oldMovie, newMovie, bestMovie]));
    });

    it('ignores an empty filter', () => {
      return new Movie()
      .filter({})
      .fetchAll()
      .then((results) => expect(results.length).to.equal(3));
    });

    it('filters by title', () => {
      return new Movie()
      .filter({ name: 'Interns 20' })
      .fetchAll()
      .then((results) => {
        expect(results.length).to.equal(2);
        expect(results.models[0].get('name')).to.equal('Lob Interns 2017');
        expect(results.models[1].get('name')).to.equal('Lob Interns 2016');
      });
    });

    it('filters within inclusive year range', () => {
      return new Movie()
      .filter({
        release_year: {
          lte: 2017,
          gte: 2015
        }
      })
      .fetchAll()
      .then((results) => {
        expect(results.length).to.equal(2);
        expect(results.models[0].get('name')).to.equal('Lob Interns 2017');
        expect(results.models[1].get('name')).to.equal('Lob Interns 2016');
      });
    });

    it('filters within exclusive year range', () => {
      return new Movie()
      .filter({
        release_year: {
          lt: 2017,
          gt: 2015
        }
      })
      .fetchAll()
      .then((results) => {
        expect(results.length).to.equal(1);
        expect(results.models[0].get('name')).to.equal('Lob Interns 2016');
      });
    });

    it('filters for a specific year', () => {
      return new Movie()
      .filter({
        release_year: 2016
      })
      .fetchAll()
      .then((results) => {
        expect(results.length).to.equal(1);
        expect(results.models[0].get('name')).to.equal('Lob Interns 2016');
      });
    });

  });

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const movie = Movie.forge().serialize();

      expect(movie).to.have.all.keys([
        'id',
        'name',
        'release_year',
        'object'
      ]);
    });

  });

});
