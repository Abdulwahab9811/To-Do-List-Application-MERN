// controllers/taskController.js
const Task = require('../models/tasks');

const getAllTasks = async (req, res) => {
 try {
    const taskModel = new Task(req.app.locals.Database);
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
 } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
 }
};

const createTask = async (req, res) => {
 try {
    const taskModel = new Task(req.app.locals.Database);
    const { title, description } = req.body;
    const newTask = await taskModel.createTask({ title, description });
    res.status(201).json(newTask);
 } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
 }
};

const updateTask = async (req, res) => {
 try {
    const taskModel = new Task(req.app.locals.Database);
    const taskId = req.params.id;
    const updates = req.body;
    const success = await taskModel.updateTask(taskId, updates);
    if (success) {
      res.json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
 } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
 }
};

const deleteTask = async (req, res) => {
 try {
    const taskModel = new Task(req.app.locals.Database);
    const taskId = req.params.id;
    const success = await taskModel.deleteTask(taskId);
    if (success) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
 } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
 }
};

module.exports = {
 getAllTasks,
 createTask,
 updateTask,
 deleteTask,
};