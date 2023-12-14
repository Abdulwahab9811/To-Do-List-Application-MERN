// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/profile/:id', userController.getUserProfile);
router.put('/profile/:id', userController.updateUserProfile);
router.delete('/profile/:id', userController.deleteUserProfile);

module.exports = router;
