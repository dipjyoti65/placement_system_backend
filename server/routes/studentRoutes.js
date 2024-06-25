const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');
const multer = require('multer');

// Configure Multer Storage
const storage = multer.memoryStorage();
const upload = multer({storage:storage}).single('profileImage');

//Get Approved jobs
router.get('/api/getApprovedJobs',StudentController.getApprovedJobs);
router.post('/student/applyJob',StudentController.applyJob);
router.get('/student/getAppliedJobs',StudentController.getAppliedJobs);
// Update Student Details
router.put('/updateStudent/:id',upload,StudentController.updateStudent);
router.get('/getStudentDetails/:id',StudentController.getStudentDetails);

module.exports = router;