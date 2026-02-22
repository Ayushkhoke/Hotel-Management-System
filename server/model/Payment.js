const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    
  },
    tableBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TableBooking",
  
  },
  order:{
        type: mongoose.Schema.Types.ObjectId,
    ref: "Order",

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
     type: Number, 
     required: true },

 status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },

  paymentFor: {
  type: String,
  enum: ["room", "table", "order"],
  required: true
}



}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
