const { PrismaClient } = require("@prisma/client");
const exp = require("constants");
const prisma = new PrismaClient();

require("dotenv").config();

const blacklistRefreshToken = async (refreshToken, username) => {
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + parseInt(process.env.REF_EXPIRES))

        await prisma.refreshTokenBlackList.create({data:{
                token: refreshToken,
                userUsername: username,
                expiresAt: expirationDate.toISOString()
        }});
}

const blacklistAccessToken = async (accessToken, username) => {
        let expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + parseInt(process.env.ACC_EXPIRES))

        await prisma.accessTokenBlackList.create({data:{
                token: accessToken,
                userUsername: username,
                expiresAt: expirationDate.toISOString()
        }});
}

/**
 * 
 * @param {String} token 
 * @param {Boolean} isRefreshToken 
 * @returns {Boolean}
 */
const isTokenBlacklisted = async (token, isRefreshToken) => {
        return isRefreshToken ? isRefreshTokenBlacklisted(token) : isAccessTokenBlacklisted(token);
}


/**
 * 
 * @param {String} token 
 * @returns {boolean} 
 */
const isAccessTokenBlacklisted = async (token) => {
        const res = await prisma.accessTokenBlackList.findFirst({where:
                {token: token}
        });
        return (res != null);
        
}

/**
 * 
 * @param {String} token 
 * @returns {boolean} 
 */
const isRefreshTokenBlacklisted = async (token) => {
        const res = await prisma.refreshTokenBlackList.findFirst({where:
                {token: token}
        });
        return (res != null);
        
}

module.exports = {blacklistAccessToken, blacklistRefreshToken, isTokenBlacklisted};