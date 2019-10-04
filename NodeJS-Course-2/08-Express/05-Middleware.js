/*
const express = require('express');
const app = express();

const myLogger = function(req, res, next) {
  console.log('Logged');
  next();
}

app.use(myLogger);

app.get('/', function(req, res) {
  res.send('Hello world');
})

app.get('/contact', function(req, res) {
  res.send('Contact');
})

app.listen(3000); */

/* ------------------------------------------------------------------ */
                        // Example 2: Multiple Middleware
/*
const express = require('express');
const app = express();

const requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  next();
}

app.use(requestTime);

const myLogger = function(req, res, next) {
  console.log('Logged');
  next();
}

app.use(myLogger);

app.get('/', function(req, res) {
  var responseText = 'HelloWorld!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
})

app.listen(3000); */

/* ------------------------------------------------------------------ */
                          // 3 - Using Middleware


// An Express application can use the following types of middleware:

// 3-1 : Application-level Middleware

  /*  Feature 1:
    The Middleware function <myLogger> below don't have <mouth-path>
    => That func will be always executed every time
      the app receives a request

const express = require('express');
const app = express();

const myLogger = function(req, res, next) {
  console.log('Logged');
  next();
}

app.use(myLogger);

app.get('/', function(req, res) {
  res.send('Hello world');
})

app.listen(3000); */

/****************************************************************/

  /* Feature 2: This example shows <a-Middleware-func>
          mounted on the </contact> path
    + The func is executed for any type of HTTP request on </contact> path
*/
/*
const express = require('express');
const app = express();

app.use('/', function(req, res, next) {
  console.log('request type:', req.method);
  res.send('Hello Ajinomoto');
  next()
});

app.listen(3000); */

/****************************************************************/
/*
    Feature 3: Loading a series of middleware funcs at a mount point,
    with a mount path
    + It illustrates a middleware sub-stack
*/
/*
const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  // ERROR occurs if we don't response anything
  res.send('Hello Ajinomoto');
  next();
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});  */

/****************************************************************/
/*
    Feature 4: To skip the rest of the middleware funcs from
              a router middleware stack
              => call { next('route') }
*/
/*
const express = require('express');
const app = express();

app.get('/profile/:id', (req, res, next) => {
  if (req.params.id === '0') {
    console.log(req.originalUrl);

    // b/c next('route') skip the rest of the middleware funcs
    // we need <response> if we don't want ERROR occurs
    res.send('Hello Ajinomoto');
    next('route');
  } else next();
}, (req, res, next) => {
  res.send('regular');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
}); */

/****************************************************************/
/*
    Feature 4: Array of Middleware for reusability
*/
/*
const express = require('express');
const app = express();

function logOriginalUrl(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log('Request Type:', req. method);
  next();
}

var logStuff = [logOriginalUrl, logMethod];

app.get('/', logStuff, (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
}); */

/****************************************************************/

/*  @      3-2: Router-level Middleware
    @ Router-level middleware works in the same way as application-level middleware,
      except it is bound to an instance of { express.Router() }

          var router = express.Router();

    @ To load router -level middleware
   +  we use { router.use() } and { router.Method() func }
*/

/*
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

router.use('/profile/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
})

router.get('/profile/:id', (req, res, next) => {
  if (req.params.id === '0') {

    res.send('la la la');
    next('route');

  } else next();
}, (req, res, next) => {

  res.send('profile');

});

app.listen('3000'); */


/****************************************************************/
          // 3-3. Error-handling middleware
/*
  https://expressjs.com/en/guide/error-handling.html

  - Express catches and processes ERRORs that occur both sync and async

*/
                  // Example 1:
/*
const express = require('express');
const app = express();

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
}); */

          /*---------------------------------------*/
                  // Example 2:
/*
const express = require('express');
const app = express();

app.get('/profile/:id', (req, res) => {
  if (req.params.id === '0') {
    throw new Error('Broken'); // Express will catch this on its own
  } else {
    res.send('Hello World!');
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
}); */


/*---------------------------------------*/
                  // Example 3:
/*
  CATCH ERRORs that occur in Async code (using try...catch)
   invoked by Route handlers
  or middleware and pass them to Express for processing
*/

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  setTimeout(function() {
    try {
      throw new Error('Broken')
    } catch (err) {
      next(err);
    }
  }, 3000);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});



/****************************************************************/
          // 3-4. Built-in middleware
/*
  - express.static:
    + serves static assets such as HTML files, images, and so on.
  - express.json :
    + parses incoming requests with JSON payloads.
      NOTE: Available with Express 4.16.0+
  - express.urlencoded: parses incoming requests with URL-encoded payloads.
      NOTE: Available with Express 4.16.0+

  Plug:  The list of middleware funcs
      https://github.com/senchalabs/connect#middleware
*/


/****************************************************************/
          // 3-5. Thirty-party middleware

/*
    The list of third-party middleware funcs
  + https://expressjs.com/en/resources/middleware.html

*/