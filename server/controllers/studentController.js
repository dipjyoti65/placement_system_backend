const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

//It will give students access to all the jobs approved by Admin 
exports.getApprovedJobs = async(req,res)=>{
  try{
    //Retrieve only jobs with status "Approved"
    const jobs = await Job.find({status:'Approved'});
    res.status(200).json(jobs);
  }catch(error){
    console.error('Approved job retrieval error: ',error);
    res.status(500).json({error: error.message});
  }
};

//Apply jobs by studnets
exports.applyJob = async(req,res)=>{
  try{
    const {studentId, jobId} = req.body;

    
  }catch(error){

  }
}
