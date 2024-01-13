//models/user.js
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
let client;

async function connectToDatabase() {
 try {
    console.log('Connecting to MongoDB with URI:', uri);
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
 } catch (error) {
    console.error('Error connecting to MongoDB', error);
 }
}

async function closeConnection() {
 try {
    if (client) {
      await client.close();
      console.log('Closed MongoDB connection');
    }
 } catch (error) {
    console.error('Error closing MongoDB connection', error);
 }
}

async function insertUser(user) {
 try {
    const database = client.db('Database'); // Replace with your actual database name
    const usersCollection = database.collection('Users');

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
    const user = await client.db('Database').collection('Users').findOne({ email: email });
    return user;
 } catch (error) {
    console.error('Error finding user by email in MongoDB', error);
    throw error;
 }
}

async function findUserByUsername(username) {
 try {
    const user = await client.db('Database').collection('Users').findOne({ username: username });
    return user;
 } catch (error) {
    console.error('Error finding user by username in MongoDB', error);
    throw error;
 }
}

async function findUserById(id) {
 try {
    const user = await client.db('Database').collection('Users').findOne({ _id: ObjectId(id) });
    return user;
 } catch (error) {
    console.error('Error finding user by id in MongoDB', error);
    throw error;
 }
}

module.exports = { connectToDatabase, closeConnection, insertUser, findUserByEmail, findUserByUsername, findUserById };