const mongoose = require("mongoose");
const {User} = require("../models");
const config = require("../config/config");
const bcrypt = require("bcrypt");
// const UserToken = require("../models/userToken");


const getUserByEmail = async({
  userEmail,
}) => {
  try {
      const user = await User.findOne({userEmail : userEmail})
      // console.log(user,userEmail);
      if(user)
          return user; 
  } catch (error) {
      console.log(error);
  }
}



//Create User
const createUser = async ({
  userName,
  firstName,
  lastName,
  userEmail,
  userPhone,
  userCountry,
  userPassword,
  userRole,
  userInstitute,
}) => {
  // bcrypt.genSalt(10,function(err, salt){
  //   bcrypt.hash(userPassword , config.SALT,function(err, hash) {
  //     hashPassword=hash;
  //   });
  // });
  const salt = await bcrypt.genSalt(Number(config.SALT));
  const hashPassword = await bcrypt.hash(userPassword , salt);
  // console.log(hashPassword);
  const user = await User.create({
    userName,
    firstName,
    lastName,
    userEmail,
    userPhone,
    userCountry,
    userPassword:hashPassword,
    userRole,
    userInstitute,
  });

  return user;
};

//Update User by ID

const updateUser = async ({id,
  userName,
  firstName,
  lastName,
  userEmail,
  userPhone,
  userCountry,
  userPassword,
  userRole,
  userInstitute,
}) => {

  const user = await User.findOneAndUpdate(
    {_id:id},
    {
      userName,
      firstName,
      lastName,
      userEmail,
      userPhone,
      userCountry,
      userPassword,
      userRole,
      userInstitute,
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }
  );

  return user;
}

//Delete User by ID

const deleteUser = async ({id}) => {

    const user= await User.findById({_id:id})

    await user.remove();
};

//Get User Data

const getAllUserData = async () => {
  const allUsers = await User.find();
    return allUsers;
};

module.exports = { getAllUserData, createUser, updateUser, deleteUser , getUserByEmail};
