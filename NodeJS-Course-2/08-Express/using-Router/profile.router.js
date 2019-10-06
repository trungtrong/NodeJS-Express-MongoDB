/*  @      3-2: Router-level Middleware
    @ Router-level middleware works in the same way as application-level middleware,
      except it is bound to an instance of { express.Router() }

          var router = express.Router();

    @ To load router -level middleware
   +  we use { router.use() } and { router.Method() func }
*/

const express = require('express');
const app = express();

// STEP 1:
const router = express.Router();

// STEP 2: declaring a series of Middleware funcs
// a middleware func with no mouth path. This code is executed for every request
//  to the router

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
})

// first middleware
// :id of profile route
router.use('/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
})

// second middleware: The Profile route
// :id of profile route
router.get('/:id', (req, res, next) => {
  if (req.params.id === '0') {
    res.send('la la la: Profile 0');
    next('route');

  } else next();
}, (req, res, next) => {

  res.send('profile ID');

});

router.get('/user/:name', (req, res) => {
  var data = {
      age: 29,
      job: 'ninja',
      hobbies: ['hiking', 'hanging out', 'riding']
  };

  res.render('profile', {
    person: req.params.name,
    data: data
  });
})

module.exports = router;