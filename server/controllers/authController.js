const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const Company = require('../models/companyModel');
const Admin = require('../models/adminModel');


exports.signup = async(req,res)=>{
  try{
    const{name,email,password,role} = req.body;
    // console.log("req.body: ", req.body);
    let User;
    switch(role){
      case 'Student':
        User = Student;
        break;
      case 'Company':
        User = Company;
        break;
      default:
        return res.status(400).json({message: 'Invalid role'});
    }

    // Check if user already exists
    const existingUser = await User.findOne({email});

    if(existingUser){
      return res
        .status(400)
        .json({msg: "User with same email already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    if(User === Student){
      let newStudent = new Student({
        name,
        email,
        password: hashedPassword,
        role,
      })

      newStudent = await newStudent.save();
      res.status(201).json({message: 'User Created Successfully',newStudent});

    }else if(User === Company){
      let newCompany = new Company({
        name,
        email,
        password: hashedPassword,
        role,
      })

      newCompany = await newCompany.save();
      console.log(res.body);
      res.status(201).json({message: 'User Created Successfully',newCompany});
    }

  }catch(error){
    res.status(500).json({error: e.message});
  }
};


exports.signin = async(req,res)=>{
  try{
    const{email,password,role} = req.body;
    let User;
    switch(role){
      case 'Admin':
        User = Admin;
        break;
      case 'Student':
        User = Student;
        break;
      case 'Company':
        User = Company;
        break;
      default:
        return res.status(400).json({message: 'Invalid role'});
    }

    //Check if user exists
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    //Check password
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(401).json({message: 'Invalid password'});
    }

    const token = jwt.sign({id: user._id},"passwordKey");
    res.json({token, ...user._doc});

  }catch(error){
    console.log('Login error: ',error);
    // res.status(500).json({message: 'Internal server error'});
  }
};


exports.getUser = async(req,res)=>{
  try{
    const{email,role} = req.query;

    let User;
    switch(role){
      case 'Admin':
        User = Admin;
        break;
      case 'Student':
        User = Student;
        break;
      case 'Company':
        User = Company;
        break;
      default:
        return res.status(400).json({message: 'Invalid role'});
    }

    const user = await User.find({email,role});
    res.status(200).json(user);

    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
  }catch(error){
    console.log('Server error',error);
  }
}

exports.tokenIsValid = async(req,res) =>{
  try{
    const token = req.header("x-auth-token");
    if(!token)return res.json(false);
   
    const verified = jwt.verify(token,"passwordKey");
    if(!verified)return res.json(false);

    const user = await User.findById(verified.id);
    if(!user) return res.json(false);
    res.json(true);
  }catch(e){
    res.status(500).json({error: e.message});
  }
};

exports.auth = async(req,res) =>{
  const user = await User.findById(req.user);
  res.json({...user._doc,token: req.token});
};