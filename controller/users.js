const router = require('express').Router();
const ResetPassword = require('../model/ResetPassword');
const { User } = require('../model/index');
const { withAuth } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

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

    if (validUser.isAdmin) {
      req.session.isAdmin = true;
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
    res.redirect('/');
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

//route for password reset
router.post('/resetPassword', async (req, res) => {
  try {
    const finduser = await ResetPassword.findOne({
      where: { email: req.body.email }
    });

    let resetCode;
    let newReset;

    //checks if there is an active reset code for that user
    if (finduser) {
      resetCode = finduser.resetCode;
    } else {
      resetCode = uuidv4();

      newReset = await ResetPassword.create({
        email: req.body.email,
        resetCode: resetCode
      });
    }

    const resetUrl = req.body.url + '/users/newPass/' + resetCode;

    // Create a transporter object using your email service
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service (e.g., Gmail, Outlook)
      auth: {
        user: 'restropos1@gmail.com', // Your email address
        pass: 'kuiq qhjn qeir ikni' // Your email password or app-specific password
      }
    });

    // Compose email data
    const mailOptions = {
      from: 'restropos1@gmail.com', // Sender's email address
      to: req.body.email, // Recipient's email address
      subject: 'Reset Password', // Email subject
      text: `Use this following link to reset your Password: ${resetUrl}` // Email content (plain text)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(200).json({ message: 'reset link sent' });
  } catch (err) {
    res.status(400).json({ message: 'reset link not sent', errorr: err });
  }
});

//route for checking if reset code exists
router.get('/newPass/:code', async (req, res) => {
  try {
    //checks if reset code exists
    const resetUser = await ResetPassword.findOne({
      where: {
        resetCode: req.params.code
      }
    });

    if (resetUser) {
      res.status(200).render('newPassword', { email: resetUser.email });
    }
  } catch (error) {
    res.status(500).json({ message: 'reset request not found' });
  }
});

//route for updating password
router.put('/newPass', async (req, res) => {
  const { email, password } = req.body;

  try {
    const updatedUser = await User.update(
      {
        password: password
      },
      {
        where: {
          email: email
        }
      }
    );

    res.status(200).json({ message: 'password updated', user: updatedUser });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'password failed to be updated', error: err });
  }
});

module.exports = router;
