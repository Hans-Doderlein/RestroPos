const { Products } = require('../model/index');
const { withAuth } = require('../utils/helpers');

const router = require('express').Router();

//retrieves products and loads them into the menu page
router.get('/', withAuth, async (req, res) => {
  try {
    //retrieves products from table
    const menu = await Products.findAll();

    //serializes products
    const items = menu.map((item) => item.get({ plain: true }));
    console.log('items', items);
    console.log('isAdmin', req.session.isAdmin);
    //loads menu with retrieved data
    res
      .status(200)

      .render('menu', { items, isAdmin: req.session.isAdmin });
  } catch (error) {}
});

module.exports = router;
