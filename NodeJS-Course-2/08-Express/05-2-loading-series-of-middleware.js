/*
    Feature 3: Loading a series of middleware funcs at a mount point,
    with a mount path
    + It illustrates a middleware sub-stack
*/
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
}); 