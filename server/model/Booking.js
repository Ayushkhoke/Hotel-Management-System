// const mongoose = require('mongoose');

// const bookingSchema =new mongoose.Schema({
//   user: {
//      type: mongoose.Schema.Types.ObjectId,
//       ref: "User" },

//   room: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Room",
//       required: true
//     }
//   ],
    
//  checkIn: {
//     type: Date,
//     required: true
//   },

//   checkOut: {
//     type: Date,
//     required: true
//   },

//   totalPrice: {
//     type: Number,
//     required: true
//   },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },
//   status: {
//     type: String,
//     enum: ["booked", "cancelled", "completed"],
//     default: "booked",
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
