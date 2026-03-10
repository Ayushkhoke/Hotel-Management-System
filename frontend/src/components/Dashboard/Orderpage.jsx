// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyOrders } from "../../services/orderApi";
// import { buyOrder } from "../../services/customerPayment";
// import { motion } from "framer-motion";
// import { 
//   ShoppingBag, 
//   CreditCard, 
//   CheckCircle, 
//   Clock, 
//   DollarSign,
//   Package,
//   Receipt,
//   Star,
//   UtensilsCrossed,
//   Sparkles
// } from "lucide-react";

// export default function OrdersPage() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { order } = useSelector((state) => state.order);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchOrders() {
//       if (token) {
//         setLoading(true);
//         await dispatch(getMyOrders(token));
//         setLoading(false);
//       }
//     }
//     fetchOrders();
//   }, [token, dispatch]);

//   async function handlePayment(singleOrder) {
//     try {
//       await buyOrder(token, user, singleOrder, dispatch);
//       await dispatch(getMyOrders(token));
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* Hero Section with Background Image */}
//       <div className="relative h-[300px] md:h-[350px] mb-8 overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop)',
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
//         </div>
        
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <UtensilsCrossed className="text-amber-400" size={40} />
//             <div className="h-12 w-1 bg-amber-400"></div>
//             <div>
//               <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
//                 My Orders
//               </h1>
//               <p className="text-gray-200 text-lg md:text-xl">
//                 {loading ? "Loading..." : `${order?.length || 0} ${order?.length === 1 ? 'Order' : 'Orders'} in Progress`}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12">

//         {/* Loading State */}
//         {loading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-16"
//           >
//             <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mb-4"></div>
//             <p className="text-gray-600 text-xl">Loading your orders...</p>
//           </motion.div>
//         )}

//         {/* Empty State */}
//         {!loading && (!order || order.length === 0) && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16 text-center">
//               <div className="text-7xl mb-4">🍽️</div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                 No Orders Found
//               </h3>
//               <p className="text-gray-600 mb-8 text-lg">
//                 You haven't placed any orders yet. Browse our menu to discover delicious dishes.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => window.location.href = '/dashboard/menu'}
//                 className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all"
//               >
//                 <UtensilsCrossed size={20} />
//                 View Menu
//               </motion.button>
//             </div>
//           </motion.div>
//         )}

//         {/* Orders List - Airbnb/Booking.com Style */}
//         {!loading && Array.isArray(order) && order.map((item, index) => (
//           <motion.div
//             key={item._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             whileHover={{ y: -6, transition: { duration: 0.3 } }}
//             className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
//           >
//             <div className="flex flex-col md:flex-row md:h-[500px]">
              
//               {/* LEFT SIDE - Large Food Image */}
//               <div className="relative md:w-1/2 h-[350px] md:h-full overflow-hidden bg-gray-100">
//                 <motion.img
//                   whileHover={{ scale: 1.08 }}
//                   transition={{ duration: 0.7 }}
//                   src={
//                     item.items?.[0]?.menuItem?.image ||
//                     'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'
//                   }
//                   alt={item.items?.[0]?.menuItem?.name || 'Food Item'}
//                   className="absolute w-full h-full object-cover object-center scale-100"
//                 />
                
//                 {/* Overlay Label */}
//                 <div className="absolute top-4 left-4">
//                   <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2">
//                     <Sparkles className="text-amber-500 fill-amber-500" size={16} />
//                     <span className="text-sm font-bold text-gray-800">
//                       {item.items?.length > 1 ? `${item.items.length} Items` : item.items?.[0]?.menuItem?.name || "Chef's Special"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Status Badge */}
//                 <div className="absolute top-4 right-4">
//                   {item.paymentStatus === "paid" ? (
//                     <div className="px-4 py-2 bg-emerald-500/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2">
//                       <CheckCircle className="text-white" size={16} />
//                       <span className="text-sm font-bold text-white">Paid</span>
//                     </div>
//                   ) : (
//                     <motion.div
//                       animate={{ scale: [1, 1.05, 1] }}
//                       transition={{ repeat: Infinity, duration: 2 }}
//                       className="px-4 py-2 bg-amber-500/95 backdrop-blur-sm rounded-full shadow-lg flex items-center gap-2"
//                     >
//                       <Clock className="text-white" size={16} />
//                       <span className="text-sm font-bold text-white">Pending</span>
//                     </motion.div>
//                   )}
//                 </div>

