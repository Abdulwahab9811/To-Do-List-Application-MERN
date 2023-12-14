
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function importData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db(); 

    // Import data into the "users" collection
    const hashedPassword1 = await bcrypt.hash('password1', 10); // Use bcrypt to hash passwords
    const hashedPassword2 = await bcrypt.hash('password2', 10);

    await database.collection('Users').insertMany([
      // Your user data objects here
      { email: 'user1@example.com', password: hashedPassword1 },
      { email: 'user2@example.com', password: hashedPassword2 },
    ]);

    // Import data into the "tasks" collection
    await database.collection('Tasks').insertMany([
      // Your task data objects here
      {
        taskName: 'Task 1',
        description: 'Description 1',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: 'Task 2',
        description: 'Description 2',
        userId: 'user2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Import data into the "notifications" collection
    await database.collection('Notifications').insertMany([
      // Your notification data objects here
      { userId: 'user1', message: 'Notification 1', createdAt: new Date() },
      { userId: 'user2', message: 'Notification 2', createdAt: new Date() },
    ]);

    console.log('Data imported successfully');
  } finally {
    await client.close();
  }
}

// Run the importData function
importData();

