'use strict';

const Joi = require('joi');

const MovieListValidator = require('../../../lib/validators/movies/list');

describe('movie list validator', () => {

  it('succeeds when all allowed params are included', () => {
    const name = 'title';
    const release_year = {
      gt: 2000,
      lt: 2017
    };
    const payload = { name, release_year };
    const result = Joi.validate(payload, MovieListValidator);

    expect(result.error).to.be.null;
  });

  describe('name', () => {

    it('is optional', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error).to.be.null;
    });

  });

  describe('release_year', () => {

    it('can be an object', () => {
      const release_year = { gt: 1877 };
      const payload = { release_year };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error).to.be.null;
    });

    it('can be a number', () => {
      const release_year = 1877;
      const payload = { release_year };
      const result = Joi.validate(payload, MovieListValidator);

      expect(result.error).to.be.null;
    });

  });

});
