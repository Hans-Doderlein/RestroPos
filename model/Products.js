const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Products extends Model {}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Name of dish
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Cost od dish
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    // allergy (any validation?)
    allergy: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'None'
    },
    // Clarify type
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    imgSRC: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'products'
  }
);

module.exports = Products;
