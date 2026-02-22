// import React from 'react'
// import  {useState} from 'react'

// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
  
// export default function Signup() {
// const dispatch=useDispatch();
//   const navigate=useNavigate();
//   const [formData,setformData]=useState({
//     firstName:"",
//     lastName:"",
//     email:"", 
//     password:"",
//     confirmpassword:"",
//     accountType:"User",
//     phone:""
//   })

//   function  changehandler(e){
//     setformData((prev)=>({
//       ...prev,
//       [e.target.name]:e.target.value,
//     }))
//   }

//   function submithandler(e){
//     e.preventDefault();
//     dispatch(Signup(FormData))
//     navigate("/verifyemail");
//   }



//   return (


//     <div>
//       <form onSubmit={submithandler}> 
// <h1>Signup Page</h1>
// <label>First Name:</label>
// <input type="text" placeholder="First Name" name="firstName" onChange={changehandler} value={formData.firstName}/>
// <label>Last Name:</label>
// <input type="text" placeholder="Last Name" name="lastName" onChange={changehandler} value={formData.lastName}/>
// <label>Email:</label>
// <input type="email" placeholder="emailadderess" name="email" onChange={changehandler} value={formData.email}/>

// <label>Password:</label>
// <input type="password" placeholder="password" name="password" onChange={changehandler} value={formData.password}/>
// <label>Confirm Password:</label>
// <input type="password" placeholder="confirm password" name="confirmpassword" onChange={changehandler} value={formData.confirmpassword}  />
// <label>Account Type:</label>
// <select name="accountType" onChange={changehandler} value={formData.accountType}>
//   <option value="User">Customer</option>
//   <option value="Admin">Admin</option>
// </select>
// <label>Phone:</label>
// <input type="text" placeholder="phone number" name="phone" onChange={changehandler} value={formData.phone}/>
    


//       </form>
      
//     </div>
//   )
// }   
    
// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { signupUser } from "../services/authApi";
// export default function Signup() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setformData] = useState({
//       firstname:"",
//   lastname:"",
//   email: "",
//   password: "",
//   confirmpassword: "",
//   accountType: "User",
//   phone: "",
//    image: null, 
//   });

//   // function changehandler(e) {
//   //   setformData((prev) => ({
//   //     ...prev,
//   //     [e.target.name]: e.target.value,
//   //   }));
//   // }
//   function changehandler(e) {
//   if (e.target.name === "image") {
//     setformData((prev) => ({
//       ...prev,
//       image: e.target.files[0],   // ✅ FILE OBJECT
//     }));
//   } else {
//     setformData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   }
// }


//   // function submithandler(e) {
//   //   e.preventDefault();
//   //   dispatch(signupUser(formData,navigate));
 
//   // }
//   function submithandler(e) {
//   e.preventDefault();

//   const form = new FormData();

//   for (let key in formData) {
//     form.append(key, formData[key]);
//   }

//   dispatch(signupUser(form, navigate));
// }


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
//       <form
//         onSubmit={submithandler}
//         className="bg-white text-black w-full max-w-lg rounded-2xl shadow-2xl p-8 space-y-4"
//       >
//         <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
//           Create Your Account
//         </h1>

//         <div className="flex gap-4">
//          <label>First Name:</label>
//           <input
//             type="text"
//             placeholder="First Name"
//             name="firstname"
//             onChange={changehandler}
//             value={formData.firstname}
//             className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Last Name"
//             name="lastname"
//             onChange={changehandler}
//             value={formData.lastname}
//             className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//         </div>

//         <input
//           type="email"
//           placeholder="Email Address"
//           name="email"
//           onChange={changehandler}
//           value={formData.email}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           onChange={changehandler}
//           value={formData.password}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           name="confirmpassword"
//           onChange={changehandler}
//           value={formData.confirmpassword}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />

//         <select
//           name="accountType"
//           onChange={changehandler}
//           value={formData.accountType}
//           className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
//         >
//           <option value="User">Customer</option>
//           <option value="Admin">Admin</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Phone Number"
//           name="phone"
//           onChange={changehandler}
//           value={formData.phone}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />
//         <input
//   type="file"
//   name="image"
//   accept="image/*"
//   onChange={changehandler}
//   className="w-full px-4 py-3 border rounded-lg"
// />


