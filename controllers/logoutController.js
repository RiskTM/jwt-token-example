const path = require("path");
const services = require("../Services");

const logout = async (req, res) => {
        const accessToken = req.body.accessToken;
        const refreshToken = req.body.refreshToken;

        await services.blacklistTokens(accessToken, refreshToken)

        res.status(200);
        res.sendFile(path.join(__dirname, "..", "views", "logout_page.html"))
}

module.exports = {logout};