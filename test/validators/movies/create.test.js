'use strict';

const Joi = require('joi');

const MovieCreateValidator = require('../../../lib/validators/movies/create');

describe('movie create validator', () => {

  it('succeeds when all allowed params are included', () => {
    const name = 'title';
    const release_year = 2017;
    const payload = { name, release_year };
    const result = Joi.validate(payload, MovieCreateValidator);

    expect(result.error).to.be.null;
  });

  describe('name', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieCreateValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const name = 'a'.repeat(256);
      const payload = { name };
      const result = Joi.validate(payload, MovieCreateValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('string.max');
    });

    it('is nonempty', () => {
      const name = '';
      const payload = { name };
      const result = Joi.validate(payload, MovieCreateValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('any.empty');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const name = 'Dom The Bomb';
      const release_year = 1877;
      const payload = { name, release_year };
      const result = Joi.validate(payload, MovieCreateValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const name = 'Dom The Bomb 2: Domlectric Boogaloo';
      const release_year = 10000;
      const payload = { name, release_year };
      const result = Joi.validate(payload, MovieCreateValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('is optional', () => {
      const name = 'Dom 3 Bomb';
      const payload = { name };
      const result = Joi.validate(payload, MovieCreateValidator);

      expect(result.error).to.be.null;
    });

    it('is limited to integers', () => {
      const name = 'Dom Fast Dom 4ious';
      const release_year = 2017.89;
      const payload = { name, release_year };
      const result = Joi.validate(payload, MovieCreateValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.integer');
    });

  });

});
