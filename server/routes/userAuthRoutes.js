const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

//Signup route
router.post('/api/signup',AuthController.signup);
router.post('/api/signin',AuthController.signin);
router.get('/api/getUser',AuthController.getUser);
router.post('/tokenIsValid',AuthController.tokenIsValid);
router.get('/',AuthController.auth);

module.exports = router;