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