const jwt = require('jsonwebtoken');
const config = require("../config/config");
// const {userTokenController} = require("../controller");
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


const generateToken = async(user) =>{
    try {
        const payload = {_id:user._id};
        const accessToken = jwt.sign(
            payload,
            config.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "14m"}
        )
        const refreshToken = jwt.sign(
            payload,
            config.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d"}
        )

        const userToken = await UserToken.findOne({userId: user._id});
        if(userToken) await userToken.remove();
        
        await createUserToken({userId:user._id , token:refreshToken});
        
        return Promise.resolve({accessToken , refreshToken});

    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {createUserToken,generateToken};