const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');


const setupMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));


    app.use(morgan('dev'));

    app.use(cors());

    app.use(session({
        secret: 'f214500579316c2afbe845eecaed196970c64160b053445ad3a7bf5a252314ff',
        resave: true,
        saveUninitialized: true,
    }));

    app.use((req,res,next) => {

        if(req.session.userId) {
            next()
        }else{
            res.status(401).json({error : 'Unauthorized'});
        }
    });

    app.use((req, res, next) => {
        res.setHeader('X-Powered-By', 'MyTodoListApp');
        next();
      });
    
      // Example: Middleware for handling errors
      app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
      });
    
    
};


module.exports = { setupMiddleware };

