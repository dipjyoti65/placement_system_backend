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

  branch: {
    type: String,
  },

  phone:{
    type: String,
  },

  tenth:{
    type: String,
  },

  twelve:{
    type: String,
  },

  image:{
    data: Buffer,
    contentType: String,
  },
  
});

const StudentSchema = mongoose.model("StudentData", studentSchema);
module.exports = StudentSchema;