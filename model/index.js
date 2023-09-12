const Products = require("./Products");
const Orders =require('./Orders')
const User = require('./User')


// user has many orders, orders belong to one user
User.hasMany(Orders, {
    foreignkey: 'server',

});

Orders.belongsTo(User, {
    foreignkey: 'server'
});

//orders has many products, products belongs to many orders
Orders.belongsToMany(Products, {
    foreignkey: 'product_id'
});

Products.belongsToMany(Orders, {
    foreignkey: 'order_id'
});

module.exports = {User, Products, Orders};