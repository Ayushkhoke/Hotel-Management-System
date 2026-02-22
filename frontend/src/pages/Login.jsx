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


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../services/authApi.jsx";
import {Link} from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:ring-2 focus:ring-amber-600 focus:outline-none text-black" 
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-amber-600 focus:outline-none text-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-amber-600 text-white 
                       font-semibold text-lg hover:bg-amber-700 
                       transition shadow-md"
          >
            Sign In
          </button>
         
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}

