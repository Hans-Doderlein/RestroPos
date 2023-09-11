const router = require('express').Router();

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //retrieves user using email
    const validUser = await Users.findOne({
      where: {
        email: email
      }
    });

    //checks if user exists
    if (!validUser) {
      res.status(404).json({ message: 'Incorrect Email or Password' });
      return;
    }

    //compares password given vs user password
    const validPassword = await validUser.checkPassword(password);

    //checs if oasswirds are same
    if (!validPassword) {
      res.status(401).json({ message: 'Incorrect Email or Password' });
      return;
    }

    req.session.loggedIn = true;
    req.session.userId = validUser.id;
    req.session.username = validUser.username;

    res
      .status(200)
      .json({ message: 'login successful', user_id: validUser.id });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
module.exports = router;
