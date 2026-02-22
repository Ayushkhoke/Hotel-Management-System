// import toast from "react-hot-toast";
// import { auth } from "./apis";
// import { apiConnector } from "./apiconnector";
// import { setLoading } from "../slices/authSlice.jsx";

// export function signupUser(formData){

// return async(dispatch)=>{
//     dispatch(setLoading(true));
//     try{
//      const res=await apiConnector("POST",auth.SIGNUP_API,formData);
//      console.log("res",res);

//      if(!res.data.success){
//         throw new Error(res.data.message);
//      }
//       toast.success("Signup Successful! Please Verify your email");
//       navigate("/verifyemail");
//     }
//     catch(error){
//         console.log("Signup error",error);
//         toast.error("Failed to signup");
//     }   


//     dispatch(setLoading(false)); 
// }

// }

// services/authApi.jsx


//signup
import toast from "react-hot-toast";
import { auth } from "./apis";
import {apiConnector} from './apiconnector';
import { setLoading, setToken,setUser } from "../slices/authSlice";

export function signupUser(formData, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", auth.SIGNUP_API, formData);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      //
      toast.success("Signup successful! Please verify your email");
      navigate("/dashboard/my-profile");
    

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to signup"
      );
    

    } 
      dispatch(setLoading(false));
    
  };
}


//login
export function LoginUser(formData, navigate) {
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try{
      const res=await apiConnector("POST",auth.LOGIN_API,formData);

      if(!res.data.success){
        throw new Error(res.data.message);
      }
      dispatch(setToken(res.data.token));
      const userImage=res.data?.user?.image
        ?res.data.user.image
        :`https://api.dicebear.com/5.x/initials/svg?seed=${res.data.user.firstname}`

        dispatch(setUser({...res.data.user, image: userImage}));
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
      toast.success("Login Successful!");
      navigate("/dashboard");
    }catch(error){
      toast.error(
        error.response?.data?.message || "Failed to login"
      );

    }
    dispatch(setLoading(false));
  }

}

//logout
export function logoutUser(navigate){
  return async (dispatch)=>{
    dispatch(setLoading(true));
    try{
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");

      localStorage.removeItem("user");
      toast.success("Logout Successful!");
      navigate("/");
    }
    catch(error){

      toast.error("Failed to logout");
    }
    dispatch(setLoading(false));
  }
}

// export function changePassword(data, token) {
//   return async (dispatch) => {
//     dispatch(setLoading(true));

//     try {
//       console.log("change data",data);
//       const response = await apiConnector(
//         "POST",
//         auth.CHANGE_PASSWORD_API,
//         data,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Password changed successfully!");

//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to change password"
//       );
//     }

//     dispatch(setLoading(false));
//   };
// }


// services/authApi.js


// services/authApi.js



export function changePassword(data, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "POST",
        auth.CHANGE_PASSWORD_API,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
   console.log("changepassword",data);
      toast.success("Password changed successfully!");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
    }

    dispatch(setLoading(false));
  };
}