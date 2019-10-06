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
                          // 3 - Using Middleware


// An Express application can use the following types of middleware:

// 3-1 : Application-level Middleware

  /*  Feature 1:
    The Middleware function <myLogger> below don't have <mouth-path>
    => That func will be always executed every time
      the app receives a request */

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

app.listen(3000);

/****************************************************************/

  /* Feature 2: This example shows <a-Middleware-func>
          mounted on the </contact> path
    + The func is executed for any type of HTTP request on </contact> path
  s*/
/*
const express = require('express');
const app = express();

app.use('/', function(req, res, next) {
  console.log('request type:', req.method);
  res.send('Hello Ajinomoto');
  next()
});

app.listen(3000); */
