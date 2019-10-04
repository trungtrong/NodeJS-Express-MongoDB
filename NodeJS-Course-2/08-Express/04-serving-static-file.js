const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// Virtual path prefix
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

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