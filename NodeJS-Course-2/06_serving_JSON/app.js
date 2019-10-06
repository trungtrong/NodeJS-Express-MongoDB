var fs = require('fs');
var http = require('http');

var server =  http.createServer(function(req, res) {
	console.log('request was made: ' + req.url);
	
	// response status and header
	// render server-side to client (browser): json
	// "application/json"
	res.writeHead(200, {'Content-type': 'application/json'});
	var myObj = {
		name: 'Ruy',
		job: 'ninja'
	}
	
	res.end(JSON.stringify(myObj));
});

server.listen(3000);
console.log('yo dawgs, now listening to port 3000');