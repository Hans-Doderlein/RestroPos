const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Products extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    server: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"user",
        key:"id"
      }
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    
      references:{
        model:"products",
        key:"id"
      }
    },
    creared_on: {
      type: Date,
      allowNull: false,
    
    },
    
  },
  {
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'orders',
  }
);

module.exports = Orders;
