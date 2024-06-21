const {Router} = require("express");
const router = Router();

const {getAge, getName, api_landing_page} = require("../controllers/apiController");

router.post("/", api_landing_page);
router.post("/getName", getName);
router.post("/getAge", getAge);

module.exports = router;