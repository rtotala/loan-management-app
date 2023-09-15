const httpStatus = require("http-status");
const { Loan, ScheduledRepayment, Scheme } = require("../models");
const ApiError = require("../utils/ApiError");
const { splitAmount, calculateDueDates } = require("../utils/loanUtils");

const createLoan = async (loanBody) => {
  return Loan.create(loanBody);
};

const queryLoans = async (filter, options) => {
  return Loan.paginate(filter, options);
};

const getLoanById = async (id) => {
  return Loan.findById(id);
};

const updateLoanById = async (loanId, updateBody) => {
  const loan = await getLoanById(loanId);
  if (!loan) {
    throw new ApiError(httpStatus.NOT_FOUND, "Loan not found");
  }
  Object.assign(loan, updateBody);
  await loan.save();
  return loan;
};

const createLoanAndScheduledRepayments = async (loanBody) => {
  // Create the loan first
  const loan = await Loan.create(loanBody);

  // Fetch the scheme details
  const scheme = await Scheme.findById(loan.schemeId);
  if (!scheme) {
    throw new ApiError(400, "Invalid scheme ID");
  }

  // Calculate individual repayment amounts and due dates
  const { term, frequency } = scheme;
  const scheduledRepayments = splitAmount(totalAmount, term);
  const dueDates = calculateDueDates(loan.requestDate, frequency);

  // Create scheduled repayments
  for (let i = 0; i < term; i++) {
    const scheduledRepaymentBody = {
      loanId: loan._id,
      dueDate: dueDates[i],
      amountDue: scheduledRepayments[i], // You can modify this based on paymentSlabs if needed
      status: "PENDING",
    };
    await ScheduledRepayment.create(scheduledRepaymentBody);
  }

  return loan;
};

module.exports = {
  createLoan,
  queryLoans,
  getLoanById,
  updateLoanById,
  createLoanAndScheduledRepayments,
};
