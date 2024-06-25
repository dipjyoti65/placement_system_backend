const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');
const multer = require('multer');


// Configure Multer Storage
const storage = multer.memoryStorage();
const upload = multer({storage:storage}).single('profileImage');

//Company job posting routes
router.post('/company/postJob',CompanyController.postJob);
//Company get jobs routes
router.get('/company/getJobs',CompanyController.getJob);
//Get approved jobs 
router.get('/getApprovedJobForCompany',CompanyController.getApprovedJobForCompany);
//Get applicant details for each job of a comapny
router.get('/getAppliedStudent',CompanyController.getAppliedStudent);
//Approve Application of Student
router.put('/approvedApplication',CompanyController.approvedApplication);
//Reject Application of Student
router.put('/rejectApplication',CompanyController.rejectApplication);

router.put('/updateComapny/:id',upload,CompanyController.updateCompany);

router.get('/getCompany/:id',CompanyController.getComapnyDetails)
module.exports = router;