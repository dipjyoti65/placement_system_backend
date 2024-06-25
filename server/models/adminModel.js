const mongoose = require('mongoose');
const { validate } = require('./jobModel');

const adminSchema = mongoose.Schema({
  name:{
    required: true,
    type: String,
    trime: true
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
    type:String,
    trime:true,
  },

  image:{
    data:Buffer,
    contentType:String,
  }

});

const AdminSchema = mongoose.model("AdminData",adminSchema);
module.exports = AdminSchema;