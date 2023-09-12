const { User } = require('../models');

const userdata = [
  {
    //id: '',
    isAdmin: true,
    username: 'Admin1',
    email: 'admin@cafe.com',
    password: 'Adminpassword',
  },
  ];

const seeduser = () => User.Create(userdata);

module.exports = seedUser;
