//taskcontroller.js
const Task = require('../models/tasks');

exports.getAllTasks = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      console.log('User not logged in');
      return res.status(401).json({ error: 'User not logged in' });
    }

    const tasks = await Task.getAllTasks(userId);
    if (!tasks) {
      return res.status(404).json({ msg: 'No tasks found' });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createTask = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      console.log('User not logged in');
      return res.status(401).json({ error: 'User not logged in' });
    }

    const task = req.body;
    const createdTask = await Task.createTask(task, userId);

    res.status(201).json({ message: 'Task created successfully', task: createdTask });
  } catch (error) {
    console.error('Error in task creation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      console.log('User not logged in');
      return res.status(401).json({ error: 'User not logged in' });
    }

    const taskId = req.params.id;
    const updates = req.body;
    const isUpdated = await Task.updateTask(taskId, updates);

    if (!isUpdated) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      console.log('User not logged in');
      return res.status(401).json({ error: 'User not logged in' });
    }

    const taskId = req.params.id;
    const isDeleted = await Task.deleteTask(taskId);

    if (!isDeleted) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};