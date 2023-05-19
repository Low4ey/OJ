const {UserToken} = require("../models");
const mongoose = require("mongoose");

const createUserToken = async ({
    userId,
    token
}) => {
    const userToken = await UserToken.create(
        {
            userId,
            token,
        }
    )
    return userToken;
}

module.exports = {createUserToken};