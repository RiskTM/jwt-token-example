const jwt = require("jsonwebtoken");
const services = require("../Services");

const token_middleware = async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")){
                return res.status(401).json({error: "Unauthorized: No Bearer Token provided"});
        }

        let token = authHeader.split(" ")[1];

        if (!token){
                return res.status(401).json({error: "Unauthorized: No Bearer Token provided"});
        }

        else if (services.isTokenValid(token, false)){
                next();
                return;
        }

        token = req.body.refreshToken;
        
        if (!token){
                return res.status(401).json({error: "Unauthorized: Bearer Token is invalid"});
        }

        else if (services.isTokenValid(token, true)){
                next();
        }
        else {
                return res.status(401).json({error: "Unauthorized: Bearer Token and refresh Token are invalid"});
        }
}

module.exports = {token_middleware}