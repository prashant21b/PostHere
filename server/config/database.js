

const mongoose = require('mongoose');


exports.db=async ()=>{
   await  mongoose.connect(process.env.MONGODB_URL)
      console.log("Connected to mongodb")
}
