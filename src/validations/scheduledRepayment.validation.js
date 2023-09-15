const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createScheduledRepayment = {
  body: Joi.object().keys({
    loanId: Joi.string().custom(objectId),
    dueDate: Joi.date().required(),
    amountDue: Joi.number().required(),
    status: Joi.string().required().valid('PENDING', 'PAID'),
  }),
};

const getScheduledRepayments = {
  query: Joi.object().keys({
    loanId: Joi.string().custom(objectId),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createScheduledRepayment,
  getScheduledRepayments,
};
