require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//components
const apiRouter = require("./app/router/api-router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);
if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path =require('path');
  app.get('./',(req,res)=>{
      res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
  }
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log(`Connected to DB, hurrrayyy!` +process.env.PORT );
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
