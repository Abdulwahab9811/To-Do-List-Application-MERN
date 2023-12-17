const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');

const setupMiddleware = (app) => {
    // Session Configuration
    app.use(session({
        secret: '5301e97645b8c3e1d956a3f06e117213cc7a30a75e0b54298f830fd264e56b6a',
        resave: true,
        saveUninitialized: true,
    }));

    // Body Parser Configuration
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Morgan for Logging
    app.use(morgan('dev'));

    // CORS Configuration
    app.use(cors({
        origin: 'http://localhost:3000',
    }));

    // Custom Middleware for Authentication
    app.use((req, res, next) => {
        console.log('Initial Session:', req.session); // Log the initial session
        console.log('Session:', req.session); // Log the session object for debugging

        if (req.session && req.session.userId) {
            console.log('Authenticated User:', req.session.userId); // Log the authenticated user
            next();
        } else {
            console.log('Unauthorized Access'); // Log unauthorized access
            res.status(401).json({ error: 'Unauthorized' });
        }
    });

    // Set Custom Header
    app.use((req, res, next) => {
        res.setHeader('X-Powered-By', 'MyTodoListApp');
        next();
    });

    // Error Handling Middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    });
};

module.exports = { setupMiddleware };
