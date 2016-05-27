'use strict';

const Movies = require('../../../../lib/server');
const Knex   = require('../../../../lib/libraries/knex');

const firstMovie  = { title: 'The Prestige', release_year: 2006 };
const secondMovie = { title: 'Memento' };
const thirdMovie  = { title: 'The Departed', release_year: 2006 };

describe('movies integration', () => {

  beforeEach(() => {
    return Knex('movies').insert([firstMovie, secondMovie, thirdMovie]);
  });

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('list', () => {

    it('lists all movies', () => {
      return Movies.inject({
        url: '/movies',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.have.property('count');
        expect(response.result).to.have.property('data');
      });
    });

  });

});
