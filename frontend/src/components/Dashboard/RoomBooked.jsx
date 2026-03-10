// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyBookings, deleteBooking } from "../../services/roombookingApi";
// import { buyPayment } from "../../services/paymentapi/RoompaymentApi";

// export default function RoomBooked() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { booking } = useSelector((state) => state.booking);

//   // 🔥 Fetch bookings on load
//   useEffect(() => {
//     if (token) {
//       dispatch(getMyBookings(token));
//     }
//   }, [token, dispatch]);

//   // 💳 Handle Payment
//   async function handlePayment(singleBooking) {
//     await buyPayment(token, user, singleBooking, dispatch);
//   }

//   // ❌ Handle Cancel
//   async function handleCancel(id) {
//     await deleteBooking(id, token);
//     dispatch(getMyBookings(token));
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 sm:px-8 py-10">
      
//       {/* Heading */}
//       <div className="max-w-6xl mx-auto mb-10">
//         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
//           🏨 My Room Bookings
//         </h2>
//         <p className="text-gray-500 mt-2 text-sm sm:text-base">
//           Manage your reservations and payments easily
//         </p>
//       </div>

//       {/* No Bookings */}
//       {booking?.length === 0 && (
//         <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
//           <p className="text-gray-600 text-lg">No bookings found 😔</p>
//         </div>
//       )}

//       {/* Booking Cards */}
//       <div className="max-w-6xl mx-auto grid gap-6">
//         {booking?.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-100"
//           >
//             {/* Left Section - Booking Details */}
//             <div className="flex-1 space-y-2">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Room #{item.room?.roomNumber}
//               </h3>

//               <div className="text-gray-600 text-sm sm:text-base space-y-1">
//                 <p>
//                   <span className="font-medium">Check In:</span>{" "}
//                   {new Date(item.checkIn).toLocaleDateString()}
//                 </p>

//                 <p>
//                   <span className="font-medium">Check Out:</span>{" "}
//                   {new Date(item.checkOut).toLocaleDateString()}
//                 </p>
//               </div>

//               <p className="text-2xl font-bold text-green-600 mt-2">
//                 ${item.totalPrice}
//               </p>

//               {/* Payment Status Badge */}
//               <span
//                 className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
//                   item.paymentStatus === "paid"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {item.paymentStatus === "paid" ? "Paid ✅" : "Pending ⏳"}
//               </span>
//             </div>

//             {/* Right Section - Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              
//               {/* 💳 Pay Now Button */}
//               {item.paymentStatus === "pending" && (
//                 <button
//                   onClick={() => handlePayment(item)}
//                   className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg font-medium shadow-sm w-full sm:w-auto"
//                 >
//                   💳 Pay Now
//                 </button>
//               )}

//               {/* ❌ Cancel Button */}
//               {item.status !== "cancelled" && (
//                 <button
//                   onClick={() => handleCancel(item._id)}
//                   className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-2 rounded-lg font-medium shadow-sm w-full sm:w-auto"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookings, deleteBooking } from "../../services/roombookingApi";
import { buyPayment } from "../../services/paymentapi/RoompaymentApi";
import { motion } from "framer-motion";
import { 
  Hotel, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  CheckCircle,
  Clock,
  X,
  Users,
  MapPin,
  Star
} from "lucide-react";

export default function RoomBooked() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { booking } = useSelector((state) => state.booking);

  useEffect(() => {
    if (token) {
      dispatch(getMyBookings(token));
    }
  }, [token, dispatch]);

  async function handlePayment(singleBooking) {
    await buyPayment(token, user, singleBooking, dispatch);
  }

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    await deleteBooking(id, token);
    dispatch(getMyBookings(token));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section with Background Image */}
      <div className="relative h-55 sm:h-65 md:h-87.5 mb-6 sm:mb-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&auto=format&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Hotel className="text-amber-400" size={28} />
            <div className="h-8 sm:h-12 w-1 bg-amber-400"></div>
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-1 sm:mb-2">
                My Reservations
              </h1>
              <p className="text-gray-200 text-sm sm:text-lg md:text-xl">
                {booking?.length || 0} active bookings
                <span className="hidden sm:inline"> • Manage your luxury stays</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Empty State */}
      {!booking || booking?.length === 0 ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16 text-center">
              <div className="text-7xl mb-4">🏨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Reservations Yet
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Discover our luxury rooms and start your journey
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/dashboard/room'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <Hotel size={20} />
                Browse Luxury Rooms
              </motion.button>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Booking Cards - Airbnb/Booking.com Style */
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
          {booking?.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                
                {/* LEFT SIDE - Large Image */}
                <div className="relative md:w-2/5 h-45 sm:h-60 md:h-auto overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    src={
                      item.room?.image || 
                      item.room?.images?.[0] || 
                      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop'
                    }
                    alt={`Room ${item.room?.roomNumber}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay Label */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2">
                      <Star className="text-amber-500 fill-amber-500" size={14} />
                      <span className="text-xs sm:text-sm font-bold text-gray-800">
                        {item.room?.type || 'Deluxe'}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    {item.paymentStatus === "paid" ? (
                      <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-500/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2">
                        <CheckCircle className="text-white" size={14} />
                        <span className="text-xs sm:text-sm font-bold text-white">Confirmed</span>
                      </div>
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2"
                      >
                        <Clock className="text-white" size={14} />
                        <span className="text-xs sm:text-sm font-bold text-white">Pending</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE - Details */}
                <div className="md:w-3/5 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                  
                  {/* Top Section */}
                  <div>
                    {/* Room Title */}
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm mb-2">
                        <MapPin size={14} />
                        <span>Luxury Hotel<span className="hidden sm:inline"> • Premium Floor</span></span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 leading-tight">
                        Room #{item.room?.roomNumber || 'N/A'}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 leading-snug">
                        King size bed • City view
                        <span className="hidden sm:inline"> • Free WiFi</span>
                      </p>
                    </div>

                    {/* Check-In / Check-Out */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200">
                        <Calendar className="text-blue-600" size={18} />
                        <div>
                          <p className="text-[10px] sm:text-xs text-blue-700 font-bold uppercase mb-1">Check-In</p>
                          <p className="text-xs sm:text-sm font-bold text-gray-900">
                            {new Date(item.checkIn).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200">
                        <Calendar className="text-purple-600" size={18} />
                        <div>
                          <p className="text-[10px] sm:text-xs text-purple-700 font-bold uppercase mb-1">Check-Out</p>
                          <p className="text-xs sm:text-sm font-bold text-gray-900">
                            {new Date(item.checkOut).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Price & Actions */}
                  <div>
                    {/* Premium Price Display */}
                    <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Price</p>
                          <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                            <span className="text-2xl sm:text-4xl font-bold text-emerald-600 leading-none">
                              ${item.totalPrice?.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm sm:text-lg">
                              / {Math.ceil((new Date(item.checkOut) - new Date(item.checkIn)) / (1000 * 60 * 60 * 24))} nights
                            </span>
                          </div>
                        </div>
                        <DollarSign className="hidden sm:block text-emerald-500" size={32} />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {item.paymentStatus === "pending" && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePayment(item)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-linear-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:from-amber-600 hover:to-orange-700 transition-all text-sm sm:text-base"
                        >
                          <CreditCard size={18} />
                          <span className="sm:hidden">Pay Now</span>
                          <span className="hidden sm:inline">Complete Payment</span>
                        </motion.button>
                      )}

                      {item.status !== "cancelled" && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCancel(item._id)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all text-sm sm:text-base"
                        >
                          <X size={18} />
                          <span>Cancel</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}