const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controller');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

//set up express app
const app = express();
//set up port
const PORT = process.env.PORT || 8000;

//create session
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 10 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

//set up view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Register Handlebars partials
require('./utils/registerPartials'); 

//middelware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

//sync and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
