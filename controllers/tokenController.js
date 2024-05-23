const jwt = require("jsonwebtoken");

const {generateAccessToken} = require("../services/createTokens");
const {verifyToken} = require("../services/verifyToken");

const generateAccessTokenFromRefreshToken = (req, res) => {
        const refreshToken = req.body.refreshToken;
        if (refreshToken === null) {
                res.sendStatus(401);
                return;
        }
        const verify = verifyToken(refreshToken, true);
        if (verify.state){
                const accessToken = generateAccessToken({name: verify.username});
                res.json({
                        accessToken: accessToken
                });
        }
        else {
                res.sendStatus(403);
        }

}


module.exports = {generateAccessTokenFromRefreshToken};
