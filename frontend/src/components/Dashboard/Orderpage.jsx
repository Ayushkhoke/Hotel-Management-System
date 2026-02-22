// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyOrders } from "../../services/orderApi";
// import { buyOrder } from "../../services/customerPayment";

// export default function OrdersPage() {

//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { order } = useSelector((state) => state.order);

//   useEffect(() => {
//     if (token) {
//       dispatch(getMyOrders(token));
//     }
//   }, [token, dispatch]);

//   async function handlePayment(singleOrder) {
//     await buyOrder(token, user, singleOrder, dispatch);

//     // After payment success, refresh orders
//     dispatch(getMyOrders(token));
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//       {order?.length === 0 && (
//         <p>No orders found.</p>
//       )}

//       {order?.map((item) => (
//         <div
//           key={item._id}
//           className="bg-white text-black shadow-md p-4 rounded mb-4"
//         >
//           <p><strong>Total:</strong> ₹{item.totalAmount}</p>
//           <p><strong>Payment:</strong> {item.paymentStatus}</p>
//           <p><strong>Status:</strong> {item.orderStatus}</p>

//           {item.paymentStatus === "pending" && (
//             <button
//               onClick={() => handlePayment(item)}
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Pay Now
//             </button>
//           )}

//           {item.paymentStatus === "paid" && (
//             <span className="mt-2 inline-block text-green-600 font-semibold">
//               Payment Completed
//             </span>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyOrders } from "../../services/orderApi";
// import { buyOrder  } from "../../services/customerPayment";

// export default function OrdersPage() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
// const { order } = useSelector((state) => state.order);


//   useEffect(() => {
//     if (token) {
//       dispatch(getMyOrders(token));
//     }
//   }, [token, dispatch]);

//   async function handlePayment(singleOrder) {
//     await buyOrder (token, user, singleOrder, dispatch);
//     dispatch(getMyOrders(token));
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      
//       {/* Header */}
//       <div className="max-w-5xl mx-auto mb-10">
//         <h2 className="text-4xl font-extrabold text-gray-800">
//           🍽️ My Orders
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Track your orders and complete payments easily.
//         </p>
//       </div>

//       {/* Orders Container */}
//       <div className="max-w-5xl mx-auto grid gap-6">

//         {order?.length === 0 && (
//           <div className="bg-white shadow-lg rounded-xl p-8 text-center">
//             <p className="text-gray-600 text-lg">
//               No orders found 😔
//             </p>
//           </div>
//         )}

//         {order?.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
//           >
//             {/* Order Info */}
//             <div className="space-y-2">
//               <p className="text-lg font-semibold text-gray-800">
//                 Order ID:{" "}
//                 <span className="text-sm text-gray-500">
//                   {item._id.slice(-6)}
//                 </span>
//               </p>

//               <p className="text-gray-700">
//                 <span className="font-medium">Total:</span>{" "}
//                 <span className="text-orange-600 font-bold text-xl">
//                   ₹{item.totalAmount}
//                 </span>
//               </p>

//               <div className="flex gap-3 mt-2">
//                 {/* Payment Badge */}
//                 <span
//                   className={`px-3 py-1 text-sm rounded-full font-medium ${
//                     item.paymentStatus === "paid"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {item.paymentStatus === "paid"
//                     ? "Payment Completed"
//                     : "Payment Pending"}
//                 </span>

//                 {/* Order Status Badge */}
//                 <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
//                   {item.orderStatus}
//                 </span>
//               </div>
//             </div>

//             {/* Payment Button */}
//             {item.paymentStatus === "pending" && (
//               <button
//                 onClick={() => handlePayment(item)}
//                 className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 💳 Pay Now
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyOrders } from "../../services/orderApi";
// import { buyOrder } from "../../services/customerPayment";

// export default function OrdersPage() {
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const { order } = useSelector((state) => state.order);

//   const [loading, setLoading] = useState(true);

//   // 🔥 Fetch Orders
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

