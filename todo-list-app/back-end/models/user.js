const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
let client;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

async function closeConnection() {
  if (client) {
    await client.close();
    console.log('Closed MongoDB connection');
  }
}

async function insertUser(user) {
  try {
    const database = client.db('your-database-name'); // Replace with your actual database name
    const usersCollection = database.collection('users');

    const result = await usersCollection.insertOne(user);
    console.log(`User inserted with _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error('Error inserting user into MongoDB', error);
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const database = client.db('your-database-name'); // Replace with your actual database name
    const usersCollection = database.collection('users');

    const user = await usersCollection.findOne({ email });
    return user;
  } catch (error) {
    console.error('Error finding user by email in MongoDB', error);
    throw error;
  }
}

module.exports = { connectToDatabase, closeConnection, insertUser, findUserByEmail };
