const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

//Signup route
router.post('/api/signup',UserController.signup);
router.post('/api/signin',UserController.signin);

module.exports = router;