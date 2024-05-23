const jwt = require("jsonwebtoken");
require("dotenv").config();

const {verifyToken} = require("./services/verifyToken");

const ROOTPATH = process.env.ROOTPATH;

const authenticateToken =  function (req, res, next){
        const accessToken = req.headers["authorization"].split(" ")[1];
        const refreshToken = req.body.refreshToken;

        if (accessToken != null){
                let verify = verifyToken(accessToken, false);
                if (verify.state){
                        req.user = verify.username;
                        next();
                        return;
                } else if (verify.reason === "expired" && refreshToken !== null){
                        verify = verifyToken(refreshToken, true);
                        if (verify.state){
                                req.user = verify.username;
                                next();
                                return;
                        }
                }
        }
        res.sendStatus(401);
}

module.exports = {authenticateToken}