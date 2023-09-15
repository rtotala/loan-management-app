const { number } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const schemeSchema = mongoose.Schema(
  {
    term: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
      enum: ['WEEKLY', 'MONTHLY'],
      default: 'WEEKLY',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
schemeSchema.plugin(toJSON);
schemeSchema.plugin(paginate);

const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;
