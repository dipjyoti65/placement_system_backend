const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");
const Student = require("../models/studentModel");
const Company = require("../models/companyModel");
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


// Update Selected Student Application status as Selected
exports.approvedApplication = async(req,res)=>{
  try{
    const{jobId,studentId} = req.query;

    //Update Application Status as Selected
    const applications = await Application.findOne({jobId,studentId});
    if(!applications || applications.length === 0){
      return res.status(200).json({message: 'No application found for the specified jobId'});
    }

    applications.Status = 'Selected';
    await applications.save();

    const applicationsDetails = {
      applicationId : applications._id,
      studentId: applications.studentId,
      jobId:applications.jobId,
      status:applications.Status
    };

    res.status(200).json({message:'Student is Selected',applicationsDetails});
  }catch(error){
    console.error('Student selection failed: ',error);
    res.status(500).json({error:error.message});
  }
}


//Update Rejected Student Application status as Rejected
exports.rejectApplication = async(req,res)=>{
  try{
    const{jobId,studentId} = req.query;

    const applications = await Application.findOne({jobId,studentId});

    if(!applications || applications.length === 0){
      return res.status(200).json({message: 'No application found for the specified jobId'});
    }

    applications.Status = 'Rejected';
    await applications.save();

    const applicationsDetails ={
      applicationId : applications._id,
      studentId: applications.studentId,
      jobId: applications.jobId,
      status: applications.Status
    };

    res.status(200).json({message: 'Student is Selected',applicationsDetails});
  }catch(error){
    console.error('Student rejection failed: ',error);
    res.status(500).json({error: error.message});
  }
}


// UpdateCompany Details
exports.updateCompany = async(req,res)=>{
  try{
    const companyId = req.params.id;

    const updateData = {};
    if(req.body.name) updateData.name = req.body.name;
    if(req.body.email) updateData.email = req.body.email;
    if(req.body.phone) updateData.phone = req.body.phone;
    if(req.body.address) updateData.address = req.body.address;
    if(req.file){
      updateData.image = {
        data : req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const company = await company.findByIdAndUpdate(companyId, updateData,{new: true});

    if(!company){
      return res.status(404).json({message: 'Coampny not found'});
    }

    res.status(200).json(company);
  }catch(error){
  console.error('Student details not updated : ',error);
  res.status(500).json({error: error.message});
  }
}


// Get Student Data
exports.getComapnyDetails = async(req,res)=>{
  try{
    const companyId = req.params.id;
    const company = await Student.findById(companyId);

    if(!company){
      return res.status(404).json({message: 'comapny not found'});
    }

    let imageData = null;
    if(company.image && company.image.data){
      imageData = company.image.data.toString('base64');
    }

    const responseData = {
      name: company.name,
      email: company.email,
      phone: company.phone,
      branch: company.branch,
      gender: company.gender,
      address: company.address,
      tenth: company.tenth,
      tewlve : company.tewlve,
      image: imageData,
    };

    res.status(200).json(responseData);
  }catch(error){
    console.error('Company Details not retrieved: ',error);
    res.status(500).json({error: error.message});
  }
}