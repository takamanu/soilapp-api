const router = require("express").Router();
const { getUsers, getUserByJwt, getUserById } = require("../controller/user");

router.get("/", getUsers);
router.get("/profile", getUserByJwt);
router.get("/:id", getUserById);

module.exports = router;
