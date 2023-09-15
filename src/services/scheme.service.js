const httpStatus = require('http-status');
const { Scheme } = require('../models');
const ApiError = require('../utils/ApiError');

const createScheme = async (schemeBody) => {
  return Scheme.create(schemeBody);
};

const querySchemes = async (filter, options) => {
  return Scheme.paginate(filter, options);
};

module.exports = {
  createScheme,
  querySchemes,
};
