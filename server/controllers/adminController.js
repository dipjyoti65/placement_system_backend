const Job = require("../models/jobModel");
const Application = require("../models/applicationModel");
const AdminModel = require("../models/adminModel");
const Student = require("../models/studentModel");
const Company = require("../models/companyModel");
// It will give access to all the jobs posted by all company to admin
exports.getAllJobs = async(req,res) =>{
  try{
    //Retrieve All jobs
    const _jbos = await Job.find({status: 'Pending'});
    res.status(200).json(_jbos);
  }catch(error){
    console.error('Job retrieval error: ', error);
    res.status(500).json({error: error.message});
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

// Get All selected candidates 
exports.getSelectedCandidated = async(req,res)=>{
  try{
  const _selectedCandidates = await Application.find({Status: 'Selected'});

  if(!_selectedCandidates || _selectedCandidates.length === 0){
    return res.status(200).json({selectedCandidateDetails : []});
  }

  const selectedCandidateDetails = [];

  for(const _selectedCandidate of _selectedCandidates){
    const student = await Student.findById(_selectedCandidate.studentId);
    if(student){
      selectedCandidateDetails.push({
        studentId: student._id,
        name: student.name,
        address: student.address,
        semester: student.semester
      })
    }
  }
  res.status(200).json(selectedCandidateDetails);
  }catch(error){
    console.error('Failed to retrieve Selected Candidates: ',error);
    res.status(500).json({error: error.message});
  }
}

// Delete Job
exports.deleteJob = async(req,res) =>{
  try{
    const{jobId} = req.query;
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(204).send();
  }catch(error){
    console.error('Job not deleted : ',error);
    res.status(500).json({error : error.message});
  }
}

//Edit admin profile
// exports.editAdminProfile = async(req,res)=>{
//   try{
//     const adminId = req.query;
//     const {name,email,phone,image} = req.body;

//     const admin = await AdminModel.findByIdAndUpdate(
//       adminId,
//       {name,email,phone,image},
//       {new:true}
//     );

//     if(!admin){
//       return res.status(404).send({message:'Admin not found'});
//     }

//     res.send(admin);
//   }catch(error){
//     res.status(500).send({message: error.message});
//   }
// }



// exports.editAdminProfile = async(req,res)=>{
//   try{
//     const {_id} = req.query;
//     const {name,email,phone} = req.body;

//     // let image;

//     // // Handle file upload if present
//     // if (req.file) {
//     //   image = req.file.path;
//     // } else {
//     //   image = req.body.image;
//     // }
//     // const admin = await Admin.findById({_id});

//     const admin = await Admin.findByIdAndUpdate(
//       _id,
//        { name, email, phone },
//         { new: true });

    
//     if(!admin){
//       return res.status(404).send({message:'Admin not found'});
//     }

//     res.status(200).json({ message: 'Admin updated successfully', admin });

//     // admin.name = name || admin.name;
//     // admin.email = email || admin.email;
//     // admin.phone = phone || admin.phone;
//     // admin.image = image || admin.image;

//     // newAdmin = await newAdmin.save();
//     // res.status(200).json("Admin Data updated",admin);

//     // res.send(admin);
//   }catch(error){
//     res.status(500).send({message: error.message});
//   }


  exports.updateAdmin = async(req,res)=>{
    try{
      const adminId = req.params.id;

      const updateData = {};
      if(req.body.name) updateData.name = req.body.name;
      if(req.body.email) updateData.email = req.body.email;
      if(req.body.phone) updateData.phone = req.body.phone;
      if(req.file){
        updateData.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const admin = await AdminModel.findByIdAndUpdate(adminId,updateData, {new:true});

      if(!admin){
        return res.status(404).json({message: 'Admin not found'});
      }

      res.status(200).json(admin);

    }catch(error){
      console.error('Admin details not updated:',error);
      res.status(500).json({error: error.message});
    }
  }

  // exports.getAdmin = async(req,res)=>{
  //   try{
  //     const adminId = req.params.id;
  //     const admin = await AdminModel.findById(adminId);

  //     if(!admin){
  //       return res.status(404).json({message:'Admin not found'});
  //     }

  //     res.status(200).json(admin);
  //   }catch(error){
  //     console.error('Admin details not retrieved:',error);
  //     res.status(500).json({error:error.message});
  //   }
  // }

  exports.getAdmin = async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await AdminModel.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      let imageData = null;
      if (admin.image && admin.image.data) {
        // Convert binary image data to base64 string
        imageData = admin.image.data.toString('base64');
      }
  
      // Prepare response JSON object
      const responseData = {
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        image: imageData // Include base64 encoded image data if available
      };
  
      res.status(200).json(responseData);
    } catch (error) {
      console.error('Admin details not retrieved:', error);
      res.status(500).json({ error: error.message });
    }
  };

// Get All students
exports.getAllStudents = async(req,res)=>{
  try{
    const _students = await Student.find();
    res.status(200).json(_students);
  }catch(error){
    console.error('Can not Get Student Data: ',error);
    res.status(500).json({error: error.message});
  }
}

// Get All Company Data
exports.getAllCompany = async(req,res)=>{
  try{
    const _company = await Company.find();
    res.status(200).json(_company);
  }catch(error){
    console.error('Can not Get Company Data : ',error);
    res.status(500).json({error: error.message});
  }
}