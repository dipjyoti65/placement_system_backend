const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');
const Student = require('../models/studentModel');

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

// UpdateStudent Details
exports.updateStudent = async(req,res)=>{
  try{
    const studentId = req.params.id;

    const updateData = {};
    if(req.body.name) updateData.name = req.body.name;
    if(req.body.email) updateData.email = req.body.email;
    if(req.body.phone) updateData.phone = req.body.phone;
    if(req.body.gender) updateData.gender = req.body.gender;
    if(req.body.address) updateData.address = req.body.address;
    if(req.body.branch) updateData.branch = req.body.branch;
    if(req.body.tenth) updateData.tenth = req.body.tenth;
    if(req.body.tewlve) updateData.tewlve = req.body.tewlve;
    if(req.file){
      updateData.image = {
        data : req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const student = await Student.findByIdAndUpdate(studentId, updateData,{new: true});

    if(!student){
      return res.status(404).json({message: 'Student not found'});
    }

    res.status(200).json(student);
  }catch(error){
  console.error('Student details not updated : ',error);
  res.status(500).json({error: error.message});
  }
}

// Get Student Data
exports.getStudentDetails = async(req,res)=>{
  try{
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if(!student){
      return res.status(404).json({message: 'Student not found'});
    }

    let imageData = null;
    if(student.image && student.image.data){
      imageData = student.image.data.toString('base64');
    }

    const responseData = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      branch: student.branch,
      gender: student.gender,
      address: student.address,
      tenth: student.tenth,
      tewlve : student.tewlve,
      image: imageData,
    };

    res.status(200).json(responseData);
  }catch(error){
    console.error('Student Details not retrieved: ',error);
    res.status(500).json({error: error.message});
  }
}