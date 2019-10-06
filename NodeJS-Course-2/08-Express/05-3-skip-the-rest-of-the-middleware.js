/*
    Feature 4: To skip the rest of the middleware funcs from
              a router middleware stack
              => call { next('route') }
*/

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
});