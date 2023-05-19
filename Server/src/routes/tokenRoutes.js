const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserToken = require('../models/userToken');

const router = express.Router();

router.post('/refresh-token', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // Verify the refresh token
    const decodedToken = jwt.verify(refreshToken, config.REFRESH_TOKEN_PRIVATE_KEY);

    // Check if the refresh token exists in the database
    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken) {
      throw new Error('Refresh token not found');
    }

    // Generate a new access token
    const accessToken = jwt.sign({ _id: decodedToken._id }, config.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: '14m',
    });

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
