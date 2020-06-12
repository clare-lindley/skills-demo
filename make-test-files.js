const fs = require('fs');
const path = require('path');


// OK we have delete all files in a given dir and throw errors

// how to link this to the web audio API so we can stop it!

// how to handle the errors? Where to catch them?

const directory = 'test';
fs.readdir(directory, (err, files) => {
	if (err) throw err;

	for (let i=0; i<50; i++) {

		let filename = `test_${i}.txt`
		fs.writeFile(path.join(directory, filename), 'hello', (err) => {
			if (err) throw err;
		});
	}
});
