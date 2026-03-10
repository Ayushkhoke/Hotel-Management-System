// import React from "react";
// import {Link} from 'react-router-dom'
// import { useSelector } from "react-redux";
// export default function Profile() {
//     const{user }=useSelector((state)=>state.auth);
//     if (!user) {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-gray-600 text-lg">Loading profile...</p>
//     </div>
//   );
// }
//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10 w-[85%]">
      
//       {/* Profile Card */}
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-amber-600 to-yellow-500 h-40 relative">
//           <div className="absolute -bottom-12 left-8">
//          <img
//   src={user?.image}
//   alt="Profile"
//   className="w-24 h-24 rounded-full object-cover border-4 border-white"
// />

//           </div>
//         </div>

//         {/* Content */}
//         <div className="pt-16 px-8 pb-8">
//           <h1 className="text-2xl font-bold text-gray-800">
//             {user?.firstname}
//           </h1>
//           <h1 className="text-2xl font-bold text-gray-800">
//             {user?.lastname}
//           </h1>
         

//           {/* Info Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            
//             <div>
//               <p className="text-sm text-gray-500">Email</p>
//               <p className="font-medium text-gray-800">
//                 {user.email}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Phone</p>
//               <p className="font-medium text-gray-800">
//                 {user.phone}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Role</p>
//               <p className="font-medium text-gray-800">
//                 {user.accountType}
//               </p>
//             </div>

            
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-10">
//             <button className="px-6 py-3 rounded-lg bg-amber-600 text-white 
//                                font-semibold hover:bg-amber-700 transition">
//               Edit Profile
//             </button>

//            <Link to="/change-password">
//             <button className="px-6 py-3 rounded-lg border border-gray-300 
//                                text-gray-700 font-semibold hover:bg-gray-100 transition">
//               Change Password
//             </button>
//            </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { 
  Hotel, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  TrendingUp,
  User,
  Mail,
  Phone,
  Shield,
  Edit,
  Lock,
  Sparkles,
  X,
  Save
} from "lucide-react";
import AIChat from "../../pages/AiComponent.jsx";
import { getMyOrders } from "../../services/orderApi";
import { getMyBookings } from "../../services/roombookingApi";
import { getMyTableBookings } from "../../services/tablebookingApi";
import { updateProfile } from "../../services/authApi";
import Upload from "./Upload";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);
  const { booking } = useSelector((state) => state.booking);
  const { tablebookings } = useSelector((state) => state.table);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    image: null,
  });
  const [uploadKey, setUploadKey] = useState(0);

  // Fetch dashboard data
  useEffect(() => {
    if (token) {
      dispatch(getMyOrders(token));
      dispatch(getMyBookings(token));
      dispatch(getMyTableBookings(token));
    }
  }, [token, dispatch]);

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phone: user.phone || "",
        image: null,
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Reset form data to original user data
    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      phone: user.phone || "",
      image: null,
    });
    setUploadKey(prev => prev + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("phone", formData.phone);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const result = await dispatch(updateProfile(data, token));
    
    if (result) {
      setIsEditMode(false);
      setUploadKey(prev => prev + 1);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalBookings = (booking?.length || 0) + (tablebookings?.length || 0);
  const totalRevenue = [
    ...(booking || []).map(b => b.totalPrice || 0),
    ...(order || []).map(o => o.totalAmount || 0)
  ].reduce((sum, val) => sum + val, 0);
  
  const activeBookings = booking?.filter(b => b.paymentStatus === "paid")?.length || 0;
  const todayOrders = order?.length || 0;

  // Profile image with fallback to generated avatar
  const profileImage = user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(user?.firstname || 'User')}`;

  // Debug: Log user data to console
  useEffect(() => {
    if (user) {
      console.log('User data:', user);
      console.log('User image URL:', user.image);
    }
  }, [user]);

  const stats = [
    {
      id: 1,
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      id: 3,
      title: "Active Stays",
      value: activeBookings,
      icon: Hotel,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      id: 4,
      title: "Orders Today",
      value: todayOrders,
      icon: ShoppingBag,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50 px-3 sm:px-4 py-5 sm:py-6 md:py-10 text-black">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto mb-6 md:mb-8"
      >
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <Sparkles className="text-amber-500 shrink-0 mt-1 sm:mt-0" size={24} />
          <h1 className="text-2xl sm:text-3xl md:text-5xl leading-tight font-bold text-black break-words">
            Welcome Back, {user?.firstname}!
          </h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
          Here's your luxury hotel management dashboard overview
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="w-full max-w-7xl mx-auto mb-6 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-4 sm:p-6">
                  <div className={`inline-flex p-2.5 sm:p-3 rounded-xl ${stat.bgColor} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={stat.iconColor} size={24} />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{stat.title}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-2 text-emerald-600 text-sm">
                    <TrendingUp size={16} />
                    <span className="font-semibold">Live</span>
                  </div>
                </div>
                <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Profile Card - Premium Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-7xl mx-auto mb-6 md:mb-8"
      >
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

          {/* Gradient Header with Pattern */}
          <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 h-32 sm:h-40 md:h-48 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
            </div>
            
            {/* Profile Image with Glow Effect */}
            <div className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 left-1/2 md:left-12 transform -translate-x-1/2 md:translate-x-0">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img
                  src={profileImage}
                  alt={`${user?.firstname} ${user?.lastname}`}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(user?.firstname || 'User')}`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-14 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-12 pb-6 sm:pb-8">

            {/* Name and Role Badge */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-words">
                  {user?.firstname} {user?.lastname}
                </h2>
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-semibold shadow-md">
                  <Shield size={16} />
                  <span>{user.accountType}</span>
                </div>
              </div>
            </div>

            {/* Info Grid or Edit Form */}
            {!isEditMode ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
                  <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Email Address</p>
                      <p className="font-semibold text-gray-800 break-all">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Phone className="text-emerald-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Phone Number</p>
                      <p className="font-semibold text-gray-800">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <User className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Member Since</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={handleEditClick}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Edit size={18} />
                    <span>Edit Profile</span>
                  </button>

                  <Link to="/change-password" className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700 transition-all duration-300">
                      <Lock size={18} />
                      <span>Change Password</span>
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              /* Edit Form */
              <form onSubmit={handleSubmit} className="space-y-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profile Image
                  </label>
                  
                  {/* Show current profile image */}
                  {user?.image && !formData.image && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-2">Current Image:</p>
                      <img 
                        src={profileImage}
                        alt="Current profile" 
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(user?.firstname || 'User')}`;
                        }}
                      />
                    </div>
                  )}
                  
                  <Upload
                    key={uploadKey}
                    label=""
                    onChange={(file) => setFormData(prev => ({ ...prev, image: file }))}
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload a new image to replace the current one</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Mail className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email (cannot be changed)</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </motion.div>

      {/* AI Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-7xl mx-auto overflow-x-hidden"
      >
        <AIChat />
      </motion.div>
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
