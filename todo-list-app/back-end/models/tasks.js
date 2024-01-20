// models/task.js

const { connectToDatabase } = require('./user');
const { ObjectId } = require('mongodb');

async function insertTask(task) {
  const db = await connectToDatabase();
  const tasksCollection = db.collection('Tasks');
  await tasksCollection.insertOne(task);
}

async function getAllTasks(userId) {
  const db = await connectToDatabase();
  const tasksCollection = db.collection('Tasks');
  return tasksCollection.find({ userId }).toArray();
}

async function updateTask(taskId, updatedTaskData) {
  const db = await connectToDatabase();
  const tasksCollection = db.collection('Tasks');
  const result = await tasksCollection.findOneAndUpdate(
    { _id: new ObjectId(taskId) },
    { $set: updatedTaskData },
    { returnDocument: 'after' }
  );
  return result.value;
}

async function deleteTask(taskId) {
  const db = await connectToDatabase();
  const tasksCollection = db.collection('Tasks');
  await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
}

async function getTaskById(taskId) {
  const db = await connectToDatabase();
  const tasksCollection = db.collection('Tasks');
  return tasksCollection.findOne({ _id: new ObjectId(taskId) });
}




module.exports = { insertTask, getAllTasks , deleteTask , getTaskById , updateTask };
