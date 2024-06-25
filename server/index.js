const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = require('./app');
const multer = require('multer')


//Database connection
const DB = "mongodb+srv://dipjyotigayan2:hr75FsYm6PcWqBCV@cluster0.vcbauwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const ImageModel = require("./models/imageModel");
mongoose
  .connect(DB)
  .then(()=>{
    console.log("Database Connection Succesfull");
  })
  .catch((e)=>{
    console.log(e);
  })

app.get('/',(req,res)=>{
  res.send("Hello world")
})

// app.post('/upload',(req,res)=>{
//   upload(req,res,(err)=>{
//     if(err){
//       console.log(err)
//     }else{
//       const newImage = new ImageModel({
//         name: req.body.name,
//         image:{
//           data: req.file.filename,
//           contentType: 'image/png'
//         }
//       })
//       newImage.save()
//         .then(()=>res.send('successfully uploaded'))
//         .catch((err)=>console.log(err));
//     }
//   })
// })

// Storage
// const Storage = multer.diskStorage({
//   destination : 'uploads',
//   filename : (req,file,cb)=>{
//     cb(null, file.originalname);
//   },
// });


// const upload = multer({
//   storage:Storage
// }).single('testImage')

//Start server
app.listen(PORT, "0.0.0.0",()=>{
  console.log(`Server connected at port ${PORT}`);
});
