const express = require('express');
const controller = require('../controllers/auth.controller');

// using body parser to handle POST request
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
// create application /json parser
var jsonParser = bodyParser.json();

const router = express.Router();

router.get('/login', controller.login);

router.post('/login', jsonParser, controller.postLogin)

module.exports = router;

