const signUp = async (event) => {
  event.preventDefault();

  //grab user input
  const error = document.querySelector('#error-signup');
  const email = document.querySelector('#email-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordConfirm = document
    .querySelector('#confirmpassword-signup')
    .value.trim();

  //checks for all fields filled
  if (username && email && password) {
    if (!checkEmail(email)) {
      error.textContent = 'Please use a valid email';
    }

    //checks if confirm and password are the same, and checks for valid password requirement
    if (password === passwordConfirm) {
      if (checkPassword(password)) {
        try {
          //fetch for adding new user
          const res = await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' }
          });

          if (res.ok) {
            document.location.replace('/');
          }
        } catch (err) {
          error.textContent = 'Failed to sign up.';
        }
      } else {
        error.textContent = 'Password cannot contain special characters';
      }
    } else {
      error.textContent = 'Passwords do not match';
    }
  } else {
    error.textContent = 'Failed to Signup';
  }
};

//function for checking password format
const checkPassword = (password) => {
  const passRegex = /[A-Z]|[a-z]|[0-9]/;

  return passRegex.test(password);
};

//function for checking email format
const checkEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

const signupForm = document.getElementById('signup-input');
signupForm.addEventListener('submit', signUp);
