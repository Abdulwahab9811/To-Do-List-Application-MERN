const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', (req, res) => authController.register(req, res)); // No need to pass the User model here
router.post('/login', (req, res) => authController.login(req, res))

module.exports = router;

