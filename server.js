const express = require('express');
const path = require('path');
const app = express();


// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, '../src')));
//
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(8080, () => {
	console.log(`Сервер запущен на http://localhost:8080`);
});
