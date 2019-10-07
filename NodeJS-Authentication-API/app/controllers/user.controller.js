// require user model
const User = require('../models/user.model');

// require json web token
// https://github.com/auth0/node-jsonwebtoken
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/index');

//require bcrypt
const bcrypt = require('bcryptjs');

/* 
  -create a signToken method to generate a token,
  - passing user as argument
*/
signToken = user => {
  return JWT.sign(
    {
      iss: "NodeAPI", // issuer
      sub: user.id, // sub means subject which is mandatory
      iat: new Date().getTime() // issued at date
    },
    JWT_SECRET // random secret
  );
};


module.exports = {
  // req - contains incoming http request information

  signup: async (req, res, next) => {
    /*
      - use { req.value.body } not { req.body }
      + this will give use validated body of the parent
    */
    const { email, password, username } = await req.value.body;

    /*
      1 - check if user exists
      - use await keyword b/c it takes time
        to solve this this query fom database
    */
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      // respond with 403 forbidden status code
      return res.status(403).json({
        error: "Email already is use"
      })
    }
    /*
      2 - Create a new object for a new user that log in
      for the first time
    */
    const newUser = new User({
      email,
      password,
      username
    });

    // and await for a new user to be saved b/c it takes some time
    // hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    // generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(newUser.password, salt);
    // save password is hashed to database
    newUser.password = passwordHash;

    // after hashing password => add password is hashed to database
    await newUser.save();
    console.log('user is saved');

    // use signToken method to generate token
    // and respond on signup
    const token = await signToken(newUser);
    
    res.status(200).json({ token });
  },

  signin: async (req, res, next) => {
    // Similar to signup method, we need to send token 
    // as response so that the user can be authenticated.
    
    // respond with token: when user login => provide token to client
    const token = await signToken(req.user);
    res.status(200).json({ token });
  },
  secret: async (req, res, next) => {
    const token = await signToken(req.user);    
    res.status(200).json({ token });
  }
}

/*
  - First: Create a list of Middleware function
    to response data to Client
  module.exports = {
  // req - contains incoming http request information

  signup: async (eq, res, next) => {
    res.json('sign up called');
  },

  signin: async (req, res, next) => {
    res. json('signin called');
  },
  secret: async (req, res, next) => {
    res.json('secret called');
  }
}
  
-------------------------------------------------
      Second: Require the user from { models/user }
  
  - So that we can create a new user
  - Mongoose will be in instant communication with
    given database

    // req - contains incoming http request information

  signup: async (req, res, next) => {
  
  //    - use { req.value.body } not { req.body }
  //    + this will give use validated body of the parent
   const { email, password } = req.value.body;

  //   1 - check if user exists
  //   - use await keyword b/c it takes time
  //     to solve this this query fom database
   
   const foundUser = await User.findOne({ email });

   if (foundUser) {
     // respond with 403 forbidden status code
     return res.status(403).json({
       error: "Email already is use"
     })
   }
  
  // 2 - Create a new object for a new user that log in
  //for the first time
   
   const newUser = new User({
     email,
     password
   });

   // and await for a new user to be saved b/c it takes some time
   await newUser.save();

   res.json({
     user: "created"
   });
 },

-------------------------------------------------
                Third: 
    Lets generate json web token and respond with token on user signup. 
    First we need to install npm package jsonwebtoken

  - Step 1: require jsonwebtoken
    +  npm install jsonwebtoken --save-dev
    + // require json web token
      const JWT = require("jsonwebtoken");

  - Step 2: create a signToken method to genereate a token, 
      passing user as argument.

-------------------------------------------------
          Fourth: hash password before saving to database

  signup: {
    const salt = await bcrypt.genSalt(10);
    // generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(newUser.password, salt);
    // save password is hashed to database
    newUser.password = passwordHash;

    // after hashing password => add password is hashed to database
    await newUser.save(); 
  }
*/