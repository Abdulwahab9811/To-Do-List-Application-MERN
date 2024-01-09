// models/tasks.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'taskDb';

let db;

const connectDB = async () => {
 if (!db) {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
 }
 return db;
};

const Task = {
 async getAllTasks() {
    const db = await connectDB();
    const tasks = await db.collection('tasks').find().toArray();
    return tasks;
 },

 async createTask(task) {
    const db = await connectDB();
    const result = await db.collection('tasks').insertOne(task);
    return result.ops[0];
 },

 async updateTask(taskId, updates) {
    const db = await connectDB();
    const result = await db.collection('tasks').updateOne({ _id: new ObjectId(taskId) }, { $set: updates });
    return result.modifiedCount > 0;
 },

 async deleteTask(taskId) {
    const db = await connectDB();
    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(taskId) });
    return result.deletedCount > 0;
 },
};

module.exports = Task;