const express = require('express');

const router = express.Router();

const UsersController = require('../../controllers/user.controller');

const passport = require('passport');
const passportConf = require('../../passport');

/* 
  - for validation - use object destructuring to bring
  in only the needed properties
*/
const { validateBody, schemas } = require('../../helpers/routeHelpers');

// register = create a new User
router.post(
  '/users/register', 
  validateBody(schemas.authSchema), 
  UsersController.signup);

// log in
router.post(
  '/users/login',
  validateBody(schemas.authSchema),
  passport.authenticate('local', {session: false}),
  UsersController.signin
);

// secret page will only occur for authenticated User
router.get(
  '/user', 
  passport.authenticate('jwt', {session: false}),
  UsersController.secret
)

// update profile with token authentication
router.put(
  '/user',
  passport.authenticate('jwt', { session: false }),
  UsersController.updateUser
)

module.exports = router;




// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
// Building a Restful CRUD API with Node.js, Express and MongoDB

// update entire user's info with _id
// router.put('/users/:userId', UsersController.replace);

// partially update user with _id
// router.patch('/users/:userId', UsersController.update);

// // create a new User
// router.post('/users', UsersController.create);

// // retrieve all Users
// router.get('/users', UsersController.findAll);

// // retrieve a single user with _id
// router.get('/users/:userId', UsersController.findOne);


// // delete a user
// router.delete('/users/:userId', UsersController.delete);


/*
          REST API
  GET   /products -> get all products()
  GET   /products/:id -> get one product()
  POST  /products   -> create product
  PUT   /products/:id -> replace/create product
  PATCH /products/:id  -> update product
  DELETE  /products/:id -> Delete a product
*/