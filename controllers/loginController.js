const bcrypt = require("bcrypt");

const {validatePassword} = require("../services/validatePassword");
const {createTokens} = require("../services/createTokens");


const login = async function (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        
        if ( validatePassword(username, password)){
                res.json(createTokens(username));
        }
        else {
                res.json({});
        }
}

module.exports = {login};