const bcrypt = require("bcrypt");

const {getPasswordForUsername} = require("../models/UserModel");

const validatePassword = async (username, password) => {
        const passwordDB = await getPasswordForUsername(username);

        return (passwordDB !== null && bcrypt.compare(password, passwordDB));
}

module.exports = {validatePassword};