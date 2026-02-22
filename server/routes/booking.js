const express = require("express");
const router = express.Router();
const { bookRoom, getMyBookings,deleteBooking } = require("../controllers/Booking");

const { createMenu, getMenus, deleteMenu } = require("../controllers/menu");
const { auth, isAdmin } = require("../middlewares/auth");
const{upload}=require("../middlewares/upload")
const {
  placeOrder,
  getMyOrders,
  cancelOrder,
} = require("../controllers/order");
//booking
router.post("/bookroom", auth, bookRoom);
router.get("/my-bookings", auth, getMyBookings);
router.delete("/deletebooking", auth, deleteBooking);
// menus
router.post("/createmenu", auth, isAdmin,
  upload.single("image"),
   createMenu);
router.get("/getmenus", auth,getMenus);
router.delete("/deletemenu", auth, isAdmin, deleteMenu);




//order

router.post("/place", auth, placeOrder);
router.get("/my-orders", auth, getMyOrders);
router.put("/cancel", auth, cancelOrder);

module.exports = router;
