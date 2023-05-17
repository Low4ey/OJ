const mongoose = require("mongoose");
const User = require("../models/user");

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
  console.log("Hello");
  const user = await User.create({
    userName,
    firstName,
    lastName,
    userEmail,
    userPhone,
    userCountry,
    userPassword,
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

const getUserData = async () => {
  const allUsers = await User.find();
    return allUsers;
};

module.exports = { getUserData, createUser, updateUser, deleteUser};
