const AuthController = require('../core/AuthController');
const User = require('../models/User');
const config = require('../config');

const userConfig = {
    jwtSecret: config.jwt.secretKey,
    jwtExpiresIn: config.jwt.expiry,
    loginType: 'password', // 'password' or 'otp'
    otpField: 'email',

};

const authController = new AuthController(User, userConfig);

module.exports = { authController};