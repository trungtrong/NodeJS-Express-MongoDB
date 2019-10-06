const authRoute = require('./routes/auth.routes');
const express = require('express');

// connect mongoose

const app = express();

// using ejs
app.set('view engine', 'ejs');

// serving static file


app.use('/', authRoute);

app.listen(3000);

