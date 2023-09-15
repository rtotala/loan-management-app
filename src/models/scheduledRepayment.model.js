const mongoose = require('mongoose');

const scheduledRepaymentSchema = mongoose.Schema(
  {
    loanID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
scheduledRepaymentSchema.plugin(toJSON);
scheduledRepaymentSchema.plugin(paginate);

const ScheduledRepayment = mongoose.model('ScheduledRepayment', scheduledRepaymentSchema);

module.exports = ScheduledRepayment;
