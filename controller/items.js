const { Products } = require('../model/index');
const { withAuth } = require('../utils/helpers');

const router = require('express').Router();

//this will render the newItem page
router.get('/new', withAuth, (req, res) => {
  res.render('newItem');
});

//this will create a new item and render the menu page on succesful creation
router.post('/new', withAuth, async (req, res) => {
  try {
    //create new product using info from the request body
    const newProduct = await Products.create(req.body);
    res.status(200).json({ message: 'product created', product: newProduct });
  } catch (error) {
    //logs error if there is one
    res.status(500).json({ message: 'product not created', error: error });
  }
});

module.exports = router;
