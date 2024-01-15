const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const app = express();

// Define connectToDatabase function before startServer
const connectToDatabase = async () => {
  try {
    // Your database connection code here
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

const startServer = async () => {
  try {
    await connectToDatabase();
    await client.connect();

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

// Middleware and route setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const authRoutes = require('./routes/auth');


app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", authRoutes);

startServer();
