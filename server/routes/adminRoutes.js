const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

//All job retrieval route
router.get('/api/getAllJobs',AdminController.getAllJobs);
//approv a job by admin
router.put('/jobs/approve/:jobId',AdminController.approveJob);

module.exports = router;