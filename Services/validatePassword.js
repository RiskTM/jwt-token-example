const bcrypt = require("bcrypt");
const {getPasswordForUsername} = require("../models/UserModel");


/**
 * Returns bool if the username and password are correct
 * @param {String} username 
 * @param {String} password 
 * @returns {boolean} 
 */
const validatePassword = async (username, password) => {
        const pass_hashed = await getPasswordForUsername(username);
        
        if(pass_hashed != undefined && await bcrypt.compare(password, pass_hashed)){
                return true;
        }
        return false;
}

module.exports = {validatePassword};