// import { toast } from "react-hot-toast";
// import { payment } from "./apis";
// import { apiConnector } from "./apiconnector";
// import   {setPaymentLoading} from '../slices/orderSlice'




// export const capturePayment = async (data, token) => {
//   try {
//     const response = await apiConnector(
//       "POST",
//       payment.CAPTURE_PAYMENT_API,
//       data,
//       {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       }
//     );

//     if (!response?.data?.success) {
//       throw new Error(
//         response?.data?.message || "Payment initiation failed"
//       );
//     }

//     return response.data.data; // returns razorpayOrder + paymentId

//   } catch (error) {
//     console.log("CAPTURE PAYMENT ERROR:", error);

//     toast.error(
//       error?.response?.data?.message ||
//       error.message ||
//       "Unable to initiate payment"
//     );

//     throw error;
//   }
// };





// export const verifyPayment = async (data, token) => {
//   try {
//     const response = await apiConnector(
//       "POST",
//       payment.VERIFY_PAYMENT_API,
//       data,
//       {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       }
//     );

//     if (!response?.data?.success) {
//       throw new Error(
//         response?.data?.message || "Payment verification failed"
//       );
//     }

//     toast.success("Payment verified successfully 🎉");

//     return response.data;

//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);

//     toast.error(
//       error?.response?.data?.message ||
//       error.message ||
//       "Payment verification failed"
//     );

//     throw error;
//   }
// };

// import { toast } from "react-hot-toast";
// import { payment } from "./apis";
// import { apiConnector } from "./apiconnector";

// export const capturePayment = async (data, token) => {
//   try {
//     const response = await apiConnector(
//       "POST",
//       payment.CAPTURE_PAYMENT_API,
//       data,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!response?.data?.success) {
//       throw new Error(response?.data?.message || "Payment initiation failed");
//     }

//     return response.data.data; // { razorpayOrder, paymentId }

//   } catch (error) {
//     toast.error(
//       error?.response?.data?.message ||
//       error.message ||
//       "Unable to initiate payment"
//     );
//     throw error;
//   }
// };

// export const verifyPayment = async (data, token) => {
//   try {
//     const response = await apiConnector(
//       "POST",
//       payment.VERIFY_PAYMENT_API,
//       data,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!response?.data?.success) {
//       throw new Error(response?.data?.message || "Payment verification failed");
//     }

//     return response.data;

//   } catch (error) {
//     toast.error(
//       error?.response?.data?.message ||
//       error.message ||
//       "Payment verification failed"
//     );
//     throw error;
//   }
// };
























// /// room booking api

import { toast } from "react-hot-toast";
import { payment } from "./apis";
import { apiConnector } from "./apiconnector";

// 🔥 Load Razorpay dynamically
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function buyOrder(token, user, orderData, dispatch) {

  const toastId = toast.loading("Loading payment gateway...");

  try {

    // 1️⃣ Load Razorpay SDK
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load", { id: toastId });
      return;
    }

    // 2️⃣ Create Razorpay order from backend
    const orderResponse = await apiConnector(
      "POST",
      payment.CAPTURE_PAYMENT_API,
      {
        amount: orderData.totalAmount,
        orderId: orderData._id,
        paymentFor: "order",
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.success) {
      toast.error("Could not initiate payment", { id: toastId });
      return;
    }

    const { razorpayOrder, paymentId } = orderResponse.data.data;

    // 3️⃣ Razorpay Options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: Number(razorpayOrder.amount),
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: "Hotel Order",
      description: "Food Payment",

      prefill: {
        name: user?.name,
        email: user?.email,
      },

      handler: async function (response) {

        try {
          await apiConnector(
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

          toast.success("Payment successful 🎉");

          // Refresh orders
          dispatch({ type: "order/reset" });

        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      toast.error("Payment failed");
    });

  } catch (error) {
    console.log("Error in buyOrder:", error);
    toast.error("Something went wrong", { id: toastId });
  }

  toast.dismiss(toastId);
}

