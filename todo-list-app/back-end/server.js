// Import required libraries and modules
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

require('dotenv').config();

// MongoDB connection URI
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Express app
const app = express();

// Define connectToDatabase function
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

// Middleware and route setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//app.use(authMiddleware); 

app.use('/', authRoutes);
app.use('/api', taskRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', success: false });
});

// Start the server
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

// Call startServer to initiate the server
startServer();
