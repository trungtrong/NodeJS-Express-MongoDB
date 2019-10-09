const Joi = require('joi');

/*
  - We use this below validation inside routes/users.js
  + validate all required info
*/

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      console.log(req.body);
      
      if (result.error) {

        console.log(result.error);
        return res.status(400).json(result.error);
      }

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
        username: Joi.string(),
        bio: Joi.string(),
        image: Joi.string()
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