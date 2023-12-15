const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cors = require('cors');
const { setupMiddleware } = require('./middleware/common');
const { connectToDatabase, } = require('./models/user');
const { getActiveUsers } = require('./controllers/userController');



// Import route handlers
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/users');





dotenv.config();

const app = express();

// Set up middleware first
setupMiddleware(app);

// Set up routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes); // Corrected the path

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the database and set up initial data
async function setupDatabase() {
  try {
    await connectToDatabase();
    
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}



app.get('/active-users', getActiveUsers);








const startServer = async () => {
  try {
    await setupDatabase(); // Connect to the database and set up initial data
    await client.connect();
    console.log('Connected to MongoDB');

    // Other setup or initialization code here

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process on error
  }
};

startServer();
