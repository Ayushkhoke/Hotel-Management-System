// import { toast } from "react-hot-toast";
// import { payment } from "../apis";
// import { apiConnector } from "../apiconnector";
// import { getMyTableBookings } from "../tablebookingApi";

// // 🔥 Load Razorpay dynamically
// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// export async function buyTablePayment(token, user, tableBookingData, dispatch) {

//   const toastId = toast.loading("Loading payment gateway...");

//   try {

//     // 1️⃣ Load Razorpay SDK
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       toast.error("Razorpay SDK failed to load", { id: toastId });
//       return;
//     }

//     // 🔥 Calculate total amount (Table Booking)
//     // Example: price per person × number of guests

//     const totalAmount =
//       tableBookingData.table.pricePerPerson *
//       tableBookingData.numberOfGuests;

//     // 2️⃣ Call backend capture payment
//     const orderResponse = await apiConnector(
//       "POST",
//       payment.CAPTURE_PAYMENT_API,
//       {
//         amount: totalAmount,
//         bookingId: tableBookingData._id,
//         paymentFor: "table",
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!orderResponse?.data?.success) {
//       toast.error("Could not initiate payment", { id: toastId });
//       return;
//     }

//     const { razorpayOrder, paymentId } =
//       orderResponse.data.data;

//     // 3️⃣ Razorpay Options
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       order_id: razorpayOrder.id,
//       name: "Restaurant Table Booking",
//       description: "Table Reservation Payment",

//       prefill: {
//         name: user?.name,
//         email: user?.email,
//       },

//       handler: async function (response) {
//         try {

//           await apiConnector(
//             "POST",
//             payment.VERIFY_PAYMENT_API,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               paymentId,
//             },
//             {
//               Authorization: `Bearer ${token}`,
//             }
//           );

//           toast.success("Payment successful 🎉");

//           // Refresh table bookings
//           dispatch(getMyTableBookings(token));

//         } catch (error) {
//           toast.error("Payment verification failed");
//         }
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     paymentObject.on("payment.failed", function () {
//       toast.error("Payment failed ❌");
//     });

//   } catch (error) {
//     console.log("Payment Error:", error);
//     toast.error("Something went wrong", { id: toastId });
//   }

//   toast.dismiss(toastId);
// }


// import { toast } from "react-hot-toast";
// import { payment } from "../apis";
// import { apiConnector } from "../apiconnector";
// // import { getMyTableBookings } from "../tablebookingApi";

// export async function buyTablePayment(token, user, bookingData, dispatch) {

//   const toastId = toast.loading("Loading payment gateway...");

//   try {

//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       toast.error("Razorpay SDK failed to load", { id: toastId });
//       return;
//     }

//     // ❌ Do NOT calculate amount here

//     const orderResponse = await apiConnector(
//       "POST",
//       payment.CAPTURE_PAYMENT_API,
//       {
//         bookingId: bookingData._id,
//         paymentFor: "table",
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     const { razorpayOrder, paymentId } =
//       orderResponse.data.data;

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       order_id: razorpayOrder.id,
//       name: "Restaurant Table Booking",
//       description: "Table Reservation Payment",
//       prefill: {
//         name: user?.name,
//         email: user?.email,
//       },
//       handler: async function (response) {

//         await apiConnector(
//           "POST",
//           payment.VERIFY_PAYMENT_API,
//           {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             paymentId,
//           },
//           {
//             Authorization: `Bearer ${token}`,
//           }
//         );

//         toast.success("Payment successful 🎉");
//         dispatch(getMyTableBookings(token));
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//   } catch (error) {
//     console.log("Payment Error:", error);
//     toast.error("Something went wrong", { id: toastId });
//   }

//   toast.dismiss(toastId);
// }


// import { toast } from "react-hot-toast";
// import { payment } from "../apis";
// import { apiConnector } from "../apiconnector";
// import { getMyTableBookings } from "../tablebookingApi";

// // 🔥 Load Razorpay dynamically
// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// export async function buyTablePayment(token, user, bookingData, dispatch) {

//   const toastId = toast.loading("Loading payment gateway...");

//   try {

//     // 1️⃣ Load Razorpay
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       toast.error("Razorpay SDK failed to load", { id: toastId });
//       return;
//     }

//     // 2️⃣ Call backend (amount calculated in backend)
//     const orderResponse = await apiConnector(
//       "POST",
//       payment.CAPTURE_PAYMENT_API,
//       {
//         bookingId: bookingData._id,
//         paymentFor: "table",   // 🔥 important
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!orderResponse?.data?.success) {
//       toast.error("Could not initiate payment", { id: toastId });
//       return;
//     }

//     const { razorpayOrder, paymentId } =
//       orderResponse.data.data;

//     // 3️⃣ Razorpay Config
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       order_id: razorpayOrder.id,
//       name: "Restaurant Table Booking",
//       description: "Table Reservation Payment",

//       prefill: {
//         name: user?.name,
//         email: user?.email,
//       },

//       handler: async function (response) {
//         try {

//           await apiConnector(
//             "POST",
//             payment.VERIFY_PAYMENT_API,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               paymentId,
//             },
//             {
//               Authorization: `Bearer ${token}`,
//             }
//           );

//           toast.success("Table payment successful 🎉");

//           // 🔥 Refresh table bookings
//           dispatch(getMyTableBookings(token));

//         } catch (error) {
//           toast.error("Payment verification failed ❌");
//         }
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     paymentObject.on("payment.failed", function () {
//       toast.error("Payment failed ❌");
//     });

//   } catch (error) {
//     console.log("Table Payment Error:", error);
//     toast.error("Something went wrong", { id: toastId });
//   }

//   toast.dismiss(toastId);
// }



 import { toast } from "react-hot-toast";
 import { payment } from "../apis";
 import { apiConnector } from "../apiconnector";
 import { getMyTableBookings } from "../tablebookingApi";

 function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
export async function buyTablePayment(token, user, bookingData, dispatch) {

  const toastId = toast.loading("Loading payment gateway...");

  try {

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load", { id: toastId });
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      payment.CAPTURE_PAYMENT_API,
      {
        amount: bookingData.amount ,
        bookingId: bookingData._id,
        paymentFor: "table",
        
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.success) {
      toast.error("Could not initiate payment", { id: toastId });
      return;
    }

    const { razorpayOrder, paymentId } =orderResponse.data.data;

    toast.dismiss(toastId);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: "Restaurant Table Booking",
      description: "Table Reservation Payment",

      prefill: {
        name: user?.name,
        email: user?.email,
      },

      handler: async function (response) {
        try {

          const verifyResponse = await apiConnector(
            "POST",
            payment.VERIFY_PAYMENT_API,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          );

          if (!verifyResponse?.data?.success) {
            toast.error("Payment verification failed ❌");
            return;
          }

          toast.success("Table payment successful 🎉");

          dispatch(getMyTableBookings(token));

        } catch (error) {
          toast.error("Payment verification failed ❌");
        }
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      toast.error("Payment failed ❌");
    });

  } catch (error) {
    console.log("Table Payment Error:", error);
    toast.error("Something went wrong ❌", { id: toastId });
  }
}
