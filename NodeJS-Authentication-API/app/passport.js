// Passport Authentication strategy using JSON web tokens

const passport = require('passport');

// https://www.npmjs.com/package/passport-jwt
const JwtStategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { JWT_SECRET } = require('./config/index');
const User = require('./models/user.model');

//require bcrypt
const bcrypt = require('bcryptjs');

// passport local-strategy to authenticate
// using username and password
/*
  https://mherman.org/blog/local-authentication-with-passport-and-express-4/
*/
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new JwtStategy(
    { 
      /* 
        - in my case in Angular: token is added into Header
        => should use ExtractJwt.fromAuthHeaderAsBearerToken();

        - use ExtractJwt to extract(trich xuat) token from the request

        - jwtFromRequest (REQUIRED) 
        + Function that accepts a request as the only 
          parameter and returns either the JWT as a string or null
      */
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },

    // payload represents whatever is in const token = JWT.sign(...)
    // payload.sub means JWT.sign({sub: newUser.id})
    async (payload, done) => {
      try {
        // find the user specified in token
        const user = await User.findById(payload.sub);

        // lf user doesn't exist, handle it
        if (!user) {
          return done(null, false);
        }

        // otherwise return the user
        done(null, user);
      } catch(error) {
        done(error, false);
      }
      
    }
  )
)

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        console.log("passport local strategy");
        // find the user specified in the given email
        const user = await User.findOne({email});

        // if use doesn't exist, handle it
        if (!user) {
          return done(null, false);
        } 

        // check if password is correct
        // For Security, Password must be encrypt
        // not a raw text
        // => if no, other developer can read Password
        // of user and scam user
        // Solution:using bcrypt before saving to database 
        // which is a standard practice
        
        console.log('passport.js', user.password);
        const isMatch = await bcrypt.compareSync(password, user.password);

        // if not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // otherwise , return the user
        done(null, user);
      } catch (error) {
        done(error, false);  
      }
    }
  )
)



/*
  https://mherman.org/blog/local-authentication-with-passport-and-express-4/
*/

/*
        Passport authentication strategy using 
                JSON web tokens
  // Passport Authentication strategy using JSON web tokens

const passport = require('passport');

// https://www.npmjs.com/package/passport-jwt
const JwtStategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { JWT_SECRET } = require('./config/index');
const User = require('./models/user.model');

passport.use(
  new JwtStategy(
    { 
      
      // - in my case in Angular: token is added into Header
      //  => should use ExtractJwt.fromAuthHeaderAsBearerToken();

      //  - use ExtractJwt to extract(trich xuat) token from the request

      //  - jwtFromRequest (REQUIRED) 
      //  + Function that accepts a request as the only 
      //    parameter and returns either the JWT as a string or null
     jwtFromRequest: ExtractJwt.fromHeader("authorization"),
     secretOrKey: JWT_SECRET
   },

   // payload represents whatever is in const token = JWT.sign(...)
   // payload.sub means JWT.sign({sub: newUser.id})
   async (payload, done) => {
     try {
       // find the user specified in token
       const user = await User.findById(payload.sub);

       // lf user doesn't exist, handle it
       if (!user) {
         return done(null, false);
       }

       // otherwise return the user
       done(null, user);
     } catch(error) {
       done(error, false);
     }
     
   }
 )
)
*/


/*
// passport local-strategy to authenticate
// using username and password

//  https://mherman.org/blog/local-authentication-with-passport-and-express-4/

const LocalStrategy = require('passport-local').Strategy;

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      // find the user specified in the given email
      const user = await User.findOne({email});

      // if use doesn't exist, handle it
      if (!user) {
        return done(null, false);
      } 

    }
  )
)

*/