const router = require('express').Router();
const { User } = require('../model/index');
const { withAuth } = require('../utils/helpers');

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    //retrieves user using email
    const validUser = await User.findOne({
      where: {
        username: username
      }
    });

    //checks if user exists
    if (!validUser) {
      res.status(404).json({ message: 'Incorrect Email or Password' });
      return;
    }

    //compares password given vs user password
    const validPassword = await validUser.checkPassword(password);

    //checks if passwords are same
    if (!validPassword) {
      res.status(401).json({ message: 'Incorrect Email or Password' });
      return;
    }

    req.session.loggedIn = true;
    req.session.userId = validUser.id;
    req.session.username = validUser.username;

    res.status(200).json({ message: 'login successful', user: validUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get('/logout', withAuth, (req, res) => {
  req.session.destroy(() => {
    //redirects to homepage
    res.redirect('/menu');
  });
});

router.post('/signup', async (req, res) => {
  try {
    //creates new user
    const newUser = await User.create(req.body);

    //sets login status, username, and user id
    req.session.loggedIn = true;
    req.session.userId = newUser.id;
    req.session.username = newUser.username;

    res.status(200).json({ message: 'Signup sucessful', newUser: newUser });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get('/resetPassword', (req, res) => {
  res.render('resetPassword');
});

module.exports = router;
