// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changePassword } from "../services/authApi";
// import { toast } from "react-hot-toast";

// export default function ChangePassword() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!token) {
//       toast.error("You must be logged in");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     dispatch(
//       changePassword(
//         {
//           oldPassword,
//           newPassword,
//         },
//         token
//       )
//     );

//     setOldPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-96 space-y-6"
//       >
//         <h2 className="text-2xl font-semibold text-center">
//           Change Password
//         </h2>

//         <input
//           type="password"
//           placeholder="Old Password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className="w-full border p-2 rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
//         >
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changePassword } from "../services/authApi";
// import { toast } from "react-hot-toast";

// export default function ChangePassword() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showOld, setShowOld] = useState(false);
//   const [showNew, setShowNew] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!token) {
//       toast.error("You must be logged in");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }

//     dispatch(
//       changePassword(
//         {
//           oldPassword,
//           newPassword,
//         },
//         token
//       )
//     );

//     setOldPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   }

//   return (
//     <div className="relative min-h-screen flex items-center justify-center px-4">

//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
//           alt="background"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/60"></div>
//       </div>

//       {/* Glass Card */}
//       <div className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 md:p-10 text-white">

//         <h2 className="text-3xl font-semibold text-center mb-8 tracking-wide">
//           Change Password
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Old Password */}
//           <div className="relative">
//             <input
//               type={showOld ? "text" : "password"}
//               placeholder="Old Password"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               required
//               className="input-style"
//             />
//             <span
//               onClick={() => setShowOld(!showOld)}
//               className="absolute right-3 top-3 text-sm cursor-pointer opacity-70"
//             >
//               {showOld ? "Hide" : "Show"}
//             </span>
//           </div>

//           {/* New Password */}
//           <div className="relative">
//             <input
//               type={showNew ? "text" : "password"}
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="input-style"
//             />
//             <span
//               onClick={() => setShowNew(!showNew)}
//               className="absolute right-3 top-3 text-sm cursor-pointer opacity-70"
//             >
//               {showNew ? "Hide" : "Show"}
//             </span>
//           </div>

//           {/* Confirm Password */}
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="input-style"
//           />

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg"
//           >
//             Update Password
//           </button>

//         </form>
//       </div>

//       {/* Custom Styles */}
//       <style>
//         {`
//           .input-style {
//             width: 100%;
//             padding: 12px 16px;
//             border-radius: 9999px;
//             background: rgba(255,255,255,0.15);
//             border: 1px solid rgba(255,255,255,0.3);
//             outline: none;
//             color: white;
//             transition: all 0.3s ease;
//           }

//           .input-style::placeholder {
//             color: rgba(255,255,255,0.7);
//           }

//           .input-style:focus {
//             border: 1px solid #a855f7;
//             box-shadow: 0 0 10px rgba(168,85,247,0.6);
//           }
//         `}
//       </style>

//     </div>
//   );
// }

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../services/authApi";
import { toast } from "react-hot-toast";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      toast.error("You must be logged in");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    dispatch(changePassword({ oldPassword, newPassword }, token));

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">

      {/* 🔥 Royal Luxury Hotel Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Hotel Lobby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      </div>

      {/* 💎 Luxury Glass Card */}
      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md border border-yellow-500/40 shadow-2xl rounded-2xl p-8 md:p-10 text-white">

        <h2 className="text-3xl font-light text-center mb-8 tracking-wider text-yellow-400">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Old Password */}
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="luxury-input"
            />
            <span
              onClick={() => setShowOld(!showOld)}
              className="absolute right-4 top-3 text-sm text-yellow-300 cursor-pointer"
            >
              {showOld ? "Hide" : "Show"}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="luxury-input"
            />
            <span
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-3 text-sm text-yellow-300 cursor-pointer"
            >
              {showNew ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="luxury-input"
          />

          {/* Premium Animated Button */}
          <button
            type="submit"
            className="relative w-full py-3 rounded-full font-semibold text-black bg-gradient-to-r from-yellow-400 to-amber-500 overflow-hidden group transition-all duration-500"
          >
            <span className="relative z-10 group-hover:text-white transition duration-500">
              Update Password
            </span>

            <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition duration-500 ease-out"></span>
          </button>

        </form>
      </div>

      {/* 🎨 Custom Luxury Styling */}
      <style>
        {`
          .luxury-input {
            width: 100%;
            padding: 12px 18px;
            border-radius: 9999px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(212,175,55,0.4);
            outline: none;
            color: white;
            transition: all 0.4s ease;
          }

          .luxury-input::placeholder {
            color: rgba(255,255,255,0.6);
          }

          .luxury-input:focus {
            border: 1px solid #d4af37;
            box-shadow: 0 0 14px rgba(212,175,55,0.8);
          }
        `}
      </style>

    </div>
  );
}