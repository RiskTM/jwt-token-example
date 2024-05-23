const jwt = require("jsonwebtoken");
const { isTokenExpired } = require("./isTokenExpired");

require("dotenv").config();

const verifyToken = (token, isRefreshToken) => {
        const key = isRefreshToken ? process.env.REFRESH_TOKEN : process.env.ACCESS_TOKEN ;

        return jwt.verify(token, key, (err, user) => {
                if (err) {
                        const reason = isTokenExpired(err) ? "expired" : "invalid";
                        return {
                                state: false,
                                reason: reason
                        };
                }     
                return {
                        state: true,
                        username: user.name
                };
        });
}

module.exports = {verifyToken};