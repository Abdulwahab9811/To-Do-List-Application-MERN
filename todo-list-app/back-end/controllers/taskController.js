//controllers/taskController.js
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

exports.getAllTasks = async (req, res, next) => {
  try {
    await client.connect();
    const collection = client.db("Database").collection("Tasks");
    const tasks = await collection.find({}).toArray();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};

exports.createTask = async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("Database").collection("Tasks");
    const task = req.body;
    const result = await collection.insertOne(task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  } finally {
    await client.close();
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    await client.connect();
    const collection = client.db("Database").collection("Tasks");
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const result = await collection.updateOne({ _id: new ObjectId(taskId) }, { $set: updatedTaskData });

    if (result.modifiedCount > 0) {
      res.status(200).json(updatedTaskData);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await client.connect();
    const collection = client.db("Database").collection("Tasks");
    const taskId = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(taskId) });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  } finally {
    await client.close();
  }
};
