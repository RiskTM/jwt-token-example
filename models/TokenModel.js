const { PrismaClient } = require("@prisma/client");
const exp = require("constants");
const prisma = new PrismaClient();

require("dotenv").config();

const blacklistRefreshToken = async (refreshToken, username) => {
        try{
                let expirationDate = await getDBEntryForRefreshToken(refreshToken);

                if (expirationDate == null) return;

                expirationDate = expirationDate.expiresAt;

                await prisma.refreshTokenBlackList.create({data:{
                        token: refreshToken,
                        userUsername: username,
                        expiresAt: expirationDate.toISOString()
                }});
        } catch {
                console.log("ERROR in TokenModel.blacklistRefreshToken")
        }
        
}

const blacklistAccessToken = async (accessToken, username) => {
        try {
                let expirationDate = new Date();
                expirationDate.setMinutes(expirationDate.getMinutes() + parseInt(process.env.ACC_EXPIRES))

                await prisma.accessTokenBlackList.create({data:{
                        token: accessToken,
                        userUsername: username,
                        expiresAt: expirationDate.toISOString()
                }});
        } catch {
                console.log("ERROR in TokenModel.blacklistAccessToken")
        }
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
        try{
                const res = await prisma.accessTokenBlackList.findFirst({
                        where: {token: token}
                });
                return (res != null);
        } catch {
                console.log("ERROR in TokenModel.isAccessTokenBlacklisted")
        }
}

/**
 * 
 * @param {String} token 
 * @returns {boolean} 
 */
const isRefreshTokenBlacklisted = async (token) => {
        try{
                const whitelist = await prisma.refreshTokenWhitelist.findFirst({where: {token: token}})
                
                if(whitelist === null) return true;

                const res = await prisma.refreshTokenBlackList.findFirst({where:
                        {token: token}
                });
                return (res != null);
        } catch {
                console.log("ERROR in TokenModel.isRefreshTokenBlacklisted")
        }
}


/**
 * @param {String} token 
 * @param {String} timeStamp 
 * @param {String} username
 */
const saveRefToken = async (token, timeStamp, username) => {
        try {
                await prisma.refreshTokenWhitelist.create({
                        data: {
                                token: token,
                                userUsername: username, 
                                expiresAt: timeStamp
                        }
                });
        } catch {
                console.log("ERROR in TokenModel.saveRefToken")
        } 
}


/**
 * 
 * @async
 * @param {String} token
 * @returns {Promise<Object>}
 */
const getDBEntryForRefreshToken = async (token) => {
        try{
                return prisma.refreshTokenWhitelist.findFirst({where:{token: token}})
        } catch {
                console.log("ERROR in TokenModel.getDBEntryForRefreshToken")
        } 
}

module.exports = {saveRefToken, blacklistAccessToken, blacklistRefreshToken, isTokenBlacklisted};