const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');

//Company job posting routes
router.post('/company/postJob',CompanyController.postJob);
//Company get jobs routes
router.get('/company/getJobs',CompanyController.getJob);
//Get approved jobs 
router.get('/getApprovedJobForCompany',CompanyController.getApprovedJobForCompany);
//Get applicant details for each job of a comapny
router.get('/getAppliedStudent',CompanyController.getAppliedStudent);
module.exports = router;