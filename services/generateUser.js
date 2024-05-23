const {addUser} = require("../models/UserModel");

const generateUser = async (username, password) => {
        await addUser(username, password);
}

module.exports = {generateUser};