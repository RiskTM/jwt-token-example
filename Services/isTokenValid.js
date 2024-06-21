const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../models/TokenModel");
require("dotenv").config();


/**
 * 
 * @param {String} token 
 * @param {Boolean} isRefreshToken 
 * @returns {Object} status = bool, username = null || String
 */  
const isTokenValid = async (token, isRefreshToken) => {
        const key = isRefreshToken ? process.env.REFRESH_TOKEN : process.env.ACCESS_TOKEN ;

        return await jwt.verify(token, key, async (err, user) => {
                if (err){
                        return {status: false,
                                username: null
                        };
                }
                else if(await isTokenBlacklisted(token, isRefreshToken)){
                        return {status: false,
                                username: null
                        }; 
                }
                return {
                        status: true,
                        username: user.username
                };
        })

}

module.exports = {isTokenValid};