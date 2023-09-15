const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { schemeService } = require('../services');

const createScheme = catchAsync(async (req, res) => {
  const scheme = await schemeService.createScheme(req.body);
  res.status(httpStatus.CREATED).send(scheme);
});

const getSchemes = catchAsync(async (req, res) => {
  const schemes = await schemeService.querySchemes(req.query);
  res.send(schemes);
});

module.exports = {
  createScheme,
  getSchemes,
};
