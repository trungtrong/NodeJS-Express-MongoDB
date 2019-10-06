/*
  Apply:
    + ejs : template engine
    + router
    + controller in MVC
*/
// import the sub-route of /profile route using ROUTER 
const router = require('./using-Router/profile.router');
const controller = require('./controllers/profile.controller');

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// Virtual path prefix
app.use('/assets', express.static('assets'));

app.get('/', controller.home);

app.get('/contact', controller.getContact);

// Use ROUTER with /profile root ROUTE
app.use('/profile', router);

app.listen(3000);