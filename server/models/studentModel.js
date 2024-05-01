const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name:{
    required : true,
    type: String,
    trim: true,
  },

  email:{
    required : true,
    type : String,
    trime : true,
    validate: {
      validator:(value) =>{
        const re = 
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },

  password:{
    required: true,
    type : String,
  },

  role:{
    required:true,
    type: String,
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },

  address: {
    type: String,
  },

  courseType: {
    type: String,
  },

  courseName: {
    type: String,
  },

  semester: {
    type: Number,
  },

  phone:{
    type: Number,
  }

  
});

const StudentSchema = mongoose.model("StudentData", studentSchema);
module.exports = StudentSchema;