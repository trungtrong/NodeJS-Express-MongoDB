// require express module
const express = require('express');
const app = express();

/* Morgan: HTTP request logger middleware for node.js
  to see friendly notifications in the terminal
  such as GET 'signup'
    https://www.npmjs.com/package/morgan
*/
const morgan = require('morgan');
// to extract body info frm HTTP headers
const bodyParser = require('body-parser');

const UsersRoute = require('./routes/user.route');

const cors = require('cors');


// require mongoose and connect to MongoDB
const mongoose = require('mongoose');
/*
  - nodeapi will be the name of the database
  + if it doesn't exist , will be created automatically
  + if you are using { mLab } , pass the url
*/


mongoose.connect(
  'mongodb+srv://trong:' + 'tr01664136504' +'@test-authentication-uefnp.mongodb.net/trong?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
).catch(error => console.log(error));


// middlewares
// use 'dev' format in console logs in terminal
app.use(morgan('dev')); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse json

app.use(cors());

// use routes: signup, signin, secret
app.use('/api', UsersRoute);

// example: make a normal API
// app.get('/api/users', (req, res, next) => {
//   res.json({
//     name: "Trong"
//   });
// })


// start the server on the given port
// process.env.PORT: domain such as github.io 
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server is listening on ${port}`);