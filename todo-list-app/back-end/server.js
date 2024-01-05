const express = require('express');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const Task = require('./models/tasks');
const { connectToDatabase } = require('./models/user');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task'); 


const app = express();

const { setupMiddleware } = require('./middleware/common');

setupMiddleware(app);

app.use(session({
 secret: process.env.SESSION_SECRET || '5301e97645b8c3e1d956a3f06e117213cc7a30a75e0b54298f830fd264e56b6a',
 resave: true,
 saveUninitialized: true,
}));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send({ error: err.toString() });
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

