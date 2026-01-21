const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_CONNECT = async()=>{
  try{
    mongoose.connect(process.env.CLOUD_DATABASE).then(()=>{
      console.log("Database Connect")
    });
  }catch(error){
    console.log("Somethig is Wrong",error)
  }
};


module.exports = DB_CONNECT;