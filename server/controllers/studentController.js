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
    const {studentId, jobId,Status} = req.body;

    //Create new Application
    let newApplication = new Application({
      jobId,
      studentId,
      Status,
    });

    newApplication = await newApplication.save();
    res.status(201).json({message: 'Job Applied Successfully'});
  }catch(error){
    console.error('Application failed:',error);
    res.status(500).json({error: error.message});
  }
}


//Get applied jobs for particular Student
exports.getAppliedJobs = async(req,res)=>{
  try{
    const{studentId} = req.query;
  
    // Query the MongoDB database to find all applications by the specified student
    const applications = await Application.find({studentId});

    if(!applications || applications.length === 0){
      return res.status(200).json({appliedJobs : []});
    }
    // Retrieve the job details for each application found
    const appliedJobs = [];

    for(const application of applications){
     const job = await Job.findById(application.jobId); 
    if(job){
      appliedJobs.push({
        jobId: job._id,
        title: job.title,
        experience: job.experience,
        vacancy: job.vacancy,
        description: job.description,
      });
    }
    }

    res.status(200).json({appliedJobs});
  }catch(error){
    console.error('Job retrival error: ',error);
    res.status(500).json({error: error.message});
  }
}