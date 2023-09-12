
const signUp = async (event) => {
    event.preventDefault();
 
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const passwordConfirm = document.querySelector('#confirmpassword-signup').value.trim()
    const error = document.querySelector('#error-signup')
  
    if (username && email && password) {
        if(password === passwordConfirm){
            if(validator(password)){
                const response = await fetch('/users/signup', {
                    method: 'POST',
                    body: JSON.stringify({ email, username , password }),
                    headers: { 'Content-Type': 'application/json' },
                });
  
                if (response.ok) {
                document.location.replace('/');
                } else {
                    error.textContent = 'Failed to sign up.';
                }
            }else {
                error.textContent = 'Password cannot contain special characters'
            }
        } else{
            error.textContent = 'Passwords do not match'
        }

    } else{
        error.textContent = 'Failed to Signup'
    }
  };

  const validator = (password) => {
    if(password.includes('/^[a-zA-Z0-9]+$/')){
        return true;
    } else {
        return false;
    }
  }

  document
    .querySelector('.signup-input')
    .addEventListener('submit', signUp);