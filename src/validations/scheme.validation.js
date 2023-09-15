const Joi = require('joi');

const createScheme = {
  body: Joi.object().keys({
    term: Joi.number().integer().required(),
    frequency: Joi.string().required().allow('WEEKLY'),
  }),
};

const getSchemes = {
  query: Joi.object().keys({
    term: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createScheme,
  getSchemes,
};
