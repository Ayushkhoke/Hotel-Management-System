const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { 
    type: String, 
    required: true,
    unique: true 
  },

  type: { 
    type: String,
    required: true,
    enum: ["Single", "Double", "Deluxe", "Suite"] 
  },

  pricePerNight: { 
    type: Number, 
    required: true 
  },

  capacity: { 
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  isAvailable: {
    type: Boolean,
    default: true
  },

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
