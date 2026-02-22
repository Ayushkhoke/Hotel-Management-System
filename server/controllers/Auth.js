const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signup=async(req,res)=>{
    try{
        const {firstname,lastname,email,password,confirmpassword,accountType,phone}=req.body;
   const image = req.file ? req.file.path : null;
        const userexists=await User.findOne({email}); 
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
            email,
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
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const payload={
            id:user._id,
            email:user.email,
            accountType:user.accountType
        }
        // geneart jwt passwort  match
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"});
           user.token=token;
           user.password=undefined;

        //    create a cookie
        const options={
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"Login successful",
            user,
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