/* to use POST method:
 we use "body parser" package 
	"body parser" is an additional middleware
	that passes incoming requests bodies in a middleware
	before our handle is available under the request body property
*/
const express = require('express');
var bodyParser = require('body-parser');

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
// create application /json parser
var jsonParser = bodyParser.json();
 


app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
	// when using res.render
	// it has to have index.ejs 
	res.render('index');
});

// POST request
// keep GET request to render contact.html

app.get('/contact', function(req, res) {
	res.render('contact', {queryString: req.query});
});

//POST /login gets urlencoded bodies
app.post('/contact', urlencodedParser, function(req, res) {
	console.log(req.body);
	/* result: [Object: null prototype] {
				name: 'ngo trung trong',
				department: 'IT',
				email: 'trong@gmail.com'	
	}
	*/
	console.log(typeof req.body);
	res.render('contact-success', {user: req.body});
});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  console.log(typeof req.body);
  /* result: [Object: null prototype] {
				name: 'ngo trung trong',
				department: 'IT',
				email: 'trong@gmail.com'	
	}
	*/
})


app.get('/profile/:name', function(req, res) {
	var data = {age: 29, job: 'ninja', hobbies: ['eating', 'swimming', 'hiking']};


	res.render('profile', {
		person: req.params.name,
		data: data
	});
})


app.listen(3000);



