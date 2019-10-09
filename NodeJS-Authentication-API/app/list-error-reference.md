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
======> Solution: But if you remove the token and try accessing the secret page, you get unauthorized. \

------------------------------------------------
6 - POST /api/users/register 400 1916.892 ms - 1106
SyntaxError: Unexpected token e in JSON at position 3

======> Solution: JSON that we use to send by Postman
  must be "email": "trongngo"

------------------------------------------------
7-  SyntaxError: Unexpected string in JSON at position 33

{
	"email": "trong05@gmail.com",    <-- must have comma
	"password": "tr123456789"   <== dont have comma
}

// Reference: https://filosophy.org/code/fixing-syntaxerror-unexpected-string-token-in-json-at-position/
