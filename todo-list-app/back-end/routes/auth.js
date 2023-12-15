const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user');

router.post('/register', (req, res) => authController.register(req, res, User));
router.post('/login', (req, res) => authController.login(req, res, User));

module.exports = router;

