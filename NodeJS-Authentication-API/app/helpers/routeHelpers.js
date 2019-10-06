const Joi = require('joi');

/*
  - We use this below validation inside routes/users.js
*/

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      // validate the incoming req.body using Joi.Validate()
      // passing arguments - req.body and schema
      const result = Joi.validate(req.body, schema);
      console.log(req.body);
      // on error
      if (result.error) {
        /*
          respond with 400 status code and error in 
            json format
        */
        console.log(result.error);
        return res.status(400).json(result.error);
      }

      /*
        - attach value property to { res } object
        - our goal is to use validated data
        ( res.value.body ) instead of direct (res.body)
      */
      if (!req.value) {
        req.value = {};
      }

      req.value["body"] = result.value;
      next();
    }
  },
    // define schemas object
    schemas : {
      authSchema: Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required(),
        username: Joi.string()
      })
    }
};

/* Result:
  result.error = {
    "isJoi": true,
    "name": "ValidationError",
    "details": [
        {
            "message": "\"email\" must be a valid email",
            "path": [
                "email"
            ],
            "type": "string.email",
            "context": {
                "value": "test01",
                "key": "email",
                "label": "email"
            }
        }
    ],
    "_object": {
        "email": "test01",
        "password": "password"
    }
}


*/