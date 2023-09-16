const { Products } = require('../model/index');
const sequelize = require('../config/connection');
const productsdata = [
  {
    name: 'Bruschetta',
    price: 10.99,
    allergy: 'Dairy',
    type: 'Appetizer',
    img_s_r_c: '/images/bruschetta.jpg.jpg'
  },
  {
    name: 'Chicken Alfredo',
    price: 12.99,
    allergy: 'Dairy',
    type: 'Main',
    img_s_r_c: '/images/chickenAlfredo.jpg.jpg'
  },
  {
    name: 'Chicken Parm',
    price: 11.99,
    allergy: 'Dairy',
    type: 'Main',
    img_s_r_c: '/images/chickenParm.jpeg'
  },
  {
    name: 'Cole Slaw',
    price: 9.99,
    allergy: 'Dairy',
    type: 'Side',
    img_s_r_c: '/images/coleSlaw.jpg.jpg'
  },
  {
    name: 'Garlic Parmesan Fries',
    price: 8.99,
    allergy: 'Dairy',
    type: 'Side',
    img_s_r_c: '/images/garlicparmesanFries.jpg.jpg'
  },
  {
    name: 'Grilled Salmon',
    price: 13.99,
    allergy: 'Seafood',
    type: 'Main',
    img_s_r_c: '/images/grilledSalmon.jpg.jpg'
  },
  {
    name: 'Roasted Garlic Mashed Potatoes',
    price: 9.99,
    allergy: 'None',
    type: 'Side',
    img_s_r_c: '/images/roastedgarlicmashedPotatoes.jpg.jpg'
  },
  {
    name: 'Spinach and Artichoke Dip',
    price: 6.99,
    allergy: 'None',
    type: 'Side',
    img_s_r_c: '/images/spinachandartichokeDip.jpg.jpg'
  },
  {
    name: 'Stuffed Portbello Mushrooms',
    price: 8.99,
    allergy: 'Mushroom',
    type: 'Side',
    img_s_r_c: '/images/stuffedportobelloMushrooms.jpg.jpg'
  },
  {
    name: 'Vegetable Stir Fry',
    price: 10.99,
    allergy: 'None',
    type: 'Side',
    img_s_r_c: '/images/vegetablestirFry.jpg.jpg'
  }
];

const seedProducts = async () => {
  await sequelize.sync({ force: false });
  await Products.bulkCreate(productsdata);
};

module.exports = seedProducts;