//   // 🔥 Handle Payment
//   async function handlePayment(singleOrder) {
//     try {
//       await buyOrder(token, user, singleOrder, dispatch);
//       await dispatch(getMyOrders(token)); // refresh orders
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      
//       {/* Header */}
//       <div className="max-w-5xl mx-auto mb-10">
//         <h2 className="text-4xl font-extrabold text-gray-800">
//           🍽️ My Orders
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Track your orders and complete payments easily.
//         </p>
//       </div>

//       {/* Orders Container */}
//       <div className="max-w-5xl mx-auto grid gap-6">

//         {/* 🔥 Loading */}
//         {loading && (
//           <div className="text-center text-gray-600 text-lg">
//             Loading orders...
//           </div>
//         )}

//         {/* 🔥 No Orders */}
//         {!loading && Array.isArray(order) && order.length === 0 && (
//           <div className="bg-white shadow-lg rounded-xl p-8 text-center">
//             <p className="text-gray-600 text-lg">
//               No orders found 😔
//             </p>
//           </div>
//         )}

//         {/* 🔥 Orders List */}
//         {!loading &&
//           Array.isArray(order) &&
//           order.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
//             >
//               {/* Order Info */}
//               <div className="space-y-2">
//                 <p className="text-lg font-semibold text-gray-800">
//                   Order ID:{" "}
//                   <span className="text-sm text-gray-500">
//                     {item._id.slice(-6)}
//                   </span>
//                 </p>

//                 <p className="text-gray-700">
//                   <span className="font-medium">Total:</span>{" "}
//                   <span className="text-orange-600 font-bold text-xl">
//                     ₹{item.totalAmount}
//                   </span>
//                 </p>

//                 <div className="flex gap-3 mt-2">
//                   {/* Payment Badge */}
//                   <span
//                     className={`px-3 py-1 text-sm rounded-full font-medium ${
//                       item.paymentStatus === "paid"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {item.paymentStatus === "paid"
//                       ? "Payment Completed"
//                       : "Payment Pending"}
//                   </span>

//                   {/* Order Status Badge */}
//                   <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
//                     {item.orderStatus}
//                   </span>
//                 </div>
//               </div>

//               {/* Payment Button */}
//               {item.paymentStatus === "pending" && (
//                 <button
//                   onClick={() => handlePayment(item)}
//                   className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
//                 >
//                   💳 Pay Now
//                 </button>
//               )}
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../services/orderApi";
import { buyOrder } from "../../services/customerPayment";

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
    <div
      className="min-h-screen bg-cover bg-fixed bg-center text-white px-6 sm:px-12 py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-yellow-400 tracking-wider">
          Your Luxury Orders
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          Manage your dining experience with elegance
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">

        {/* LOADING */}
        {loading && (
          <div className="text-center text-lg text-gray-300 animate-pulse">
            Preparing your order history...
          </div>
        )}

        {/* NO ORDERS */}
        {!loading && Array.isArray(order) && order.length === 0 && (
          <div className="text-center bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20">
            <h2 className="text-2xl text-yellow-400 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-300">
              Indulge in our premium menu and place your first order.
            </p>
          </div>
        )}

        {/* ORDER TIMELINE STYLE */}
        {!loading &&
          Array.isArray(order) &&
          order.map((item, index) => (
            <div
              key={item._id}
              className="relative group"
            >
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-yellow-500/30 hidden md:block"></div>

              <div className="md:ml-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-yellow-500/40 transition duration-500">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                  {/* ORDER INFO */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-yellow-400">
                      Order #{item._id.slice(-6)}
                    </h3>

                    <p className="text-gray-300 text-lg">
                      Total Amount:
                      <span className="text-green-400 font-bold ml-2 text-xl">
                        ₹{item.totalAmount}
                      </span>
                    </p>

                    <div className="flex gap-4 flex-wrap">

                      {/* PAYMENT STATUS */}
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                          item.paymentStatus === "paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {item.paymentStatus === "paid"
                          ? "Payment Successful"
                          : "Awaiting Payment"}
                      </span>

                      {/* ORDER STATUS */}
                      <span className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-500/20 text-blue-400">
                        {item.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* ACTION SECTION */}
                  {item.paymentStatus === "pending" && (
                    <button
                      onClick={() => handlePayment(item)}
                      className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl font-semibold hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/50 transition duration-300"
                    >
                      Complete Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
