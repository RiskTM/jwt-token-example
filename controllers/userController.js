
const services = require("../Services");

const addUser = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (await services.addUserToDB(username, password)){
                res.sendStatus(202);
                return;
        }
        res.sendStatus(208);
}

const deleteUser = async(req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (await services.validatePassword(username, password)){
                await services.deleteUserInDB(username)
                res.sendStatus(202);
                return;
        }
        res.sendStatus(208);
}

module.exports = {addUser, deleteUser};