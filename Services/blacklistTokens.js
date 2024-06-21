const {isTokenValid} = require("./isTokenValid");
const {blacklistAccessToken, blacklistRefreshToken} = require("../models/TokenModel");

/**
 * checks which token is still valid and the blacklists them.
 * @param {String} accessToken 
 * @param {String} refreshToken 
 */
const blacklistTokens = async (accessToken, refreshToken) => {
        
        let response = await isTokenValid(accessToken, false)

        if (response.status){
                await blacklistAccessToken(accessToken, response.username);
        }
        response = await isTokenValid(refreshToken, true)

        if (response.status){
                await blacklistRefreshToken(refreshToken, response.username);
        }
}

module.exports = {blacklistTokens};