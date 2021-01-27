const express = require('express');
// const credentials = require('./credentials.js');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
});

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

// app.get('/credentials', function (req, res) {
//   res.send(credentials);
// });