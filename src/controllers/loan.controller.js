const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { loanService } = require('../services');

const createLoan = catchAsync(async (req, res) => {
  const loan = await loanService.createLoan(req.body);
  res.status(httpStatus.CREATED).send(loan);
});

const getLoans = catchAsync(async (req, res) => {
  const loans = await loanService.queryLoans(req.query);
  res.send(loans);
});

const getLoan = catchAsync(async (req, res) => {
  const loan = await loanService.getLoanById(req.params.loanId);
  res.send(loan);
});

const updateLoan = catchAsync(async (req, res) => {
  const loan = await loanService.updateLoanById(req.params.loanId, req.body);
  res.send(loan);
});

module.exports = {
  createLoan,
  getLoans,
  getLoan,
  updateLoan,
};