//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-center text-gray-500">
//           Already have an account?
//           <span className="text-indigo-600 cursor-pointer hover:underline ml-1">
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { signupUser } from "../services/authApi";

// export default function Signup() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setformData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//     accountType: "User",
//     phone: "",
//     image: null,
//   });

//   // Handle Input Change
//   function changehandler(e) {
//     if (e.target.name === "image") {
//       setformData((prev) => ({
//         ...prev,
//         image: e.target.files[0],   // File object
//       }));
//     } else {
//       setformData((prev) => ({
//         ...prev,
//         [e.target.name]: e.target.value,
//       }));
//     }
//   }

//   // Handle Submit
//   function submithandler(e) {
//     e.preventDefault();

//     const form = new FormData();

//     form.append("firstname", formData.firstname);
//     form.append("lastname", formData.lastname);
//     form.append("email", formData.email);
//     form.append("password", formData.password);
//     form.append("confirmpassword", formData.confirmpassword);
//     form.append("accountType", formData.accountType);
//     form.append("phone", formData.phone);

//     if (formData.image) {
//       form.append("image", formData.image);
//     }

//     dispatch(signupUser(form, navigate));
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
//       <form
//         onSubmit={submithandler}
//         className="bg-white text-black w-full max-w-lg rounded-2xl shadow-2xl p-8 space-y-4"
//       >
//         <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
//           Create Your Account
//         </h1>

//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="First Name"
//             name="firstname"
//             onChange={changehandler}
//             value={formData.firstname}
//             className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//           />

//           <input
//             type="text"
//             placeholder="Last Name"
//             name="lastname"
//             onChange={changehandler}
//             value={formData.lastname}
//             className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//         </div>

//         <input
//           type="email"
//           placeholder="Email Address"
//           name="email"
//           onChange={changehandler}
//           value={formData.email}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           onChange={changehandler}
//           value={formData.password}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           name="confirmpassword"
//           onChange={changehandler}
//           value={formData.confirmpassword}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />

//         <select
//           name="accountType"
//           onChange={changehandler}
//           value={formData.accountType}
//           className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
//         >
//           <option value="User">Customer</option>
//           <option value="Admin">Admin</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Phone Number"
//           name="phone"
//           onChange={changehandler}
//           value={formData.phone}
//           className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//         />

//         {/* Profile Image Upload */}
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={changehandler}
//           className="w-full px-4 py-3 border rounded-lg"
//         />

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-center text-gray-500">
//           Already have an account?
//           <span className="text-indigo-600 cursor-pointer hover:underline ml-1">
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authApi";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    accountType: "User",
    phone: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  function changehandler(e) {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setformData((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setformData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function submithandler(e) {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });

    dispatch(signupUser(form, navigate));
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6 py-16 text-black">

      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Hotel"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-8 md:p-14">

          <h1 className="text-3xl md:text-4xl font-light mb-8 text-gray-900">
            Create Your Account
          </h1>

          <form onSubmit={submithandler} className="space-y-6">

            {/* Profile Preview */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Upload
                  </div>
                )}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                onChange={changehandler}
                value={formData.firstname}
                className="border-b border-gray-300 focus:border-black outline-none py-2"
                required
              />

              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                onChange={changehandler}
                value={formData.lastname}
                className="border-b border-gray-300 focus:border-black outline-none py-2"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={changehandler}
              value={formData.email}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              required
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={changehandler}
              value={formData.password}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              onChange={changehandler}
              value={formData.confirmpassword}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              required
            />

            <select
              name="accountType"
              onChange={changehandler}
              value={formData.accountType}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2 bg-transparent"
            >
              <option value="User">Customer</option>
              <option value="Admin">Admin</option>
            </select>

            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              onChange={changehandler}
              value={formData.phone}
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              required
            />

            {/* File Upload */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={changehandler}
              className="w-full text-sm text-gray-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition duration-300"
            >
              Create Account
            </button>

            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-black cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

