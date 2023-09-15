const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const loanValidation = require('../../validations/loan.validation');
const loanController = require('../../controllers/loan.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(loanValidation.createLoan), loanController.createLoan)
  .get(auth(), validate(loanValidation.getLoans), loanController.getLoans);

router
  .route('/:loanId')
  .get(auth('getLoans'), validate(loanValidation.getLoan), loanController.getLoan)
  .patch(auth('manageLoans'), validate(loanValidation.updateLoan), loanController.updateLoan);

module.exports = router;