const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLoan = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    requestAmount: Joi.number().required(),
    schemeId: Joi.string().custom(objectId),
    requestDate: Joi.date().required(),
    status: Joi.string().allow('PENDING')
  }),
};

const getLoans = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    status: Joi.string().allow('PENDING', 'APPROVED', 'PAID'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLoan = {
  params: Joi.object().keys({
    loanId: Joi.string().custom(objectId),
  }),
};

const updateLoan = {
  params: Joi.object().keys({
    loanId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().valid('PENDING', 'APPROVED', 'PAID'),
    })
    .min(1),
};

module.exports = {
  createLoan,
  getLoans,
  getLoan,
  updateLoan,
};
