//checks if user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
  } else {
    next();
  }
};

//checks if user is an admin
const withAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    res.redirect('/menu');
  } else {
    next();
  }
};

const getDate = () => {
  // Create a new Date object
  const today = new Date();

  // Get the current year, month, and day
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based
  const day = today.getDate();

  // Format the date as desired
  const formattedDate = `${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}-${year}`;

  return formattedDate;
};

//format time for handlebar display
function format_time(date) {
  const dateArray = date.toString().split(' ');
  return dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2];
}

module.exports = { withAuth, getDate, withAdmin, format_time };
