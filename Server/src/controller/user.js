const mongoose = require("mongoose");
const User = require("../models/user");


//Create User
exports.createUser = async (req,res,next)=>{

    try {
        const user = await User.create(req.body)

        res.status(201).json({
            success:true,
            user
        })
        
    } catch (error) {
        next(error);
    }


}

//Update User by ID 

exports.updateUser = async (req,res,next) =>{

    let user = await User.findById(req.params.id);

    if(!user)
    {
        return res.status(500).json({
            success: false,
            message: "No such User"
        })
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true, useFindAndModify: false})

}

//Delete User by ID 

exports.updateUser = async (req,res,next) =>{

    let user = await User.findById(req.params.id);

    if(!user)
    {
        return res.status(500).json({
            success: false,
            message: "No such User"
        })
    }

    user = await User.findByIdAndDelete(req.params.id, req.body, {new:true, runValidators: true, useFindAndModify: false})

    res.status(200).json({
        success: true,
        user
    })
    
}

//Get User Data 

exports.getUserData = async (req,res)=>{

    const allUsers = await User.find(); 

    res.status(200).json(
        {
            success:true,
            allUsers
        }
    )
}
