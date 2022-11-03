const mongoose=require("mongoose")
const config = require("../config/config");
async function dbConnect(){
    try {
        await mongoose.connect(config.DB);
      } catch (error) {
        console.log(error);
      }
}
module.exports={
    dbConnect
}