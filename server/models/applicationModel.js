const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'jobdatas', 
    required: true 
  },

  studentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studentdatas',
    required: true,
  },

  status: {
    type: String,
    enum: ['Applied','Selected','Rejected'],
    default: 'Applied',
  },

  appliedAt: { type: Date, default: Date.now },
})

const ApplicationSchema = mongoose.model("applicationdata",applicationSchema);
module.exports = ApplicationSchema;
