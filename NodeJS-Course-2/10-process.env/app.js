require('dotenv').config()

const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('this is the homepage');
})

app.get('/contact', function(req, res) {
  res.send('this is the contact lalala');
})

console.log(process.env.PORT);

app.listen(3000)