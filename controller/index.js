const router = require('express').Router();
const homeRoutes = require('./home-route.js');
const userRoutes = require('./users.js');
const itemsRoutes = require('./items.js');
const menuRoutes = require('./menu.js');
const orderRoutes = require('./orders.js');

//routing
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/items', itemsRoutes);
router.use('/menu', menuRoutes);

module.exports = router;
