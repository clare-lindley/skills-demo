const fs = require('fs');
const path = require('path');

// express and 2 routes - index / and /delete
// index listens for delete command and runs this delete files module


// OK we have delete all files in a given dir and throw errors

// how to link this to the web audio API so we can stop it!

// how to handle the errors? Where to catch them?


exports.deleteFiles = function() {

	const directory = 'test';
	fs.readdir(directory, (err, files) => {
		if (err) throw err;

		for (const file of files) {

			console.log(`deleting ${path.join(directory, file)}`);

			fs.unlink(path.join(directory, file), err => {
				if (err) throw err;
			});
		}
	});

}
