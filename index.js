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
app.get('/users/:id', userController.getUser);
app.get('/users', userController.getUsers);
app.post('/users', userController.postUsers);
app.delete('/users/:id', userController.deleteUser);
app.patch('/users/:id', userController.updateUser);
app.get('/query', userController.queryUser);
app.get('/one-to-one', userController.oneToOneUser);
app.get('/one-to-many', userController.oneToManyUser);
app.get('/many-to-many', userController.manyToManyUser);
app.get('/creator', userController.creator);
app.get('/m_n_association', userController.m_n_association);
app.get('/transaction', userController.transaction);

// User.sync({ force: true });
// Contact.sync({ force: true });

app.listen(3000, () => {
  console.log('server is listening on http://localhost:3000');
});
