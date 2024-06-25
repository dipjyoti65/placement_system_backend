const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const multer = require('multer');

// Configure Multer Storage
const storage = multer.memoryStorage();
const upload = multer({storage:storage}).single('profileImage');

//All job retrieval route
router.get('/api/getAllJobs',AdminController.getAllJobs);
//approv a job by admin
router.put('/jobs/approve/:jobId',AdminController.approveJob);
// Get Selected Candidates
router.get('/getSelectedCandidated',AdminController.getSelectedCandidated);
// Delete Job
router.delete('/deleteJob',AdminController.deleteJob);

//Edit Admin Profile
// router.put('/editAdminProfile',AdminController.editAdminProfile);
router.put('/admin/:id',upload,AdminController.updateAdmin);

//Get Admin Details
router.get('/admin/:id',AdminController.getAdmin);

//Get All Student Data
router.get('/getAllStudents',AdminController.getAllStudents);

//Get All Company Data
router.get('/getAllComapnyDatas',AdminController.getAllCompany)
module.exports = router;