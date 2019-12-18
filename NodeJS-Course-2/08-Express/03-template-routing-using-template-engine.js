const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// NOTEEEEEEEEE:   it is contrast (mandatory)
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

/*
  inject some dynamic content from database into
  these pages and insert more data to view engine
*/

app.get('/profile/:name', (req, res) => {
    var data = {
        age: 29,
        job: 'ninja',
        hobbies: ['hiking', 'hanging out', 'riding']
    };

    res.render('profile', {
      person: req.params.name,
      data: data
    });
})

app.listen(3000);