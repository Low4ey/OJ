const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: true
        },
        firstName:{
            type: String,
            required: true,
            
        },
        lastName:{
            type: String,
            required: true,
            
        },
        userEmail:{
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        userPhone:{
            type: Number,
            required: true,
            unique: true
        },
        userCountry:{
            type: String,
            required: true,
            unique: true
        },
        userPassword:{
            type: String,
            required: true,
            trim: true,
            minlength: 8
        },
        userRole:{
            type: String,
            required: true,
            unique: true
        },
        userInstitute:{
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamp: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;


