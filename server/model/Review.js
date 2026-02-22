const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
  room: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Room" },
  rating: { 
    type: Number, min: 1, max: 5 },
    comment: {
    type: String,
    required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
