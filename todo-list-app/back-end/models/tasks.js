// models/task.js

const { connectToDatabase } = require('./user');

async function insertTask(task) {
  const db = await connectToDatabase();
  const tasksCollection = db.collection('Tasks');
  await tasksCollection.insertOne(task);
}



module.exports = { insertTask };
