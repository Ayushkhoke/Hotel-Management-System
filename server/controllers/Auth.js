const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");


exports.signup=async(req,res)=>{
    try{
        const {firstname,lastname,email,password,confirmpassword,accountType,phone}=req.body;
   const image = req.file ? req.file.path : null;
    const normalizedEmail = email?.trim().toLowerCase();
    const userexists=await User.findOne({ email: normalizedEmail }).select("_id").lean(); 
        if(userexists){
            return res.status(400).json({message:"User already exists"});
        }
        if(!firstname || !lastname || !email || !password  || !accountType || !phone ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"});
        }
if (!req.file) {
  return res.status(400).json({
    success: false,
    message: "Profile image is required",
  });
}

        if(password!==confirmpassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
            
        const newUser=await User.create({
            firstname,
            lastname,
          email: normalizedEmail,
            password:hashedPassword,
            confirmpassword:confirmpassword,
            accountType,
            image: image,
            phone
        });
        return res.status(201).json({
            success:true,
            message:"User created successfully",
            data:newUser
        });

    }
    catch(error){
        res.status(500).json({
            message:"Signup failed",error:error.message
        });
        
    }
}


exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
    const normalizedEmail = email.trim().toLowerCase();
    const user=await User.findOne({ email: normalizedEmail })
      .select("firstname lastname email password accountType image authProvider googleId phone")
      .lean();
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }

        if (user.authProvider === "google" || !user.password) {
          return res.status(400).json({
            success: false,
            message: "This account uses Google sign-in. Please continue with Google.",
          });
        }

        const payload={
            id:user._id,
            email:user.email,
            accountType:user.accountType
        }
        // geneart jwt passwort  match
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"});
           const safeUser = {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          accountType: user.accountType,
          image: user.image,
          authProvider: user.authProvider,
          googleId: user.googleId,
          phone: user.phone,
           };

        //    create a cookie
        const options={
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"Login successful",
          user: safeUser,
            token       
        });
        }
        else{
            return res.status(400).json( {
                
            success:false,
        message:"Invalid credentials"});

        }
    }catch(error){
        res.status(500).json({
            message:"Login failed",error:error.message
        });
    }
}

exports.googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    const tokenInfoResponse = await axios.get("https://oauth2.googleapis.com/tokeninfo", {
      params: { id_token: idToken },
    });

    const tokenInfo = tokenInfoResponse.data;

    if (!tokenInfo?.email || tokenInfo.email_verified !== "true") {
      return res.status(401).json({
        success: false,
        message: "Google account email is not verified",
      });
    }

    if (process.env.GOOGLE_CLIENT_ID && tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({
        success: false,
        message: "Google token audience mismatch",
      });
    }

    const email = tokenInfo.email.trim().toLowerCase();
    let user = await User.findOne({ email });

    if (!user) {
      const fullName = tokenInfo.name || "Google User";
      const [first = "Google", ...rest] = fullName.trim().split(" ");
      const last = rest.join(" ") || "User";

      user = await User.create({
        firstname: tokenInfo.given_name || first,
        lastname: tokenInfo.family_name || last,
        email,
        accountType: "User",
        phone: "0000000000",
        image: tokenInfo.picture || `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(first)}`,
        authProvider: "google",
        googleId: tokenInfo.sub,
      });
    } else {
      if (!user.authProvider) {
        user.authProvider = "local";
      }

      if (!user.googleId) {
        user.googleId = tokenInfo.sub;
      }

      if (!user.image && tokenInfo.picture) {
        user.image = tokenInfo.picture;
      }

      await user.save();
    }

    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    user.token = token;
    user.password = undefined;
    user.confirmpassword = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};


// exports.changePassword = async (req, res) => {
//   try {
//     const { email,oldPassword, newPassword } = req.body;
//   const userid=req.user.id;
//     if (!oldPassword || !newPassword || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }

//     const user = await User.findOne({email});
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Old password is incorrect"
//       });
//     }
//     const user_id=req.body;

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Password changed successfully"
      
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Change password failed",
//       error: error.message
//     });
//   }
// };

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
  console.log("change password api call is hit")
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstname, lastname, phone } = req.body;
    const image = req.file ? req.file.path : null;

    if (!firstname || !lastname) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields
    user.firstname = firstname;
    user.lastname = lastname;
    if (phone) user.phone = phone;
    if (image) user.image = image;

    await user.save();

    // Return updated user without password
    user.password = undefined;
    user.confirmpassword = undefined;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};