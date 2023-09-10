logging in POST:

200 = login ok;
404 = email or password not found;

signing up POST:

200 = user created;
400 = email format not correct (needs to be checked in front end before sending back);
400 = password rquiremnts not met (needs to be chekd in front end before sending back);
400 = username already taken (shoudl be checked in front end);
sent with message that contains specific ERRORS

new product POST:

200 = product created;
400 = missing some primary key value (will be sent in message)
in theory, all keys should be included before sending back

get routes:

200 = page will load;
404 = page not found;




