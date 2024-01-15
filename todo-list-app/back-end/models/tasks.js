//models/task.js

// const { MongoClient } = require('mongodb');

// //const url = 'mongodb://localhost:27017';
// const dbName = 'taskDb';

// let db;

// const connectDB = async (client) => {
//   if (!db) {
//     db = client.db(dbName);
//   }
//   return db;
// };

// const Task = {
//   async getAllTasks (userId) {
//     const db = await connectDB(db);
//     const tasks = await db.collection('tasks').find({userId: MongoClient.ObjectID(userId)}).toArray();
//     return tasks;
//   },

//   async createTask(task, userId) {
//     const db = await connectDB(db);
//     const TaskWithUserId = {...task, userId : MongoClient.ObjectID(userId)};
//     const result = await db.collection('tasks').insertOne(TaskWithUserId );
//     return result.ops[0];
//   },

//   async updateTask(taskId, updates) {
//     const db = await connectDB(db);
//     const result = await db.collection('tasks').updateOne({ _id: MongoClient.ObjectID(taskId) }, { $set: updates });
//     return result.modifiedCount > 0;
//   },

//   async deleteTask(taskId) {
//     const db = await connectDB(db);
//     const result = await db.collection('tasks').deleteOne({ _id: MongoClient.ObjectID(taskId) });
//     return result.deletedCount > 0;
//   },
// };

// module.exports = Task;