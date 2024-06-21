const {Router} = require("express");
const router = Router();

const {addUser, deleteUser} = require("../controllers/userController");

router.post("/add", addUser);
router.post("/delete", deleteUser);

module.exports = router;