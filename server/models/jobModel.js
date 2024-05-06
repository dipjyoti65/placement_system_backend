const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company', 
    required: true 
  },

  title: { 
    type: String, 
    required: true,
    trim: true,
  },

  experience: { 
    type: String, 
    required: true,
    trim : true,
  },

  // tenth_percentage : { 
  //   type: String, 
  //   required: true,
  //   trim : true,
  // },

  // twelve_percentage : { 
  //   type: String, 
  //   required: true,
  //   trim : true,
  // },

  // cgpa : { 
  //   type: String, 
  //   required: true,
  //   trim : true,
  // },

  vacancy : { 
    type: String, 
    required: true,
    trim : true,
  },

  // salary : { 
  //   type: String, 
  //   required: true,
  //   trim : true,
  // },
  
  description : { 
    type: String, 
    required: true,
    trim : true,
  },

  status: {
    type: String,
    enum: ['Pending','Approved'],
    default: 'Pending'
  },
  
  createdAt: { type: Date, default: Date.now },
});

const JobSchema = mongoose.model("JobData",jobSchema);
module.exports = JobSchema;
