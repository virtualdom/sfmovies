'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie validator', () => {

  it('succeeds when all allowed params are included', () => {
    const title = 'title';
    const release_year = 2017;
    const payload = { title, release_year };
    const result = Joi.validate(payload, MovieValidator);

    expect(result.error).to.be.null;
  });

  describe('title', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const title = 'a'.repeat(256);
      const payload = { title };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

    it('is nonempty', () => {
      const title = '';
      const payload = { title };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.empty');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const title = 'Dom The Bomb';
      const release_year = 1877;
      const payload = { title, release_year };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const title = 'Dom The Bomb 2: Domlectric Boogaloo';
      const release_year = 10000;
      const payload = { title, release_year };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

    it('is optional', () => {
      const title = 'Dom 3 Bomb';
      const payload = { title };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error).to.be.null;
    });

    it('is limited to integers', () => {
      const title = 'Dom Fast Dom 4ious';
      const release_year = 2017.89;
      const payload = { title, release_year };
      const result = Joi.validate(payload, MovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.integer');
    });

  });

});
