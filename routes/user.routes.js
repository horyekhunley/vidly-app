const express = require("express")
const auth = require("../middleware/auth.middleware")
const {
  register,
  login,
  getLoggedInUser,
} = require("../controllers/user.controllers")
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/user").get(auth, getLoggedInUser)

module.exports = router
