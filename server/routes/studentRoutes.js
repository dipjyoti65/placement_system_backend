const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

//Get Approved jobs
router.get('/api/getApprovedJobs',StudentController.getApprovedJobs);


module.exports = router;