const express = require("express");
const router = express.Router();

const {generateAccessTokenFromRefreshToken} = require("../controllers/tokenController.js");

router.post("/", generateAccessTokenFromRefreshToken);

module.exports = router;