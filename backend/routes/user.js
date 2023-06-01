const express = require("express");
const router = express.Router();

const { UserLogin, UserSignup } = require("../controllers/userController");

router.post("/login", UserLogin);

router.post("/signup", UserSignup);

module.exports = router;
