const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name:{
    required: true,
    type: String,
    trim : true,
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
    type: String,
  },

  role:{
    required:true,
    type: String,
  },
  
  phone:{
    type: Number,
  },
});


const CompanySchema = mongoose.model("CompanyData", companySchema);
module.exports = CompanySchema;

