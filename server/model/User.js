const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
     type: String,
      required: true },

       lastname: {
     type: String,
      required: true },

      email: { 
        type: String,
         required: true, 
         unique: true },

  password: { 
    type: String, 
    required: true },

    confirmpassword: { 
    type: String, 
    required: true },

  accountType: {
        type: String,
        enum: ["Admin", "User"],
    },

   
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    resetpasswordexpires: {
        type: Date
    },
     phone:{
        type: String,
     }



}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);