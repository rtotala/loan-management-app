const mongoose = require('mongoose');

const repaymentSchema = mongoose.Schema(
  {
    repaymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ScheduledRepayment',
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
