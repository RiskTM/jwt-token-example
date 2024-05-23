const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const addUser = async (username, password) => {
        await prisma.user.create({data: {username: username, password: password}})
        .catch(e => {console.log("error occured")})
}
      
const deleteUser = async (username) => {
        prisma.user.delete({
                where: {
                        username: username
                }
        });
}

const getPasswordForUsername = async (username) => {
        const user = await prisma.user.findFirst({
                where: {username: username}
        });
        return user.password;
}

module.exports = {deleteUser, addUser, getPasswordForUsername}