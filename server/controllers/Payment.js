const {instance}=require("../config/razorpay");
const Payment = require("../model/Payment");
const User=require('../model/User')
const mongoose = require("mongoose");
const Order=require("../model/Order");
const TableBooking=require("../model/TableBooking");
const Room=require("../model/Room");
const Booking = require("../model/Booking");

const crypto = require("crypto");


// exports.capturePayment = async (req, res) => {
//   try {
//     const { amount, bookingId, tableBookingId, orderId, paymentFor } = req.body;

//     const options = {
//       amount: amount * 100, // Razorpay uses paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const razorpayOrder = await instance.orders.create(options);

//     // Save in DB
//     const payment = await Payment.create({
//       booking: paymentFor === "room" ? bookingId : null,
//       tableBooking: paymentFor === "table" ? tableBookingId : null,
//       order: paymentFor === "order" ? orderId : null,
//       user: req.user.id,
//       amount,
//       paymentFor,
//       status: "created",
//     });

//     return res.status(200).json({
//       success: true,
//      data:{
//          razorpayOrder,
//       paymentId: payment._id,
//      }
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Payment initiation failed",
//     });
//   }
// };

// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       paymentId
//     } = req.body;

//     // 🔍 Find payment record
//     const payment = await Payment.findById(paymentId);

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment record not found",
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     // ✅ Update payment status
//     payment.status = "paid";
//     await payment.save();

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//     });

//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };


// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       paymentId
//     } = req.body;

//     const payment = await Payment.findById(paymentId);

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment record not found",
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     // Update payment
//     payment.status = "paid";
//     await payment.save();

//     // Update order
//     await Order.findByIdAndUpdate(payment.order, {
//       paymentStatus: "paid"
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//     });

//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

///   controler for bboking room verfication

// exports.verifyPaymentBooking = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       paymentId,
//     } = req.body;

//     const payment = await Payment.findById(paymentId);

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment record not found",
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     // ✅ Update payment status
//     payment.status = "paid";
//     await payment.save();

//     // 🔥 If payment was for ROOM
//     if (payment.paymentFor === "room") {
//       await Booking.findByIdAndUpdate(payment.booking, {
//         paymentStatus: "paid",
//         status: "booked",
//       });
//     }

//     // 🔥 If payment was for ORDER
//     if (payment.paymentFor === "order") {
//       await Order.findByIdAndUpdate(payment.order, {
//         paymentStatus: "paid",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//     });

//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// exports.capturePayment = async (req, res) => {
//   try {
//     const { amount, bookingId, tableBookingId, orderId, paymentFor } = req.body;

//     console.log(amount);
//     // 🔴 VALIDATION
//     if (!amount) {
//       return res.status(400).json({
//         success: false,
//         message: "Amount is required",
//       });
//     }

//     if (!paymentFor) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment type is required",
//       });
//     }

//     const options = {
//       amount: amount * 100, // convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const razorpayOrder = await instance.orders.create(options);

//     // 💾 Save payment in DB
//     const payment = await Payment.create({
//       booking: paymentFor === "room" ? bookingId : null,
//       tableBooking: paymentFor === "table" ? tableBookingId : null,
//       order: paymentFor === "order" ? orderId : null,
//       user: req.user.id,
//       amount,
//       paymentFor,
//       status: "created",
//     });

//     return res.status(200).json({
//       success: true,
//       data: {
//         razorpayOrder,
//         paymentId: payment._id,
//       },
//     });

//   } catch (error) {
//     console.error("CAPTURE PAYMENT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Payment initiation failed",
//     });
//   }
// };


exports.capturePayment = async (req, res) => {
  try {
    const { amount, bookingId, orderId, paymentFor } = req.body;

    console.log("BODY:", req.body); // 👈 ADD THIS FOR DEBUG

    // 🔴 BASIC VALIDATION
    if (!amount || !paymentFor) {
      return res.status(400).json({
        success: false,
        message: "Amount and payment type are required",
      });
    }

    // 🔥 ADD THIS PART HERE 👇👇👇

    if (paymentFor === "room" && !bookingId) {
      return res.status(400).json({
        success: false,
        message: "Room booking ID is required",
      });
    }

    if (paymentFor === "table" && !bookingId) {
      return res.status(400).json({
        success: false,
        message: "Table booking ID is required",
      });
    }

    if (paymentFor === "order" && !orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // 🔥 Razorpay Order Options
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await instance.orders.create(options);

    const payment = await Payment.create({
      booking: paymentFor === "room" ? bookingId : null,
      tableBooking: paymentFor === "table" ? bookingId : null,
      order: paymentFor === "order" ? orderId : null,
      user: req.user.id,
      amount,
      paymentFor,
      status: "created",
    });

    return res.status(200).json({
      success: true,
      data: {
        razorpayOrder,
        paymentId: payment._id,
      },
    });

  } catch (error) {
    console.error("CAPTURE PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Payment initiation failed",
    });
  }
};


// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       paymentId,
//     } = req.body;

//     const payment = await Payment.findById(paymentId);

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment record not found",
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     // ✅ Update payment
//     payment.status = "paid";
//     await payment.save();

//     // 🔥 Dynamic update based on payment type
//     if (payment.paymentFor === "room" && payment.booking) {
//       await Booking.findByIdAndUpdate(payment.booking, {
//         paymentStatus: "paid",
//         status: "booked",
//       });
//     }

//     if (payment.paymentFor === "order" && payment.order) {
//       await Order.findByIdAndUpdate(payment.order, {
//         paymentStatus: "paid",
//       });
//     }

//     if (payment.paymentFor === "table" && payment.tableBooking) {
//       await TableBooking.findByIdAndUpdate(payment.tableBooking, {
//         paymentStatus: "paid",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//     });

//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// exports.verifyPaymentBooking = async (req, res) => {
//   console.log("hit verify payment");

//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       paymentId
//     } = req.body;

//     console.log("BODY:", req.body);

//     const payment = await Payment.findById(paymentId);
// console.log("Payment document:", payment);
// console.log("Booking ID:", payment.booking);

//     if (!payment) {
//       console.log("Payment not found");
//       return res.status(404).json({
//         success: false,
//         message: "Payment record not found",
//       });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     console.log("EXPECTED:", expectedSignature);
//     console.log("RECEIVED:", razorpay_signature);

//     if (expectedSignature !== razorpay_signature) {
//       console.log("Signature mismatch");
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     payment.status = "paid";
//     await payment.save();

//   if (payment.booking) {
//   await Booking.findByIdAndUpdate(payment.booking, {
//     paymentStatus: "paid",
//     status: "booked",
//   });
// }


//     return res.status(200).json({
//       success: true,
//       message: "Booking payment verified successfully",
//     });

//   } catch (error) {
//     console.error("VERIFY ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };



exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !paymentId) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification data",
      });
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // 🔐 Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // ✅ Update Payment Status
    payment.status = "paid";
    await payment.save();

    // 🔥 Dynamic Update Based on Payment Type

    if (payment.paymentFor === "room" && payment.booking) {
      await Booking.findByIdAndUpdate(payment.booking, {
        paymentStatus: "paid",
        status: "booked",
      });
    }

    if (payment.paymentFor === "order" && payment.order) {
      await Order.findByIdAndUpdate(payment.order, {
        paymentStatus: "paid",
      });
    }

    if (payment.paymentFor === "table" && payment.tableBooking) {
      await TableBooking.findByIdAndUpdate(payment.tableBooking, {
        paymentStatus: "paid",
        status: "confirmed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong during verification",
    });
  }
};
