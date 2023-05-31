const { isAbsolute } = require('path');
const db = require('../models/index');
const { isArray } = require('util');

const User = db.user;

const addUser = async (req, res) => {
  //   const jane = User.build({ firstName: 'Robin' });
  const jane = await User.create({ firstName: 'Raman' });

  jane.firstName = 'kill';
  //still the name in DB is Raman
  jane.set({ lastName: 'bill' });
  //   await jane.reload();
  await jane.save(); // now the name in DB is kill
  console.log('jane was saved to DB');
  res.status(200).json(jane.toJSON());
};

const getUser = async (req, res) => {
  const data = await User.findOne({
    where: { id: req.params.id },
  });
  res.status(200).json({ data: data });
};

const getUsers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).json({ data: data });
};

const postUsers = async (req, res) => {
  const postBody = req.body;
  let data;
  if (isArray(postBody) && postBody.length > 0) {
    data = await User.bulkCreate(postBody);
  } else if (isArray(postBody) && postBody.length == 0)
    return res.status(200).json({ message: 'no data present' });
  else {
    data = await User.create(postBody);
  }
  res.status(200).json({ data: data });
};

const deleteUser = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).json({ message: 'deleted successfully!!' });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const data = await User.update(userData, {
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data });
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  postUsers,
  deleteUser,
  updateUser,
};
