//middelware/common.js
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const setupMiddleware = (app) => {
 app.use(session({
    secret: '5301e97645b8c3e1d956a3f06e117213cc7a30a75e0b54298f830fd264e56b6a',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Make sure to set this to false for development
    },
    credentials: true, // Add this line
 }));

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.use(morgan('dev'));

 app.use(cors({
    origin: 'http://localhost:3000',
 }));


};

module.exports = { setupMiddleware };
