const { QueryTypes } = require('sequelize');
const db = require('../models/index');
const { isArray } = require('util');

const User = db.user;
const Contact = db.contact;
const Education = db.education;

const addUser = async (req, res) => {
  const jane = User.build({ firstName: 'Robins' });
  // const jane = await User.create({ firstName: 'Rome' });

  // jane.firstName = 'kill';
  //still the name in DB is Raman
  // jane.set({ lastName: 'bill' });
  //   await jane.reload();
  await jane.save(); // now the name in DB is kill
  console.log('jane was saved to DB');
  console.log(jane.toJSON());
  res.status(200).json({ data: jane.toJSON() });
};

const getUser = async (req, res) => {
  const data = await User.findOne({
    where: { id: req.params.id },
  });
  // const contact = await data.getContactDetails(); //  lazy loading
  // console.log(contact.permanentAddress);
  res.status(200).json({ data: data });
};

const getUsers = async (req, res) => {
  const data = await User.findAll({
    // include: { all: true }, fetches all User associated models
    include: {
      model: Contact,
      as: 'contactDetails',
      // where: { permanentAddress: 'asdf' },
    },
    //   [
    //   //nested eager loading
    //   {
    //     model: Contact,
    //     as: 'contactDetails',
    //     // include: {
    //     //   model: Education,
    //     // },
    //   },
    // ],
  });
  res.status(200).json({ data: data });
};

const postUsers = async (req, res) => {
  const postBody = req.body;
  let data;
  let messages = {};
  try {
    if (isArray(postBody) && postBody.length > 0) {
      data = await User.bulkCreate(postBody);
    } else if (isArray(postBody) && postBody.length == 0)
      return res.status(200).json({ message: 'no data present' });
    else {
      data = await User.create(postBody);
      if (data && data.id) {
        await Contact.create({
          userId: data.id,
          permanentAddress: postBody.firstName,
          currentAddress: postBody.lastName,
        });
      }
    }
  } catch (e) {
    let message;

    e.errors.forEach(error => {
      console.log(error);
      switch (error.validatorKey) {
        case 'not_unique':
          message = 'Already exists';
          break;
        case 'isAlpha':
          message = 'only alphabets are allowed';
          break;
        case 'isLowercase':
          message = error.message || 'only lower case letters allowed'; //error.message from model definition
          break;
        case 'len':
          message = error.message || 'should be 2 to 10 characters in length';
          break;

        default:
          break;
      }
      console.log({ message: error.validatorKey });
      messages[error.path] = message;
    });
  }
  res.status(200).json({ data: data, message: messages });
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
  const userData = req.body;
  const data = await User.update(userData, {
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data });
};

const queryUser = async (req, res) => {
  // const data = await db.sequelize.query('SELECT * FROM `users`', {
  //   type: QueryTypes.SELECT,
  //   model: User, //used when we have to use Model definition
  //   mapToModel: true, //if mapped fields are present
  //   raw: false, //true: if we don't have model definition
  // });
  const data = await db.sequelize.query(
    'SELECT * FROM users WHERE first_name LIKE :search_name',
    {
      replacements: { search_name: 'ss%' },
      model: User, //used when we have to use Model definition
      mapToModel: true, //if mapped fields are present
      raw: false, //true: if we don't have model definition
    },
  );
  res.status(200).json({ data: data });
};

const oneToOneUser = async (req, res) => {
  // const data = await User.create({ firstName: 'rahul', lastName: 'kumar' });

  // if (data && data.id) {
  //   await Contact.create({
  //     // userId: data.id,
  //     permanentAddress: 'jaipur',
  //     currentAddress: 'kota',
  //   });
  // }

  //fetching contact inside user
  const data = await User.findAll({
    attributes: ['firstName', 'lastName'],
    include: [
      {
        model: Contact,
        as: 'contactDetails',
        attributes: ['permanentAddress', 'currentAddress'],
      },
    ],
  });

  //fetching user inside contact
  // const data = await Contact.findAll({
  //   attributes: ['permanentAddress', 'currentAddress'],
  //   include: [
  //     {
  //       model: User,
  //       as: 'userDetails',
  //       attributes: ['firstName', 'lastName'],
  //     },
  //   ],
  // });
  res.status(200).json({ data });
};

const oneToManyUser = async (req, res) => {
  // const data = await User.findAll({
  //   attributes: ['firstName', 'lastName'],
  //   include: [
  //     {
  //       model: Contact,
  //       as: 'contactDetails',
  //       attributes: ['permanentAddress', 'currentAddress'],
  //     },
  //   ],
  // });

  const data = await Contact.findAll({
    attributes: ['permanentAddress', 'currentAddress'],
    include: [
      {
        model: User,
        as: 'userDetails',
        attributes: ['firstName', 'lastName'],
      },
    ],
  });

  res.status(200).json({ data });
};
const manyToManyUser = async (req, res) => {
  // const data = await User.create({ firstName: 'anyu', lastName: 'gup' });

  // if (data && data.id) {
  //   await Contact.create({
  //     permanentAddress: 'JK',
  //     currentAddress: 'AP',
  //   });
  // }

  const data = await User.findAll({
    attributes: ['firstName', 'lastName'],
    include: [
      {
        model: Contact,
        attributes: ['permanentAddress', 'currentAddress'],
      },
    ],
  });

  // const data = await Contact.findAll({
  //   attributes: ['permanentAddress', 'currentAddress'],
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['firstName', 'lastName'],
  //     },
  //   ],
  // });

  res.status(200).json({ data });
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  postUsers,
  deleteUser,
  updateUser,
  queryUser,
  oneToOneUser,
  oneToManyUser,
  manyToManyUser,
};
