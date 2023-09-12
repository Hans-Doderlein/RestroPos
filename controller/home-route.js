const router = require('express').Router();

//on load, the login page will render automatically
router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;
