const httpStatus = require("http-status");
const { Loan, ScheduledRepayment, Repayment } = require("../models");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");

const createRepayment = async (repaymentBody) => {
  return Repayment.create(repaymentBody);
};

const queryRepayments = async (filter, options) => {
  return Repayment.paginate(filter, options);
};

const addRepayment = async (repaymentBody) => {

  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    // Create the repayment record first
    const repayment = await Repayment.create(repaymentBody);

    // Fetch all pending repayments sorted by dueDate
    const pendingRepayments = await ScheduledRepayment.find({
      loanId: repaymentBody.loanId,
      status: "PENDING",
    }).sort("dueDate");

    if (pendingRepayments.length === 0) {
      throw new ApiError(400, "No pending repayments found");
    }

    let remainingAmount = repaymentBody.amountPaid;

    // Loop through all pending repayments and update them
    for (const repayment of pendingRepayments) {
      if (remainingAmount >= repayment.amountDue) {
        // Mark this repayment as PAID and move to the next
        repayment.status = "PAID";
        remainingAmount -= repayment.amountDue;
      } else {
        // Reduce the amount due for this repayment and break the loop
        repayment.amountDue -= remainingAmount;
        remainingAmount = 0;
        break;
      }
    }

    // Bulk update the pending repayments
    const bulkOps = pendingRepayments.map((repayment) => ({
      updateOne: {
        filter: { _id: repayment._id },
        update: { status: repayment.status, amountDue: repayment.amountDue },
      },
    }));

    await ScheduledRepayment.bulkWrite(bulkOps);

    // Check if all scheduled repayments are "PAID" to update the loan status
    if (pendingRepayments.every((rep) => rep.status === "PAID")) {
      await Loan.findByIdAndUpdate(repaymentBody.loanId, { status: "PAID" });
    }

    await session.commitTransaction();
    session.endSession();

    return repayment;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    throw new Error("Transaction Aborted, Please check with Administrator")
  }
};

module.exports = {
  createRepayment,
  queryRepayments,
  addRepayment,
};
