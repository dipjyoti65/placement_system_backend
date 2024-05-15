const Job = require("../models/jobModel");

// It will give access to all the jobs posted by all company to admin
exports.getAllJobs = async(req,res) =>{
  try{
    //Retrieve All jobs
    const _jbos = await Job.find();
    res.status(200).json(_jbos);
  }catch(error){
    console.error('Job retrieval error: ', error);
    res.status(500).json({error: error.message});s
  }
};

// with this admin is going to approve any job and update its status to approved job
exports.approveJob = async(req,res)=>{
  try{
    const{jobId} = req.params;

    //Update jobs status to 'Approved' by admin
    await Job.findByIdAndUpdate(jobId,{status : 'Approved'});
    res.status(200).json({message: 'Job approved successfully'});
  }catch(error){
    console.error('Job approval error: ',error);
    res.status(500).json({error: error.message});
  }
};

