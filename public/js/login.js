const LogIn = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Incorrect username or password. Please try again');
      }
    }
  };
  

  
  document
    .querySelector('.login-input')
    .addEventListener('submit', LogIn);
