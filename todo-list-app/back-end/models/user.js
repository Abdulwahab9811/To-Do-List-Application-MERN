// models/user.js

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);



async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db("Database"); 
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

async function insertUser(user) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('Users');
  await usersCollection.insertOne(user);
}

module.exports = { insertUser , connectToDatabase };



