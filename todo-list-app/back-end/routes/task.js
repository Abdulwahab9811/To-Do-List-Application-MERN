// taskRoutes.js

const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWE4MDRlMDhkMjBiYzM4YmVkNTI2YSIsImlhdCI6MTcwNTY3ODMzNSwiZXhwIjoxNzA1OTM3NTM1fQ.GNVrQWA_dTxzSjUrZd-WCeN74l6WHfjJUxHXkGbJjsQ

router.use(authMiddleware);

router.post('/tasks', createTask);

module.exports = router;

