const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

/* See Step in HTTP Cookie in Documentations

  STEP 1 -  When an user logged in at the first time
  + server will receive The auth info and will response
    the cookie for Auth
   and create(start) Session (phiên làm việc) of 
    that authenticated User
    https://expressjs.com/en/4x/api.html#res.cookie

  Syntax: res.cookie(name, value, [,options])

  STEP 2: And when an User reload that page
    + cookie will be sent with { Header } to server
      (in Request to server)
  ===> To read that Cookie, we use 
        { cookie-parser } middleware
    to read that cookie with the pattern : An Object

    + To use cookie-parser
    s1: npm install cookie-parser
    s2: var cookieParser = require('cookie-parser')
 
        var app = express()
        app.use(cookieParser())

*/

// using cookie-parser middleware
app.use(cookieParser());


app.get('/', (req, res) => {
  // Step 1: when user is logged in on the first time
  res.cookie('_user-id', 1234567);

  // Step 2: read the cookie from the request
  console.log('Cookies:', req.cookies);
  // then, we have: Cookies: { '_user-id': '1234567' }

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