const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');

//Company job posting routes
router.post('/company/postJob',CompanyController.postJob);
//Company get jobs routes
router.get('/company/getJobs',CompanyController.getJob);
//Get approved jobs 
router.get('/getApprovedJobForCompany',CompanyController.getApprovedJobForCompany);

module.exports = router;