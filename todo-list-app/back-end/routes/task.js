// routes/task.js

const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/taskController');

router.get('/tasks', tasksController.getAllTasks);
router.post('/tasks', tasksController.createTask);
router.delete('/tasks/:id/:userId', tasksController.deleteTask);
router.put('/tasks/:id/:userId', tasksController.updateTask);

module.exports = router;