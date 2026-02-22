
import { toast } from "react-hot-toast";
import { payment } from "../apis";
import { apiConnector } from "../apiconnector";
import { getMyBookings } from "../roombookingApi";

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

export async function buyPayment(token, user, bookingData, dispatch) {

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

    // 🔥 Calculate total amount (Room Booking)
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);

    const diffTime = checkOut - checkIn;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    const totalAmount =
      diffDays * bookingData.room.pricePerNight;

    // 2️⃣ Call backend capture payment
    const orderResponse = await apiConnector(
      "POST",
      payment.CAPTURE_PAYMENT_API,
      {
        amount: totalAmount,
        bookingId: bookingData._id,
        paymentFor: "room",
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse?.data?.success) {
      toast.error("Could not initiate payment", { id: toastId });
      return;
    }

    const { razorpayOrder, paymentId } =
      orderResponse.data.data;

    // 3️⃣ Razorpay Options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
      name: "Hotel Booking",
      description: "Room Booking Payment",

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
              razorpay_order_id:
                response.razorpay_order_id,
              razorpay_payment_id:
                response.razorpay_payment_id,
              razorpay_signature:
                response.razorpay_signature,
              paymentId,
            },
            {
              Authorization: `Bearer ${token}`,
            }
          );

          toast.success("Payment successful 🎉");
console.log("VERIFY REQUEST PAYLOAD:", {
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,
  paymentId,
});
          // Refresh bookings
          dispatch(getMyBookings(token));

        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      toast.error("Payment failed ❌");
    });

  } catch (error) {
    console.log("Payment Error:", error);
    toast.error("Something went wrong", { id: toastId });
  }

  toast.dismiss(toastId);
}
