// // controllers/userController.js

// const User = require('../models/user');

// const getActiveUsers = async (req, res) => {
//   try {
//     // Fetch active users from the database
//     const activeUsers = await User.find({ isActive: true });

//     res.json(activeUsers);
//   } catch (error) {
//     console.error('Error fetching active users:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const userController = {
//     // getUserProfile: async (req, res) => {
//     //   // Logic to retrieve user profile
//     //   // Example: const user = await User.findById(req.params.id);
//     //   // Send response: res.status(200).json(user);
//     // },
  
//     // updateUserProfile: async (req, res) => {
//     //   // Logic to update user profile
//     //   // Example: await User.findByIdAndUpdate(req.params.id, req.body);
//     //   // Send response: res.status(200).json({ message: 'User profile updated successfully' });
//     // },
  
//     // deleteUserProfile: async (req, res) => {
//     //   // Logic to delete user profile
//     //   // Example: await User.findByIdAndDelete(req.params.id);
//     //   // Send response: res.status(200).json({ message: 'User profile deleted successfully' });
//     // },
//   };



  
  
  module.exports =  { userController , getActiveUsers  }
  