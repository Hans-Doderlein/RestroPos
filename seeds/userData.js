const { User } = require('../model/index');
const sequelize = require('../config/connection');
const userdata = {
  isAdmin: true,
  username: 'Admin1',
  email: 'admin@cafe.com',
  password: 'Adminpassword'
};
const seedUser = async () => {
  await sequelize.sync({ force: false });
  await User.create(userdata);
};

module.exports = seedUser;
