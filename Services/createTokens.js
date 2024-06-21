const jwt = require("jsonwebtoken");


/**
 * @param {String} username 
 * @returns {String}
 */
const generateAccessToken = (username) => {
        return jwt.sign({username: username},  process.env.ACCESS_TOKEN, {expiresIn: process.env.ACC_EXPIRES});
}
   
/**
 * @param {String} username 
 * @returns {String}
 */
const generateRefreshToken = (username) => {
        return jwt.sign({username: username}, process.env.REFRESH_TOKEN, {expiresIn: process.env.REF_EXPIRES});
}

/**
 * generates both tokens and returns them as an object
 * @param {String} username 
 * @returns {Object}
 */
const createTokens = async (username) => {
        return {
                accessToken: generateAccessToken(username),
                refreshToken: generateRefreshToken(username)
        };
}

module.exports = {createTokens, generateAccessToken, generateRefreshToken};