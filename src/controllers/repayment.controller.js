const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { repaymentService } = require('../services');

const createRepayment = catchAsync(async (req, res) => {
  const repayment = await repaymentService.addRepayment(req.body);
  res.status(httpStatus.CREATED).send(repayment);
});

const getRepayments = catchAsync(async (req, res) => {
  const repayments = await repaymentService.queryRepayments(req.query);
  res.send(repayments);
});

module.exports = {
  createRepayment,
  getRepayments,
};
