const httpStatus = require('http-status');
const { ScheduledRepayment } = require('../models');
const ApiError = require('../utils/ApiError');

const createScheduledRepayment = async (scheduledRepaymentBody) => {
  return ScheduledRepayment.create(scheduledRepaymentBody);
};

const queryScheduledRepayments = async (filter, options) => {
  return ScheduledRepayment.paginate(filter, options);
};

module.exports = {
  createScheduledRepayment,
  queryScheduledRepayments,
};
