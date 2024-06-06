const bcrypt = require("bcrypt");

const {validatePassword} = require("../services/validatePassword");
const {createTokens} = require("../services/createTokens");


const login = async function (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        
        if ( validatePassword(username, password)){
                res.sendStatus(202);
                res.json(createTokens(username));
        }
        else {
                res.sendStatus(400);
                res.json({});
        }
}

module.exports = {login};