const mongoose = require('mongoose');

const loanSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requestAmount: {
      type: Number,
      required: true,
    },
    schemeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scheme',
      required: true,
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'PAID'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
loanSchema.plugin(toJSON);
loanSchema.plugin(paginate);


const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
