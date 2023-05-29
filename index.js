const express = require('express');
const bodyParser = require('body-parser');

require('./models');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html' });
  res.status(200).send('<h1>hello</h1>');
});

app.listen(3000, () => {
  console.log('server is listening on http://localhost:3000');
});
