var fs = require('fs');

var myReadStream = fs.createReadStream('./data.txt', 'utf8');
var myWriteStream = fs.createWriteStream('./writeme.txt');

/*
* pipe do the same thing:
Take data from READ Stream and pipe it into a WRITE Stream
Same as: 
myReadStream.on('data', function(chunk) {	
	myWriteStream.write(chunk);
});

*/
myReadStream.pipe(myWriteStream);
