const bcrypt = require("bcrypt");

const services = require("../Services");

const login = async function (req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (await services.validatePassword(username, password)){
                res.status(202);
                res.json(await services.createTokens(username));
        }
        else {
                res.status(400);
                res.json({});
        }
}

module.exports = {login};