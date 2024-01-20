// taskRoutes.js
// taskRoutes.js

const express = require('express');
const router = express.Router();
const { createTask, getAllTasksByUser, deleteTaskById , updateTaskById } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/tasks', createTask);
router.get('/tasks', getAllTasksByUser);
router.put('/tasks/:taskId', updateTaskById); 
router.delete('/tasks/:taskId', deleteTaskById); // Corrected route path

module.exports = router;

