1 - DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

======> Solution:
mongoose.connect(config.dbUri, {
  useCreateIndex: true,
  useNewUrlParser: true
})

https://github.com/Automattic/mongoose/issues/6890#event-1809058906

------------------------------------------------

2 - Error Message: MongoError: bad auth Authentication failed through URI string

======> Solution:
const password = process.env.YOURPASSWORDVARIABLE
const db = 'mongodb+srv://david:'+password+'@cluster0-re3gq.mongodb.net/test?retryWrites=true

------------------------------------------------
3: test-authentication-shard-00-01-uefnp.mongodb.net:27017

======> Solution:
Basically, substitute /admin in the connection string to the name of your cluster in MongoDB Atlas.
==> mongodb.net/trong?retryWrites=true&w=majority
                  ^
                  |

------------------------------------------------
4 - ValidationError: "username" is not allowed
======> Solution: in routeHelpers : Joi

    // define schemas object
    schemas : {
      authSchema: Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required(),
        username: Joi.string() /////// adding username
      })
    }

------------------------------------------------
5- Response: "unauthorized"
But if you remove the token and try accessing the secret page, you get unauthorized. 