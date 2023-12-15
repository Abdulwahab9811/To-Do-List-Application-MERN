const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user');

router.post('/register', authController.register.bind(null, User));
router.post('/login', authController.login.bind(null, User));


module.exports = router
