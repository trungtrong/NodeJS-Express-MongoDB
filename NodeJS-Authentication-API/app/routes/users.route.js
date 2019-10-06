const express = require('express');

const router = express.Router();

const UsersController = require('../controllers/users.controller');

const passport = require('passport');
const passportConf = require('../passport');

/* 
  - for validation - use object destructuring to bring
  in only the needed properties
*/
const { validateBody, schemas } = require('../helpers/routeHelpers');

router.post('/users/register', validateBody(schemas.authSchema), UsersController.signup);

router.post(
  '/users/login',
  validateBody(schemas.authSchema),
  passport.authenticate('local', {session: false}),
  UsersController.signin
);

// secret page will only occur for authenticated User
router.get('/user', 
  passport.authenticate('jwt', {session: false}),
  UsersController.secret
)

module.exports = router;