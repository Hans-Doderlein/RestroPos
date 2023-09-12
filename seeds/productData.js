
const { Products } = require('../models');

const productsdata = [
  {
    name: 'Bruschetta',
    price:10.99,
    allergy: 'Dairy',
    type: 'Appetizer',
    imgSrc: '/images/bruschetta.jpg.jpg',
  },
  {
    name: 'Chicken Alfredo',
    price:12.99,
    allergy: 'Dairy',
    type: 'Main',
    imgSrc: '/images/chickenAlfredo.jpg.jpg',
  },
  {
    name: 'Chicken Parm',
    price:11.99,
    allergy: 'Dairy',
    type: 'Main',
    imgSrc: '/images/chickenParm.jpg.jpg',
  },
  {
    name: 'Cole Slaw',
    price:9.99,
    allergy: 'Dairy',
    type: 'Side',
    imgSrc: '/images/coleSlaw.jpg.jpg',
  },
  {
    name: 'Garlic Parmesan Fries',
    price:8.99,
    allergy: 'Dairy',
    type: 'Side',
    imgSrc: '/images/garlicparmesanFries.jpg.jpg',
  },
  {
    name: 'Grilled Salmon',
    price:13.99,
    allergy: 'Seafood',
    type: 'Main',
    imgSrc: '/images/grilledSalmon.jpg.jpg',
  },
  {
    name: 'Roastes Garlic Mashed Potatoes',
    price:9.99,
    allergy: '',
    type: 'Side',
    imgSrc: '/images/roastedgarlicmashedPotatoes.jpg.jpg',
  },
  {
    name: 'Spinach and Artichoke Dip',
    price:6.99,
    allergy: '',
    type: 'Side',
    imgSrc: '/images/spinachandartichokeDip.jpg.jpg',
  },
  {
    name: 'Stuffed Portbello Mushrooms',
    price:8.99,
    allergy: '',
    type: 'Side',
    imgSrc: '/images/stuffedportbelloMushrooms.jpg.jpg',
  },
  {
    name: 'Vegetable Stir Fry',
    price:10.99,
    allergy: '',
    type: 'Side',
    imgSrc: '/images/vegetablestirFry.jpg.jpg',
  },

];

const seedProducts = () => Products.bulkCreate(productsdata);

module.exports = seedProducts;
