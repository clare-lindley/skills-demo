const express = require('express')
const app = express()
const port = 3000
const file_ops = require('./API/delete-files');

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// 1. handler
app.get('/delete-files', (req, res) => {
	file_ops.deleteFiles();
	res.status(200).send('OK BABY');
});

// 2. make the request! Call it from the speech api bit!

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
