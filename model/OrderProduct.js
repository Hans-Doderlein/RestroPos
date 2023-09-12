const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderProduct extends Model {}

OrderProduct.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'orderproduct'
  }
);

module.exports = OrderProduct;
