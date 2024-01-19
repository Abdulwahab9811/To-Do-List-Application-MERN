// taskController.js

const { insertTask } = require('../models/tasks');

module.exports.createTask = async (req, res, next) => {
  try {
    const { taskName, description, dueDate } = req.body;
    const userId = req.user._id; // Assuming you have the user object in req.user after authentication

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

