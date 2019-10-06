var fs = require('fs');
var http = require('http');

var server =  http.createServer(function(req, res) {
	console.log('request was made: ' + req.url);
	
	if (req.url === '/home' || req.url === '/') {

		res.writeHead(200, {'Content-type': 'text/html'});
		fs.createReadStream('./index.html').pipe(res);

	} else if(req.url === '/api/ninjas') {

		var ninjas = [{
			name: 'Trong',
			age: 20
		}];

		res.writeHead(200, {'Content-type': 'application/json'});
		res.end(JSON.stringify(ninjas, null, 2));
		
	} else {
		// If wrong url => response 404 status
		// and render PageNot Found

		res.writeHead(404, {'Content-type': 'text/html'});
		fs.createReadStream('./PageNotFound.html').pipe(res);
	}

});

server.listen(3000);
console.log('yo dawgs, now listening to port 3000');