// import React, { useState,useEffect } from "react";
// import { useSelector } from "react-redux";
// import { placeOrder,getMyOrders } from "../../services/orderApi";
// import { toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";

// export default function OrderContainer() {
//   const { menuItem } = useSelector((state) => state.menu);
//   const { token } = useSelector((state) => state.auth);
// const dispatch=useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);

//   if (!menuItem) {
//     return <h2>No menu item selected</h2>;
//   }

//    function handleOrder() {

    

//       const orderData = {
//         items: [
//           {
//             menuItem: menuItem._id,
//             quantity: Number(quantity),
//           },
//         ],
//       };

//       dispatch(placeOrder(orderData, token));

   
//   }
// useEffect(() => {
//   if (token) {
//     dispatch(getMyOrders(token));
//   }
// }, [token, dispatch]);

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
//       <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">

//         <img
//           src={menuItem.image}
//           alt={menuItem.name}
//           className="w-full h-48 object-cover rounded-lg"
//         />

//         <h2 className="text-2xl font-bold mt-4">{menuItem.name}</h2>
//         <p className="text-gray-600 mt-2">{menuItem.description}</p>

//         <p className="text-xl font-semibold mt-3 text-green-600">
//           ₹{menuItem.price}
//         </p>

//         <div className="mt-4">
//           <label className="block text-sm font-medium mb-1">
//             Quantity
//           </label>
//           <input
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2"
//           />
//         </div>

//         <p className="mt-3 font-semibold">
//           Total: ₹{menuItem.price * quantity}
//         </p>

//         <button
//           onClick={handleOrder}
//           disabled={loading}
//           className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//         >
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>

//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { placeOrder } from "../../services/orderApi";
// import { capturePayment, verifyPayment } from "../../services/customerPayment";
// import { toast } from "react-hot-toast";

// export default function OrderContainer() {
//   const { menuItem } = useSelector((state) => state.menu);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);

//   if (!menuItem) {
//     return <h2>No menu item selected</h2>;
//   }

//   async function handleOrder() {
//     try {
//       setLoading(true);

//       // 1️⃣ CREATE ORDER
//       const orderData = {
//         items: [
//           {
//             menuItem: menuItem._id,
//             quantity: Number(quantity),
//           },
//         ],
//       };

//       const createdOrder = await dispatch(placeOrder(orderData, token));

//       // 2️⃣ CAPTURE PAYMENT
//       const paymentData = await capturePayment(
//         {
//           amount: createdOrder.totalAmount,
//           orderId: createdOrder._id,
//           paymentFor: "order",
//         },
//         token
//       );

//       openRazorpay(paymentData.razorpayOrder, paymentData.paymentId);

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function openRazorpay(order, paymentId) {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: order.amount,
//       currency: order.currency,
//       order_id: order.id,
//       name: "Hotel Order",
//       description: "Food Payment",

//       handler: async function (response) {
//         try {
//           await verifyPayment(
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               paymentId,
//             },
//             token
//           );

//           toast.success("Payment Successful 🎉");

//         } catch (error) {
//           toast.error("Payment verification failed");
//         }
//       },

//       theme: {
//         color: "#f97316",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   }

//   return (
//     <div>
//       <h2>{menuItem.name}</h2>
//       <p>₹{menuItem.price}</p>

//       <input
//         type="number"
//         min="1"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//       />

//       <button onClick={handleOrder}>
//         {loading ? "Processing..." : "Place Order"}
//       </button>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../../services/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OrderContainer() {
  const { menuItem } = useSelector((state) => state.menu);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!menuItem) {
    return <h2>No menu item selected</h2>;
  }

  // async function handleOrder() {
  //   try {
  //     setLoading(true);

  //     const orderData = {
  //       items: [
  //         {
  //           menuItem: menuItem._id,
  //           quantity: Number(quantity),
  //         },
  //       ],
  //     };

  //     await dispatch(placeOrder(orderData, token));

  //     toast.success("Order Created Successfully!");
  //     navigate("/dashboard/orders");

  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function handleOrder() {
  try {
    setLoading(true);

    const orderData = {
      items: [
        {
          menuItem: menuItem._id,
          quantity: Number(quantity),
        },
      ],
    };

    const result = await dispatch(placeOrder(orderData, token));

    if (result) {
      await dispatch(getMyOrders(token));   // 🔥 force refresh
      toast.success("Order Created Successfully!");
      navigate("/dashboard/orders");
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">

        <img
          src={menuItem.image}
          alt={menuItem.name}
          className="w-full h-48 object-cover rounded-lg"
        />

        <h2 className="text-2xl font-bold mt-4">{menuItem.name}</h2>
        <p className="text-gray-600 mt-2">{menuItem.description}</p>

        <p className="text-xl font-semibold mt-3 text-green-600">
          ₹{menuItem.price}
        </p>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <p className="mt-3 font-semibold">
          Total: ₹{menuItem.price * quantity}
        </p>

        <button
          onClick={handleOrder}
          disabled={loading}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>
    </div>
  );
}
