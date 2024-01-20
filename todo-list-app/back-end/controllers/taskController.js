// taskController.js

const { insertTask, getAllTasks , deleteTask , getTaskById, updateTask} = require('../models/tasks');

module.exports.createTask = async (req, res, next) => {
  try {
    const { taskName, description, dueDate } = req.body;
    const userId = req.user ? req.user.id : null; // Handle the case where req.user is undefined

    const newTask = {
      taskName,
      description,
      dueDate,
      userId,
    };

    await insertTask(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};


module.exports.getAllTasksByUser = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const tasks = await getAllTasks(userId);

    res.status(200).json({ tasks, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports.updateTaskById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;

    // Check if the task belongs to the authenticated user before updating
    const task = await getTaskById(taskId);
    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: 'Task not found', success: false });
    }

    // If the task belongs to the user, proceed with the update
    const updatedTask = await updateTask(taskId, updatedTaskData);

    res.status(200).json({ message: 'Task updated successfully', updatedTask, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};


module.exports.deleteTaskById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const taskId = req.params.taskId;

    // Check if the task belongs to the authenticated user before deleting
    const task = await getTaskById(taskId);
    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: 'Task not found', success: false });
    }

    // If the task belongs to the user, proceed with deletion
    await deleteTask(taskId);

    res.status(200).json({ message: 'Task deleted successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};


