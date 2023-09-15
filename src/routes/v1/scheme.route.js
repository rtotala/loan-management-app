const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const schemeValidation = require('../../validations/scheme.validation');
const schemeController = require('../../controllers/scheme.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSchemes'), validate(schemeValidation.createScheme), schemeController.createScheme)
  .get(auth('getSchemes'), validate(schemeValidation.getSchemes), schemeController.getSchemes);

module.exports = router;
