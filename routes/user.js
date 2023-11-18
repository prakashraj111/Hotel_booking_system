const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");


// combine form of signup get and post route
router.route("/signup")
.get( userController.renderSignupForm)
.post( wrapAsync (userController.signup));

// post signup
// router.get("/signup", userController.renderSignupForm);

// //  post signup route
// router.post("/signup", wrapAsync (userController.signup));

//combine form of login get and post route
router.route("/login")
.get(userController.renderLoginform)
.post( saveRedirectUrl, passport.authenticate('local', {failureRedirect: './login', failureFlash: true}),  userController.login);

// router.get("/login", userController.renderLoginform);

// router.post("/login", saveRedirectUrl, passport.authenticate('local', {failureRedirect: './login', failureFlash: true}),  userController.login);

//logout
router.get("/logout", userController.logout);

module.exports = router;
