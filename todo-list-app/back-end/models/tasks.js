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
 async getAllTasks (userId) {
    const db = await connectDB();
    const tasks = await db.collection('tasks').find({userId: NewObjectId(userId)}).toArray();
    return tasks;
 },

 async createTask(task, userId) {
    const db = await connectDB();
    const TaskWithUserId = {...Task, userId : NewObjectId(userId)};
    const result = await db.collection('tasks').insertOne(TaskWithUserId );
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