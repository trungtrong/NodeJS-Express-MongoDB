const express = require('express');

const app = express();

// NOTEEEEEEEEE:   it is contrast (mandatory)
app.get('/', function(req, res) {
    res.send('this is the home page - lesson 2');
})

app.get('/contact', function(req, res) {
    res.send('this is the contact - lesson 2');
})

// dynamic route
app.get('/profile/:id', function(req, res) {
    res.send('You requested to see a profile with id = ' + req.params.id);
})

app.listen(3000);