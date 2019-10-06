var fs = require('fs');
var http = require('http');

var server =  http.createServer(function(req, res) {
	console.log('request was made: ' + req.url);
	
	// response status and header
	// render server-side to client (browser): HTML page
	// using 'text/HTML'

	res.writeHead(200, {'Content-type': 'text/html'});
	var myReadStream = fs.createReadStream('./index.html', 'utf8');
	
	//
	myReadStream.pipe(res);
});

server.listen(3000);
console.log('yo dawgs, now listening to port 3000');