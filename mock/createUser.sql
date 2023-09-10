payload to be sent back for creating a new user:

{
    username: a string, must be unique;
    email: must be in email format;
    password: at least 6 characters, must contain a number and a letter;

    (optional)
    isAdmin: only include if new user is an admin;
}