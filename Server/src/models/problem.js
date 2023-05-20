const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true,
            maxlength:30,
        },
        content:
        {
            type:String,//it will store Rich text
            required:true,
        },
        createdBy:{
            type:String,//userID
            unique:true
        },
        tags:{
            type:String//tag id
        },
        difficulty:{
            type:String,
            required:true,
        }

    },
    {
        timestamp: true,
    }
     
);
const Problem = mongoose.models.Problem || mongoose.model('Problem', problemSchema);
module.exports = Problem;


