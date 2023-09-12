const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    server: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,

      references: {
        model: 'products',
        key: 'id'
      }
    },
    created_on: {
      type: Date,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'orders'
  }
);

module.exports = Orders;
