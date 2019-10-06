var fs = require('fs');
var http = require('http');

var server =  http.createServer(function(req, res) {
	console.log('request was made: ' + req.url);
	
	// response status and header
	// render server-side to client (browser): text
	// using 'text/plain'

	res.writeHead(200, {'Content-type': 'text/plain'});
	var myReadStream = fs.createReadStream('./data.txt', 'utf8');
	
	//
	myReadStream.pipe(res);
});

server.listen(3000);
console.log('yo dawgs, now listening to port 3000');