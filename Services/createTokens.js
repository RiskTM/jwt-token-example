const {saveRefToken} = require("../models/TokenModel");
const jwt = require("jsonwebtoken");


/**
 * @param {String} username 
 * @returns {String}
 */
const generateAccessToken = (username) => {
        return jwt.sign({username: username},  process.env.ACCESS_TOKEN, {expiresIn: process.env.ACC_EXPIRES});
}
   
/**
 * saves the token in Whitelist
 * @async
 * @param {String} username 
 * @returns {Promise<String>}
 */
const generateRefreshToken = async (username) => {
        const token = jwt.sign({username: username}, process.env.REFRESH_TOKEN, {expiresIn: process.env.REF_EXPIRES});
        const timeStamp = new Date().toISOString();
        await saveRefToken(token, timeStamp, username);
        return token;
}

/**
 * generates both tokens and returns them as an object
 * @async
 * @param {String} username 
 * @returns {Object}
 */
const createTokens = async (username) => {
        const refreshToken = await generateRefreshToken(username)
        return {
                accessToken: generateAccessToken(username),
                refreshToken: refreshToken
        };
}

module.exports = {createTokens, generateAccessToken, generateRefreshToken};