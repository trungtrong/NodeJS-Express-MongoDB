/*
    Feature 4: Array of Middleware for reusability
*/

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
});