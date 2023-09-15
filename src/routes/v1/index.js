const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const loanRoute = require('./loan.route');
const schemeRoute = require('./scheme.route');
const repaymentRoute = require('./repayment.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/loans',
    route: loanRoute,
  },
  {
    path: '/schemes',
    route: schemeRoute,
  },
  {
    path: '/repayments',
    route: repaymentRoute,
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
