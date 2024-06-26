const {generateUser} = require("../services/generateUser");

async function addNewUser(req, res){
        const username = req.body.username;
        const password = req.body.password;
        await generateUser(username, password);
        res.sendStatus(202)
}

module.exports = {addNewUser};