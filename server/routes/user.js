const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  changePassword
} = require("../controllers/Auth");
const{
  upload
}=require('../middlewares/upload')

const { auth } = require("../middlewares/auth");

router.post("/signup", upload.single("image"), signup);

router.post("/login", login);
router.post("/change-password", auth, changePassword);

module.exports = router;
