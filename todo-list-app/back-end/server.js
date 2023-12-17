const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();


const { connectToDatabase } = require('./models/user');
const authRoutes = require('./routes/auth');


const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session({
  secret: process.env.SESSION_SECRET || '5301e97645b8c3e1d956a3f06e117213cc7a30a75e0b54298f830fd264e56b6a',
  resave: true,
  saveUninitialized: true,
}));

app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri); // Move this line after setting uri

const startServer = async () => {
  try {
    await connectToDatabase();
    await client.connect();
    

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

startServer();
