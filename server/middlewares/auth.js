// const jwt=require("jsonwebtoken");
// require("dotenv").config();
// const User=require("../model/User");

// exports.auth=async(req,res,next)=>{
//     try{
//         console.log("AUTH MIDDLEWARE HIT");

//         const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
//         console.log("AUTH HEADER:", req.headers.authorization);
// console.log("COOKIES:", req.cookies);

//         if(!token){
//             return res.status(401).json({message:"Unauthorized"});
//         }
//         try{
// const decode=await jwt.verify(token,process.env.JWT_SECRET);
//  console.log(decode);
//   req.user=decode;  
//   console.log("token is valid or ot",token);      
// }
//         catch(error){
//             return res.status(401).json({
//                 success:false,
//                 message:"token invalid"});
//         }
//         next();
//     }
//     catch(error){
//         res.status(500).json({
//             success:false,
//             message:"something went wrong wentoken not present",error:error.message});

//     }
// }

// exports.isAdmin=async(req,res,next)=>{
//     try{
//         console.log("IS ADMIN HIT", req.user);
//         if(req.user.accountType!=="Admin"){
//             return res.status(403).json({
//                 success:false,
//                 message:"admin access"
//             });
//         }
//         next();
//     }
//     catch(error){
//         res.status(500).json({
//             success:false,
//             message:"something went wrong in admin",error:error.message});
//     }
// }

// exports.isUser=async(req,res,next)=>{
//     try{
//         if(req.user.accountType!=="User"){
//             return res.status(403).json({
//                 success:false,
//                 message:"user access"
//             });
//         }

//         next(); 
//     }
//     catch(error){
//         res.status(500).json({
//             success:false,
//             message:"something went wrong in student",error:error.message});
//     }
// }




const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

exports.auth = async (req, res, next) => {
  try {
    console.log("AUTH MIDDLEWARE HIT");
    console.log("AUTH HEADER:", req.headers.authorization);
    console.log("COOKIES:", req.cookies);

    let token = null;

    // ✅ 1️⃣ DEFAULT: Authorization Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("USING TOKEN FROM HEADER");
    }

    // ✅ 2️⃣ Fallback: cookie token
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log("USING TOKEN FROM COOKIE");
    }

    // ✅ 3️⃣ Fallback: body token
    else if (req.body && req.body.token) {
      token = req.body.token;
      console.log("USING TOKEN FROM BODY");
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not present",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    console.log("TOKEN VERIFIED:", decoded.email);

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    console.log("IS ADMIN HIT", req.user);

    if (!req.user || req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in admin",
      error: error.message,
    });
  }
};

exports.isUser = async (req, res, next) => {
  try {
    if (!req.user || req.user.accountType !== "User") {
      return res.status(403).json({
        success: false,
        message: "User access only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in user",
      error: error.message,
    });
  }
};
