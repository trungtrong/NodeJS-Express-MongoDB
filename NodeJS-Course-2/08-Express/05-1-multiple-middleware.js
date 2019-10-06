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

app.listen(3000);