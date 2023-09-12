/*
This module sets up a Sequelize database connection and dynamically 
loads models from '.js' files in the current directory.
*/

'use strict'; //enforce stricter set of Javascript rules to help catch mistakes

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Get base name of current file
const basename = path.basename(__filename);
// Retrieve the value of "NODE_ENV" environment variable. The code will default to 'development' if it is not defined.
const env = process.env.NODE_ENV || 'development';
// Load configuration file (JSON) based on the current environment (env).
const config = require(__dirname + '/../config/config.json')[env];
// Inintialize an empty object name 'db.' It will be used to store sequelize models.

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;