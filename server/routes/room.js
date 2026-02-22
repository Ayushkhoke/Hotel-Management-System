const express = require("express");
const router = express.Router();
const {
  createRoom,
  // addRoom,
  updateRoom,
  deleteRoom,
  getRooms
} = require("../controllers/Room");
const { createReview, deleteReview } = require("../controllers/Review");
const { auth, isAdmin } = require("../middlewares/auth");
const {upload } = require("../middlewares/upload");
//room 
router.post(
  "/createroom",
  auth,
  isAdmin,
  upload.single("image"), // 🔥 MUST BE HERE
  createRoom
);
// router.post("/addroom", auth, isAdmin, addRoom);
router.put(
  "/updateroom",
  auth,
  isAdmin,
  upload.single("image"), // 🔥 REQUIRED
  updateRoom
);

router.delete("/deleteroom", auth, isAdmin, deleteRoom);
router.get("/getRooms", auth, getRooms);

//review
router.post("/create", auth, createReview);
router.delete("/delete", auth, deleteReview);

module.exports = router;
