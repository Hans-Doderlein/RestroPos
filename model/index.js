const Products = require('./Products');
const Orders = require('./Orders');
const User = require('./User');
const OrderProduct = require('./OrderProduct');

// user has many orders, orders belong to one user
User.hasMany(Orders, {
  foreignkey: 'userId'
});

Orders.belongsTo(User, {
  foreignkey: 'userId'
});

//orders has many products, products belongs to many orders
Orders.belongsToMany(Products, {
  through: OrderProduct
});

Products.belongsToMany(Orders, {
  through: OrderProduct
});

module.exports = { User, Products, Orders, OrderProduct };
