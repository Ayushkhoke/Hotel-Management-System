// const mongoose = require("mongoose");   
// const tableBookingSchema = new mongoose.Schema({
//   user: {
//      type: mongoose.Schema.Types.ObjectId,
//       ref: "User" },

//   table: {
//      type: mongoose.Schema.Types.ObjectId, 
//      ref: "Table" },

//    date: {
//     type: Date,
//     default: Date.now
//   },

//   timeSlot:{
//     type: String,
//     enum: ["morning", "afternoon", "evening", "night"],
//   },
  
// guests: {
//     type: Number,
//     required: true
//   },
// status: {
//   type: String,
//   enum: ["active", "cancelled"],
//   default: "active"
// }

// }, { timestamps: true });

// module.exports = mongoose.model("TableBooking", tableBookingSchema);

const mongoose = require("mongoose");

const tableBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  timeSlot: {
    type: String,
    enum: ["morning", "afternoon", "evening", "night"],
    required: true,
  },

  guests: {
    type: Number,
    required: true,
  },

  // ✅ ADD THIS
  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "paid", "active", "cancelled"],
    default: "pending",
  },

  paymentId: {
    type: String,
  }

}, { timestamps: true });

module.exports = mongoose.model("TableBooking", tableBookingSchema);
