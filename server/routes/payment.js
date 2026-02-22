const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  verifyPaymentBooking
} = require("../controllers/Payment");

const { auth } = require("../middlewares/auth");

// Create Razorpay Order
router.post("/capturePayment", auth, capturePayment);

// Verify Razorpay Payment
router.post("/verifyPayment", auth, verifyPayment);
// router.post("/verifyPaymentBooking", auth, verifyPaymentBooking);
module.exports = router;
