const express = require('express');

const app = express();

// NOTEEEEEEEEE:   it is contrast (mandatory)
app.get('/', function(req, res) {
    res.send('this is the homepage');
})

app.get('/contact', function(req, res) {
  res.send('this is the contact lalala');
})

app.listen(3000)