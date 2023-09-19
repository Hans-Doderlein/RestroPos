const resetForm = document.getElementById('resetPassword');

resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  //grabs email input
  const email = document.getElementById('email').value.trim();

  function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

  //checks for valid email
  if (!checkEmail(email)) {
    document.getElementById('error').textContent = 'Please input valid email';
    return;
  }

  //fetch for requestinf reset password code
  await fetch('/users/resetPassword', {
    method: 'post',
    body: JSON.stringify({ email, url: window.location.origin }),
    headers: { 'Content-Type': 'application/json' }
  });
});
