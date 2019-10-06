/*
			Query strings
- Query strings is:
	+ is just additional data added on a HTTP request in the form
	of name, value pairs
	Ex: - mysite.com/blog/new?page=2
		+ Page = 2
		- mysite.com/contact?person=trong&dept=marketing

- When we make a request like that, we pass on this additional information

- All we need to do is parse the request and pull out this data

*/
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
	// when using res.render
	// it has to have index.ejs 
	res.render('index');
});

app.get('/contact', function(req, res) {
	// using req.query property to get query string
	// b/c req contains URL
	
	/*console.log(req.query);
		ex: localhost:3000/contact?name=trong&dept=it
		we have: 
		req.query	= {name: 'trong', dept: 'it'} 
	*/
 
	/*
	 inject  property's data of query string to template contact.ejs
	 		<p>Hello <%=queryString.name %></p>
	*/
	res.render('contact', {queryString: req.query});
});

app.get('/profile/:name', function(req, res) {
	var data = {age: 29, job: 'ninja', hobbies: ['eating', 'swimming', 'hiking']};


	res.render('profile', {
		person: req.params.name,
		data: data
	});
})


app.listen(3000);



