const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")
const prisma = new PrismaClient()


/**
 * Creates user and returns bool whether successful
 * @param {String} username 
 * @returns {boolean}
 */
const addUser = async (username, password) => {
        return await prisma.user.create({data: {username: username, password: await bcrypt.hash(password, 10)}})
        .then(_ => true)
        .catch(e => {
                console.log("error occured");
                return false;
        });
}

/**
 * Deletes user and returns bool whether successful
 * @param {String} username 
 * @returns {boolean}
 */
const deleteUser = async (username) => {
        await prisma.refreshTokenBlackList.deleteMany({
                where: {userUsername: username}
        })
        .catch(e => console.log("error with deleting refTokens"));
        
        await prisma.accessTokenBlackList.deleteMany({
                where: {userUsername: username}
        })
        .catch(e => console.log("error with deleting accTokens"));

        return await prisma.user.delete({
                where: {
                        username: username
                }
        })
        .then(_ => true)
        .catch(e => {
                console.log("error occured with deleting user");
                return false;
        });
}


/**
 * Returns hashed password from DB
 * @param {String} username 
 * @returns {String}
 */
const getPasswordForUsername = async (username) => {
        return await prisma.user.findFirst({
                where: {username: username}
        })
        .then(u => u.password)
        .catch(e => {
                console.log("error occured with getting password for username"); 
                return undefined;
        });
}

module.exports = {deleteUser, addUser, getPasswordForUsername}