const db = require('../models/index');

const User = db.user;

var addUser = async (req, res) => {
  //   const jane = User.build({ firstName: 'Robin' });
  const jane = await User.create({ firstName: 'Raman' });
  console.log(jane instanceof User);
  jane.firstName = 'kill';
  //still the name in DB is Raman
  jane.set({ lastName: 'bill' });
  //   await jane.reload();
  await jane.save(); // now the name in DB is kill
  await jane.destroy();
  console.log('jane was saved to DB');
  res.status(200).json(jane.toJSON());
};

module.exports = {
  addUser,
};
