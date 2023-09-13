const nodemailer = require('nodemailer');
const { checkEmail } = require('./signup');

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: 'restropos1@gmail.com', // Your email address
    pass: 'kuiq qhjn qeir ikni' // Your email password or app-specific password
  }
});

// Send the email
function sendEmail(email, url) {
  // Compose email data
  const mailOptions = {
    from: 'restropos1@gmail.com', // Sender's email address
    to: email, // Recipient's email address
    subject: 'Reset Password', // Email subject
    text: `Use this following link to reset your Password: ${url}` // Email content (plain text)
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = { sendEmail };

const resetForm = document.getElementById('resetPassword').value.trim();

resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();

  if (!checkEmail(email)) {
    document.getElementById('error').textContent = 'Please input valid email';
    return;
  }

  await fetch('/users/resetPassword', {
    method: 'post',
    body: JSON.stringify({ email, url: window.location.hostname }),
    headers: { 'Content-Type': 'application/json' }
  });
});
