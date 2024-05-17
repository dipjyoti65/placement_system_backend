const Job = require("../models/jobModel");

exports.postJob = async (req, res) => {
  try {
    const { companyId,title, experience, vacancy, description } = req.body;
    console.log("req.body:", req.body);
    //Create new Job posting
    let newJob = new Job({
      companyId,
      title,
      experience,
      vacancy,
      description,
    });

    newJob = await newJob.save();
    res.status(201).json('Job Posted Successfully');
  } catch (error) {
    console.error('Job posting error: ',error);
    res.status(500).json({error: error.message});
  }
};

exports.getJob = async(req,res) =>{
  try{
    const{companyId} = req.query;
    //Retrieve Jobs posted by the comapny
    const jobs = await Job.find({companyId});
    res.status(200).json(jobs);
  }catch(error){
    console.error('Job retrieval error:',error);
    res.status(500).json({error: error.message});
  }
};

exports.getApprovedJobForCompany = async(req, res) =>{
  try{
    const{companyId} = req.query;

    const jobs = await Job.find({companyId, status:'Approved'});
    res.status(200).json(jobs);
  }catch(error){
    console.error('Approved jobs retriveal error: ',error);
    res.status(500).json({error: error.message});
  }
}


