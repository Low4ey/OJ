const mongoose=require("mongoose")
const config = require("../config/config");
const dbConnect=async ()=>{
    try {
        await mongoose.connect(config.DB);
        console.log("Database Connected");
      } catch (error) {
        console.log("Database Connection failed");
        console.log(error);
      }
}
module.exports={
    dbConnect
}