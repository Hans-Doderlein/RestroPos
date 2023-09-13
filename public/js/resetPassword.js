const resetForm = document.getElementById('resetPassword');

resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  console.log('reset button clicked');

  const email = document.getElementById('email').value.trim();

  function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

  if (!checkEmail(email)) {
    document.getElementById('error').textContent = 'Please input valid email';
    return;
  }

  await fetch('/users/resetPassword', {
    method: 'post',
    body: JSON.stringify({ email, url: window.location.origin }),
    headers: { 'Content-Type': 'application/json' }
  });
});
