const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const repaymentSchema = mongoose.Schema(
  {
    repaymentId: {
      type: mongoose.Schema.Types.String,
      ref: 'ScheduledRepayment',
      required: true,
    },
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan',
        required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
repaymentSchema.plugin(toJSON);
repaymentSchema.plugin(paginate);

const Repayment = mongoose.model('Repayment', repaymentSchema);

module.exports = Repayment;
