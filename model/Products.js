const { Model, DataTypes } = require('sequelize');
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
      type: DataTypes.DECIMAL(4, 2),
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

    img_s_r_c: {
      type: DataTypes.STRING
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
