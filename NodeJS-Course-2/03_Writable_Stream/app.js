var fs = require('fs');

var myReadStream = fs.createReadStream('./data.txt', 'utf8');
var myWriteStream = fs.createWriteStream('./writeme.txt');

myReadStream.on('data', function(chunk) {
	console.log('new chunk received');
	
	myWriteStream.write(chunk);
});
