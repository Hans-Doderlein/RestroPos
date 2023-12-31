require('dotenv').config();

const Sequelize = require('sequelize');

//set up connection to sequalize using environmental variables
const sequelize = process.env.CLEARDB_DATABASE_URL
    ? new Sequelize(process.env.CLEARDB_DATABASE_URL)
    : new Sequelize(
          process.env.DB_NAME,
          process.env.DB_USER,
          process.env.DB_PASSWORD,
          {
              host: 'localhost',
              dialect: 'mysql',
              dialectOptions: {
                  decimalNumbers: true
              }
          }
      );

module.exports = sequelize;
