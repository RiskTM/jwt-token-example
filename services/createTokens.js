const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateAccessToken = (user) => {
        return jwt.sign(user,  process.env.ACCESS_TOKEN, {expiresIn: "15s"});
}
      
const generateRefreshToken = (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: "7d"});
}

const createTokens = (username) => {
        const user = {name: username};
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        return {
                accessToken: accessToken,
                refreshToken: refreshToken
        };
}

module.exports = {generateAccessToken, generateRefreshToken, createTokens};