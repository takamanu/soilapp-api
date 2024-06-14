const router = require("express").Router();
const { loginUser, registerUser } = require("../controller/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
