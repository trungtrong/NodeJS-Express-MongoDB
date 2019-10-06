/*
  Instead place all Tasks about routing in a ONE file 
  + We use ROUTER to split code minimum
  1 - the main file: we use app.express()

  2 - The sub-Router: we use router.express() for sub-routing
Application:
  + With User route: include /user/create ,...
  => we use ROUTER to contain all its sub-route
*/

// import the sub-route of /profile route using ROUTER 
const router = require('./using-Router/profile.router');

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

// Use ROUTER with /profile root ROUTE
app.use('/profile', router);

app.listen(3000);