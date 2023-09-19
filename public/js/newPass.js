const newPassForm = document.getElementById('resetPassForm');

newPassForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  //grabs user input
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password-reset').value.trim();
  const conPass = document.getElementById('confirmPassword-reset').value.trim();
  const err = document.getElementById('error-reset');

  //shecks if password and confirm password are same
  if (!(password === conPass)) {
    err.textContent = 'Passwords do not match';
  }

  //if there are, update the password
  const res = await fetch('/users/newPass', {
    method: 'put',
    body: JSON.stringify({ email, password }),
    headers: { 'content-type': 'application/json' }
  });

  if (res.ok) {
    document.location.replace('/users/logout');
  }
});
