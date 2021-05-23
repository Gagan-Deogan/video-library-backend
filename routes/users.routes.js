const express = require("express")
const router = express.Router();
const { userLogin , newUser } = require("../controllers/user.controller.js")

router.post("/",newUser)

router.post("/login", userLogin)

module.exports = router;