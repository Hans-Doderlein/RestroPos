const sequelize = require('../config/connection');
const seedProducts = require('./productsData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedProducts();

  await seedUser();

  process.exit(0);
};

seedAll();
