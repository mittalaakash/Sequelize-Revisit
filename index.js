const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

// const User = require('./models/user');
// const Contact = require('./models/contact');
//removing above imports and requiring only model/index file
// require('./models');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html' });
  res.status(200).send(`<h1 style="
  background-color: red;
  font-size: 12em;
  text-transform:uppercase;
">hello world</h1>`);
});

app.get('/add', userController.addUser);

// User.sync({ force: true });
// Contact.sync({ force: true });

app.listen(3000, () => {
  console.log('server is listening on http://localhost:3000');
});
