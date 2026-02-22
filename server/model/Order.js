// const mongoose = require("mongoose");
// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   items: [
//     {
//       menuItem: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "Menu" },
//       quantity: Number,
//     }
//   ],
//   totalAmount: Number,
//   status: {
//     type: String,
//     enum: ["placed", "preparing", "served", "cancelled"],
//     default: "placed"
//   }
// }, { timestamps: true });
// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  items: [
    {
      menuItem: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Menu" 
      },
      quantity: {
        type: Number,
        required: true,
      },
    }
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["placed", "preparing", "served", "cancelled"],
    default: "placed",
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