//                 {/* Rating Overlay */}
//                 <div className="absolute bottom-4 left-4 right-4">
//                   <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-xl flex items-center gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star key={star} className="text-amber-400 fill-amber-400" size={14} />
//                     ))}
//                     <span className="text-white text-sm font-bold ml-2">5.0</span>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT SIDE - Order Details */}
//               <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                
//                 {/* Top Section */}
//                 <div>
//                   {/* Order Title & ID */}
//                   <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                       <h2 className="text-3xl font-bold text-gray-900">
//                         {item.items?.length === 1 
//                           ? item.items[0]?.menuItem?.name || 'Order'
//                           : `${item.items?.length || 0}-Item Order`
//                         }
//                       </h2>
//                     </div>
//                     <div className="flex items-center gap-3 text-gray-500 text-sm">
//                       <Receipt size={16} />
//                       <span className="font-mono font-semibold">
//                         #{item._id.slice(-8).toUpperCase()}
//                       </span>
//                     </div>
//                     {/* Show item list if multiple items */}
//                     {item.items?.length > 1 && (
//                       <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
//                         <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Order Items</p>
//                         <div className="space-y-1">
//                           {item.items.map((orderItem, idx) => (
//                             <div key={idx} className="flex items-center justify-between text-sm">
//                               <div className="flex items-center gap-2">
//                                 <span className="text-amber-600">•</span>
//                                 <span className="text-gray-700 font-medium">{orderItem.menuItem?.name}</span>
//                               </div>
//                               <span className="text-gray-500">×{orderItem.quantity}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Order Status */}
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {/* Payment Status */}
//                     <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-bold ${
//                       item.paymentStatus === "paid" 
//                         ? "bg-emerald-50 text-emerald-700 border-emerald-300" 
//                         : "bg-amber-50 text-amber-700 border-amber-300"
//                     }`}>
//                       {item.paymentStatus === "paid" ? (
//                         <>
//                           <CheckCircle size={18} />
//                           <span>Paid</span>
//                         </>
//                       ) : (
//                         <>
//                           <Clock size={18} />
//                           <span>Payment Pending</span>
//                         </>
//                       )}
//                     </div>

