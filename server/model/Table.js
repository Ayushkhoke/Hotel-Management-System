const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    unique: true,
    required: true
  },

  capacity: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available"
  },

  image: {
    type: String, // Cloudinary URL
    default: null
  },

  video: {
    type: String, // Cloudinary URL
    default: null
  },
    price: {          // 🔥 ADD THIS
    type: Number,
    required: true
  },

}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);

