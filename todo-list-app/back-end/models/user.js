const { MongoClient, ObjectID } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

async function createUser(user) {
  const database = client.db('Database'); // Replace with your actual database name
  const usersCollection = database.collection('users');

  try {
    const result = await usersCollection.insertOne(user);
    console.log(`User inserted with _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error('Error inserting user', error);

  }

}
const newUser = {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashedPassword',
  };

createUser(newUser);

// Add more functions for CRUD operations as needed

module.exports = { connectToDatabase, createUser };
