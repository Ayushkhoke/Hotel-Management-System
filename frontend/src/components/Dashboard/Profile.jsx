import React from "react";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
export default function Profile() {
    const{user }=useSelector((state)=>state.auth);
    if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-lg">Loading profile...</p>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 w-[85%]">
      
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-500 h-40 relative">
          <div className="absolute -bottom-12 left-8">
         <img
  src={user?.image}
  alt="Profile"
  className="w-24 h-24 rounded-full object-cover border-4 border-white"
/>

          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-8 pb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.firstname}
          </h1>
          <h1 className="text-2xl font-bold text-gray-800">
            {user?.lastname}
          </h1>
         

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-800">
                {user.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-800">
                {user.accountType}
              </p>
            </div>

            
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button className="px-6 py-3 rounded-lg bg-amber-600 text-white 
                               font-semibold hover:bg-amber-700 transition">
              Edit Profile
            </button>

           <Link to="/change-password">
            <button className="px-6 py-3 rounded-lg border border-gray-300 
                               text-gray-700 font-semibold hover:bg-gray-100 transition">
              Change Password
            </button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
























// import React from "react";
// import { useSelector } from "react-redux";

// export default function Profile() {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8f6f2]">
//         <p className="text-gray-500 text-lg animate-pulse">
//           Loading Profile...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f8f6f2]">

//       {/* HERO SECTION */}
//       <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80"
//           alt="Luxury Hotel"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40"></div>

//         <div className="absolute bottom-8 left-8 text-white">
//           <h1 className="text-3xl md:text-4xl font-light tracking-wide">
//             Welcome Back,
//           </h1>
//           <p className="text-xl md:text-2xl font-semibold mt-2">
//             {user.firstname} {user.lastname}
//           </p>
//         </div>
//       </div>

//       {/* PROFILE CONTENT */}
//       <div className="max-w-6xl mx-auto px-6 md:px-10 -mt-16 pb-16">

//         <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">

//           <div className="grid md:grid-cols-3 gap-12">

//             {/* LEFT SIDE */}
//             <div className="flex flex-col items-center text-center">

//               <img
//                 src={user.image}
//                 alt="Profile"
//                 className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
//               />

//               <h2 className="text-lg font-semibold mt-6 text-gray-800">
//                 {user.accountType}
//               </h2>

//               <p className="text-gray-400 mt-2">
//                 Member since 2026
//               </p>

//               <button className="mt-6 px-6 py-2 border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition duration-300">
//                 Edit Profile
//               </button>

//             </div>

//             {/* RIGHT SIDE */}
//             <div className="md:col-span-2 space-y-12">

//               {/* PERSONAL INFO */}
//               <div>
//                 <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-8">
//                   Personal Information
//                 </h3>

//                 <div className="grid sm:grid-cols-2 gap-6">

//                   <div className="group bg-[#faf9f7] p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-transparent hover:border-gray-200">
//                     <p className="text-xs uppercase tracking-wider text-gray-400">
//                       First Name
//                     </p>
//                     <p className="text-lg font-semibold text-gray-900 mt-3">
//                       {user.firstname}
//                     </p>
//                   </div>

//                   <div className="group bg-[#faf9f7] p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-transparent hover:border-gray-200">
//                     <p className="text-xs uppercase tracking-wider text-gray-400">
//                       Last Name
//                     </p>
//                     <p className="text-lg font-semibold text-gray-900 mt-3">
//                       {user.lastname}
//                     </p>
//                   </div>

//                   <div className="group bg-[#faf9f7] p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-transparent hover:border-gray-200">
//                     <p className="text-xs uppercase tracking-wider text-gray-400">
//                       Email Address
//                     </p>
//                     <p className="text-lg font-semibold text-gray-900 mt-3 break-words">
//                       {user.email}
//                     </p>
//                   </div>

//                   <div className="group bg-[#faf9f7] p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-transparent hover:border-gray-200">
//                     <p className="text-xs uppercase tracking-wider text-gray-400">
//                       Phone Number
//                     </p>
//                     <p className="text-lg font-semibold text-gray-900 mt-3">
//                       {user.phone}
//                     </p>
//                   </div>

//                 </div>
//               </div>

//               {/* SECURITY */}
//               <div>
//                 <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-6">
//                   Security
//                 </h3>

//                 <button className="px-8 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-300">
//                   Change Password
//                 </button>
//               </div>

//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
