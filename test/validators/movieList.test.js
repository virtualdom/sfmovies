'use strict';

const Joi = require('joi');

const MovieListValidator = require('../../lib/validators/movieList');

describe('movie query validator', () => {

  describe('sort', () => {

    it('rejects incorrect keys', () => {
      const query = { sort: 'false_key' };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error.details[0].path).to.eql('sort');
      expect(result.error.details[0].type).to.eql('any.allowOnly');
    });

    it('is optional', () => {
      const query = { };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error).to.be.null;
    });

    it('is given a default value when not provided', () => {
      const query = { };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.value.sort).to.eql('id');
    });

  });

  describe('q', () => {

    it('is forced to lowercase', () => {
      const q = 'QUERY_VALUE';
      const query = { q };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.value.q).to.eql(q.toLowerCase());
    });

    it('is optional', () => {
      const query = { };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.error).to.be.null;
    });

    it('is given a default value when not provided', () => {
      const query = { };
      const result = Joi.validate(query, MovieListValidator);

      expect(result.value.q).to.eql('');
    });

  });

});
