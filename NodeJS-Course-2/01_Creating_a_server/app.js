//https://www.youtube.com/watch?v=BBOUfdUZIVo&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=17
// Te Net Ninja

var http = require('http');

var server =  http.createServer(function(req, res) {
	console.log('request was made: ' + req.url);
	
	// response status and header
	// render server-side: text
	// using 'text/plain'

	res.writeHead(200, {'Content-type': 'text/plain'});
	res.end('Hey ninjas');
});

server.listen(3000);
console.log('yo dawgs, now listening to port 3000');