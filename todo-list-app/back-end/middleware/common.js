//middelware/common.js
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const setupMiddleware = (app) => {
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 app.use(morgan('dev'));

 app.use(cors({
    origin: 'http://localhost:3000',
 }));

};

module.exports = { setupMiddleware };