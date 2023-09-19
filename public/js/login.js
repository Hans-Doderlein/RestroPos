const LogIn = async (event) => {
  event.preventDefault();

  //grabs user input
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const error = document.querySelector('#error-login');

  //checks both fields are filled
  if (username && password) {
    //fetch to login
    const response = await fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      error.textContent = 'Incorrect username or password. Please try again';
    } else {
      document.location.replace('/menu');
    }
  }
};

document.querySelector('#login-input').addEventListener('submit', LogIn);
