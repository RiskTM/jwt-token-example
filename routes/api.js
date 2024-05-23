const express = require("express");
const router = express.Router();

const {api_landing_page, getName, getAge} = require("../controllers/apiController.js");

router.post("/", api_landing_page);
router.post("/getName", getName);
router.post("/getAge", getAge);

module.exports = router;