const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { scheduledRepaymentService } = require('../services');

const createScheduledRepayment = catchAsync(async (req, res) => {
  const scheduledRepayment = await scheduledRepaymentService.createScheduledRepayment(req.body);
  res.status(httpStatus.CREATED).send(scheduledRepayment);
});

const getScheduledRepayments = catchAsync(async (req, res) => {
  const scheduledRepayments = await scheduledRepaymentService.queryScheduledRepayments(req.query);
  res.send(scheduledRepayments);
});

module.exports = {
  createScheduledRepayment,
  getScheduledRepayments,
};
