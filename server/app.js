const express = require("express");
const bodyParser = require("body-parser");
const UserAuthRoute = require("./routes/userAuthRoutes");
const CompanyRoute  = require("./routes/companyRoutes");
const AdminRoute = require("./routes/adminRoutes");
const StudentRoute =require("./routes/studentRoutes");
const app = express();

app.use(bodyParser.json());

app.use('/',UserAuthRoute);
app.use('/',CompanyRoute);
app.use('/',AdminRoute);
app.use('/',StudentRoute);

module.exports = app;