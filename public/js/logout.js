//

const logout = async () => {
    const response = await fetch('/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Any error occured please try again');
    }
  };
  
  document.querySelector('_____').addEventListener('click', logout);