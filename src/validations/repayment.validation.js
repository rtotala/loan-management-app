const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRepayment = {
  body: Joi.object().keys({
    repaymentId: Joi.string().required(),
    amountPaid: Joi.number().required(),
    paymentDate: Joi.date().required(),
    loanId: Joi.string().required(),
  }),
};

const getRepayments = {
  query: Joi.object().keys({
    repaymentId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createRepayment,
  getRepayments,
};
