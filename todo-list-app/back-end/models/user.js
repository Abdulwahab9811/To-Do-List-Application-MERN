// models/user.js

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db(); // No need to specify dbName here if it's part of your connection URI
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

async function insertUser(user) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('Users');
  user.password = await bcrypt.hash(user.password, 12);
  await usersCollection.insertOne(user);
}

module.exports = { insertUser , connectToDatabase };



