const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");
const Student = require("../models/studentModel");
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

// Get Applied Student for each Approved job of a particular company
exports.getAppliedStudent = async(req,res)=>{
  try{
    const{jobId} = req.query;

    //Query the MongoDb database to find all applicants by the jobid
    const applicants = await Application.find({jobId});

    if(!applicants || applicants.length === 0){
      return res.status(200).json({applicantDetails : []});
    }

    //Retrieve the applicant details for each job
    const applicantDetails = [];

    for(const applicant of applicants){
      const student = await Student.findById(applicant.studentId);
      if(student){
        applicantDetails.push({
          studentId: student._id,
          name: student.name,
          address: student.address,
          semester: student.semester
        })
      }
    }
    res.status(200).json({applicantDetails});
  }catch(error){
    console.error('Applicant retrival error: ',error);
    res.status(500).json({error: error.message});
  }
}



