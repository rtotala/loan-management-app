const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const repaymentValidation = require('../../validations/repayment.validation');
const repaymentController = require('../../controllers/repayment.controller');

const router = express.Router();

router
  .route('/:userId')
  .post(auth('manageRepayments'), validate(repaymentValidation.createRepayment), repaymentController.createRepayment)
  .get(auth('getRepayments'), validate(repaymentValidation.getRepayments), repaymentController.getRepayments);

module.exports = router;
