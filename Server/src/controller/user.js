const mongoose = require("mongoose");
const { User } = require("../models");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const {generateToken} = require("./userToken");
// const UserToken = require("../models/userToken");


const getUserByEmail = async ({
  userEmail,
  userPassword
}) => {
  try {
    const user = await User.findOne({ userEmail: userEmail })
    if(!user)
    {
      throw new Error(" Incorrect Email or User Not Found");
    }
    const verifyPassword =  await bcrypt.compare(userPassword , user.userPassword );
    if(!verifyPassword)
    {
      throw new Error("Incorrect Password");
    }
    const {accessToken , refreshToken} = await generateToken(user);
      return {accessToken,refreshToken};
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
  const salt = await bcrypt.genSalt(Number(config.SALT)); // auto salt is bad so fix salt in env file..
  const hashPassword = await bcrypt.hash(userPassword, salt);
  const user = await User.create({
    userName,
    firstName,
    lastName,
    userEmail,
    userPhone,
    userCountry,
    userPassword: hashPassword,
    userRole,
    userInstitute,
  });

  return user;
};

//Update User by ID

const updateUser = async ({ id,
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
    { _id: id },
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
    }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }
  );

  return user;
}

//Delete User by ID

const deleteUser = async ({ id }) => {

  const user = await User.findById({ _id: id })

  await user.remove();
};

//Get User Data

const getAllUserData = async () => {
  const allUsers = await User.find();
  return allUsers;
};

module.exports = { getAllUserData, createUser, updateUser, deleteUser, getUserByEmail };
