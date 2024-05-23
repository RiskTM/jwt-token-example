const express = require("express");
const router = express.Router();

const {addUserToDB, addNewUser} = require("../controllers/userController.js");

router.post("/addUser", addNewUser);

module.exports = router;