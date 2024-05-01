const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = require('./app');



//Database connection
const DB = "mongodb+srv://dipjyotigayan2:hr75FsYm6PcWqBCV@cluster0.vcbauwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

//Start server
app.listen(PORT, "0.0.0.0",()=>{
  console.log(`Server connected at port ${PORT}`);
});