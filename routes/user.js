const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signup));

router
.route("/login")
.get(userController.renderLogin)
.post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync(userController.login));

//Logout Get Route
router.get("/logout", userController.logout);

module.exports = router;