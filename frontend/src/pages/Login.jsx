// import react from 'react'
// import  {useState} from 'react'
// import {useDispatch} from 'react-redux'
// import {useNavigate} from 'react-router-dom'
// import {LoginUser} from '../services/authApi.jsx'
// export default function Login() {

//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const[formData,setFormData]=useState({email:"",password:""});
//     const[showpassword,setShowpassword]=useState(false);
//     function changehandler(e){
//         setFormData((prev)=>({
//             ...prev,
//             [e.target.name]:e.target.value,
//         }))
//     }
//     function submithandler(e){
//         e.preventDefault();
//         dispatch(LoginUser(formData,navigate));
        
//     }
//     return (
//         <div>   
// <form onSubmit={submithandler}>
//                 <h1>Login Page</h1>
//             <label>Email:</label>
//      <input type="email" placeholder="emailadderess" name="email" onChange={changehandler} value={formData.email}/>
//       <input type={showpassword?"text":"password"} placeholder="password" name="password" onChange={changehandler} value={formData.password}/>


//       <button type="submit">Login </button>
// </form>
//         </div>

//     )
// }


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginUser, googleAuthUser } from "../services/authApi.jsx";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [googleStatus, setGoogleStatus] = useState("loading");

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId) {
      setGoogleStatus("missing-client-id");
      return;
    }

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id) {
        setGoogleStatus("script-not-ready");
        return;
      }
      
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response) => {
          if (response?.credential) {
            dispatch(googleAuthUser(response.credential, navigate));
          }
        },
      });

      // Render the official Google button
      const buttonDiv = document.getElementById("google-signin-button");
      if (buttonDiv) {
        // Google expects width as number (px), not "%".
        const computedWidth = Math.max(240, Math.min(400, Math.floor(buttonDiv.clientWidth || 320)));
        buttonDiv.innerHTML = "";
        window.google.accounts.id.renderButton(
          buttonDiv,
          {
            theme: "outline",
            size: "large",
            width: computedWidth,
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left"
          }
        );
        setGoogleStatus("ready");
      } else {
        setGoogleStatus("container-missing");
      }
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    script.onerror = () => setGoogleStatus("script-load-failed");
    document.body.appendChild(script);

    const rerenderOnResize = () => initializeGoogle();
    window.addEventListener("resize", rerenderOnResize);

    return () => {
      window.removeEventListener("resize", rerenderOnResize);
    };
  }, [dispatch, googleClientId, navigate]);

  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(LoginUser(formData, navigate));
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
backgroundImage:
"url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0)"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        
        {/* Brand */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Hotel Management
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Secure staff & admin login
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@hotel.com"
              value={formData.email}
              onChange={changeHandler}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-600 focus:outline-none text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 ">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={changeHandler}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-600 focus:outline-none text-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-amber-600 text-white font-semibold text-lg hover:bg-amber-700 transition shadow-md"
          >
            Sign In
          </button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign-In Button (Rendered by Google) */}
          <div id="google-signin-button" className="w-full flex justify-center"></div>
          {googleStatus !== "ready" && (
            <p className="text-xs text-center text-red-600 mt-2">
              {googleStatus === "missing-client-id" && "Google Sign-In is disabled: missing VITE_GOOGLE_CLIENT_ID in deployment env."}
              {googleStatus === "script-load-failed" && "Google script failed to load. Check network/CSP/ad-block settings."}
              {googleStatus === "script-not-ready" && "Google Sign-In is still initializing."}
              {googleStatus === "container-missing" && "Google button container not found."}
            </p>
          )}
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}

