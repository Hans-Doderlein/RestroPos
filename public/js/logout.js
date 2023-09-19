const logout = async () => {
  //post fetch for loggin out and resetting req.session
  const response = await fetch('/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('An error occured please try again');
  }
};

document.querySelector('#logoutLink').addEventListener('click', logout);
