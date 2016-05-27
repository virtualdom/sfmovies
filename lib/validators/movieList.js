'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  sort: Joi.string().valid(['id', 'title', 'release_year', '-id', '-title', '-release_year']).optional().default('id'),
  q: Joi.string().optional().default('').lowercase()
}).optional().default({});
