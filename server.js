const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(8080, () => {
	console.log(`Сервер запущен на http://localhost:8080`);
});
