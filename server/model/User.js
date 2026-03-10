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
         unique: true,
         index: true,
         trim: true,
         lowercase: true },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  googleId: {
    type: String,
  },

  password: { 
    type: String, 
    required: function requiredPassword() {
      return this.authProvider !== "google";
    },
  },

    confirmpassword: { 
    type: String, 
    required: function requiredConfirmPassword() {
      return this.authProvider !== "google";
    },
  },

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