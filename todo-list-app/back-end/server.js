const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();


const { connectToDatabase } = require('./models/user');
const { setupMiddleware } = require('./middleware/common.js');
const { requireAuth } = require('./middleware/authMiddleware');


const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');


const app = express();

setupMiddleware(app);


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Add this line to allow credentials
};

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session({
  secret: process.env.SESSION_SECRET || '5301e97645b8c3e1d956a3f06e117213cc7a30a75e0b54298f830fd264e56b6a',
  resave: false,
  saveUninitialized: true,
  
}));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); 

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});



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
