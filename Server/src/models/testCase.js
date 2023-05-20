const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testCaseSchema = new Schema(
    {
        content:{
            type:String,
            required:true,
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        problemId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        approved:{
            type:Boolean,
            default:false,
        }
    }
);
const TestCase = mongoose.models.TestCase || mongoose.model('TestCase', testCaseSchema);
module.exports = TestCase;

