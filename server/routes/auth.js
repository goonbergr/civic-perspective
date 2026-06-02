const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth");

router.post("/api/register", registerUser);

router.post("/api/login", loginUser);

module.exports = router;