//                     {/* Order Status */}
//                     <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-bold capitalize ${
//                       item.orderStatus === "delivered" 
//                         ? "bg-blue-50 text-blue-700 border-blue-300" 
//                         : item.orderStatus === "preparing"
//                         ? "bg-purple-50 text-purple-700 border-purple-300"
//                         : "bg-gray-50 text-gray-700 border-gray-300"
//                     }`}>
//                       <Package size={18} />
//                       <span>{item.orderStatus || "Processing"}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bottom Section - Price & Actions */}
//                 <div>
//                   {/* Premium Price Display */}
//                   <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
//                     <div className="flex items-baseline justify-between">
//                       <div>
//                         <p className="text-sm text-gray-600 mb-1">Total Amount</p>
//                         <div className="flex items-baseline gap-2">
//                           <span className="text-4xl font-bold text-amber-600">
//                             ${item.totalAmount?.toLocaleString()}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">Including taxes & fees</p>
//                       </div>
//                       <DollarSign className="text-amber-500" size={32} />
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   {item.paymentStatus === "pending" && (
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => handlePayment(item)}
//                       className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:from-amber-600 hover:to-orange-700 transition-all"
//                     >
//                       <CreditCard size={20} />
//                       <span>Pay Now</span>
//                     </motion.button>
//                   )}

//                   {item.paymentStatus === "paid" && (
//                     <div className="flex items-center justify-center gap-2 py-4 px-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
//                       <CheckCircle className="text-emerald-600" size={20} />
//                       <span className="text-emerald-700 font-bold text-lg">Payment Completed</span>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>
//           </motion.div>
//         ))}

//       </div>

//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../services/orderApi";
import { buyOrder } from "../../services/customerPayment";
import { motion } from "framer-motion";

import {
  CreditCard,
  CheckCircle,
  Clock,
  DollarSign,
  Receipt,
  Star,
  UtensilsCrossed,
  Sparkles
} from "lucide-react";

export default function OrdersPage() {

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (token) {
        setLoading(true);
        await dispatch(getMyOrders(token));
        setLoading(false);
      }
    }
    fetchOrders();
  }, [token, dispatch]);

  async function handlePayment(singleOrder) {
    try {
      await buyOrder(token, user, singleOrder, dispatch);
      await dispatch(getMyOrders(token));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="relative h-[300px] overflow-hidden mb-10">

        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          className="absolute inset-0 w-full h-full object-cover"
          alt="restaurant"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative h-full flex items-center max-w-6xl mx-auto px-6">

          <div className="flex items-center gap-4 text-white">

            <UtensilsCrossed size={40} className="text-amber-400"/>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                My Orders
              </h1>

              <p className="text-gray-200 mt-1">
                {loading ? "Loading..." : `${order?.length || 0} Orders`}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 space-y-8 pb-12">

        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin h-14 w-14 border-b-4 border-amber-500 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading your orders...</p>
          </div>
        )}

        {!loading && Array.isArray(order) && order.map((item, index) => (

          <motion.div
            key={item._id}
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.4, delay:index * 0.1 }}
            whileHover={{ y:-5 }}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden"
          >

            <div className="flex flex-col md:flex-row md:h-[420px]">

              {/* IMAGE SECTION */}
              <div className="relative w-full md:w-[55%] h-[260px] md:h-full overflow-hidden">

                <motion.img
                  whileHover={{ scale:1.05 }}
                  transition={{ duration:0.6 }}
                  src={
                    item.items?.[0]?.menuItem?.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                  }
                  alt="food"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* LABEL */}
                <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-full shadow flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500"/>
                  <span className="text-sm font-semibold">
                    {item.items?.length > 1
                      ? `${item.items.length} Items`
                      : item.items?.[0]?.menuItem?.name || "Chef Special"}
                  </span>
                </div>

                {/* PAYMENT STATUS */}
                <div className="absolute top-4 right-4">

                  {item.paymentStatus === "paid" ? (

                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow">
                      <CheckCircle size={16}/>
                      Paid
                    </div>

                  ) : (

                    <div className="bg-amber-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow">
                      <Clock size={16}/>
                      Pending
                    </div>

                  )}

                </div>

                {/* RATING */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-4 py-2 rounded-xl flex items-center gap-1">

                  {[1,2,3,4,5].map((s)=>(
                    <Star key={s} size={14} className="text-amber-400 fill-amber-400"/>
                  ))}

                  <span className="text-white ml-2 text-sm">5.0</span>

                </div>

              </div>

              {/* DETAILS */}
              <div className="md:w-[45%] p-8 flex flex-col justify-between">

                <div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {item.items?.length === 1
                      ? item.items[0]?.menuItem?.name
                      : `${item.items?.length} Item Order`}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Receipt size={16}/>
                    <span className="font-mono">
                      #{item._id.slice(-8).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex gap-3 mb-6">

                    <div className={`px-4 py-2 rounded-xl border font-semibold ${
                      item.paymentStatus === "paid"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-amber-50 border-amber-300 text-amber-700"
                    }`}>
                      {item.paymentStatus}
                    </div>

                    <div className="px-4 py-2 rounded-xl border bg-gray-50 text-gray-700 capitalize">
                      {item.orderStatus || "processing"}
                    </div>

                  </div>

                </div>

                {/* PRICE */}
                <div>

                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border rounded-2xl mb-6">

                    <p className="text-gray-600 text-sm">
                      Total Amount
                    </p>

                    <div className="flex items-center justify-between">

                      <span className="text-4xl font-bold text-green-600">
                        ${item.totalAmount?.toLocaleString()}
                      </span>

                      <DollarSign className="text-green-500" size={30}/>

                    </div>

                  </div>

                  {item.paymentStatus === "pending" ? (

                    <button
                      onClick={()=>handlePayment(item)}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow hover:shadow-xl hover:shadow-green-500/50 transition-all"
                    >
                      <CreditCard size={20}/>
                      Pay Now
                    </button>

                  ) : item.paymentStatus === "paid" ? (

                    <div className="flex items-center justify-center gap-2 py-4 border-2 border-emerald-200 bg-emerald-50 rounded-2xl text-emerald-700 font-bold">

                      <CheckCircle size={20}/>
                      Payment Completed

                    </div>

                  ) : (

                    <div className="flex items-center justify-center gap-2 py-4 border-2 border-red-200 bg-red-50 rounded-2xl text-red-700 font-bold">

                      <Clock size={20}/>
                      Payment Failed - Try Again

                    </div>

                  )}

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}
