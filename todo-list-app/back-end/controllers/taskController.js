// taskController.js

const { insertTask } = require('../models/tasks');

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



