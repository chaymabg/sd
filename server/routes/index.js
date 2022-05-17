var express = require("express");

const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(400).json({ msg: "Invalid Authentication." })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication." })

      req.user = user
      next()
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}


const {
  Register,
  Login,
  verifyUser,
  forgotPassword,
  resetPassword


} = require('../controllers/users.controllers')
const uploadImage = require('../util/uploadImage')
const { uploadAvatar } = require('../controllers/uploadCtrl')
var router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const { AddProfile, FindAllProfiles, FindSingleProfile, DeleteProfile } = require("../controllers/profile.controllers");
const { AddLocalisation, FindLocation } = require("../controllers/localisation.c.JS");


/* users routes. */
router.post("/register", Register);
router.post("/login", Login);
/* localisation router */
router.post("/localisation", AddLocalisation);
router.get("/localisation/",FindLocation);

router.get("/confirm/:confirmationCode", verifyUser)
router.post('/forget', forgotPassword)
router.post('/upload_avatar', uploadImage, uploadAvatar)
router.post('/reset', passport.authenticate('jwt', { session: false }), resetPassword)
/* get all profiles */
router.get("/allprofiles",
  passport.authenticate("jwt", { session: false }),

  FindAllProfiles);
/* get one profiles */
router.get("/profile",
  passport.authenticate("jwt", { session: false }),
  FindSingleProfile);
/* delete profiles */
router.delete("/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile);
//IMAGE UPLOAD CONFIGURATION


/* add profile route */
router.post('/add', passport.authenticate("jwt", { session: false }), uploadImage, uploadAvatar)




module.exports = router;
