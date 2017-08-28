'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string().min(1).max(255).optional(),
  release_year: Joi.alternatives().try(
    Joi.number().min(1).optional(),
    Joi.object().keys({
      lt: Joi.number().min(1).optional(),
      lte: Joi.number().min(1).optional(),
      gt: Joi.number().min(1).optional(),
      gte: Joi.number().min(1).optional()
    }).optional()
  ).optional()
}).optional();
