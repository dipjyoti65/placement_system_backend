const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

//Get Approved jobs
router.get('/api/getApprovedJobs',StudentController.getApprovedJobs);
router.post('/student/applyJob',StudentController.applyJob);
router.get('/student/getAppliedJobs',StudentController.getAppliedJobs);
module.exports = router;