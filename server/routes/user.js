const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  changePassword,
  googleAuth,
  updateProfile,
} = require("../controllers/Auth");
const{
  upload
}=require('../middlewares/upload')

const { auth } = require("../middlewares/auth");

router.post("/signup", upload.single("image"), signup);

router.post("/login", login);
router.post("/google", googleAuth);
router.post("/change-password", auth, changePassword);
router.put("/update-profile", auth, upload.single("image"), updateProfile);

module.exports = router;
