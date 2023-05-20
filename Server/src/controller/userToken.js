const {UserToken} = require("../models");

const createUserToken = async ({
    userId,
    token
}) => {
    const resultToken = await UserToken.create(
        {
            userId,
            token,
        }
    )
    return resultToken;
}

module.exports = {createUserToken};