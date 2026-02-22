// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getMyTableBookings } from "../../../services/tablebookingApi";
// export default function TableBooked() {

//   const { tablebookings } = useSelector((state) => state.table);
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   console.log("tablebookings",tablebookings);
//     console.log("`tokrn",token);
//   useEffect(() => {
//     if (!token) return;
//     dispatch(getMyTableBookings(token));
//   }, [token, dispatch]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Table Bookings</h1>

//       {tablebookings?.length === 0 && (
//         <p className="text-gray-500">No bookings found.</p>
//       )}

//       {tablebookings?.map((booking) => (
//         <div key={booking._id} className="border p-4 mb-4 rounded-lg shadow-sm bg-white">
//           <p><strong>Table:</strong> {booking.table?.tableNumber}</p>
//           <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
//           <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
//           <p><strong>Status:</strong> {booking.status}</p>
//           <p><strong>Guests:</strong> {booking.guests}</p>
//           <p><strong>Amount:</strong> ₹{booking.amount}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyTableBookings } from "../../../services/tablebookingApi";
import { buyTablePayment } from "../../../services/paymentapi/TablepaymentApi";
import { apiConnector } from "../../../services/apiconnector";
import { tableBooking } from "../../../services/apis";
import { toast } from "react-hot-toast";

export default function TableBooked() {

  const { tablebookings } = useSelector((state) => state.table);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(getMyTableBookings(token));
  }, [token, dispatch]);

  // 🔥 Handle Payment
  const handlePayment = (booking) => {
    buyTablePayment(token, user, booking, dispatch);
  };

  // 🔥 Handle Cancel
  const handleCancel = async (bookingId) => {
    try {
      await apiConnector(
        "POST",
        tableBooking.CANCEL_TABLE_API,
        { bookingId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      toast.success("Booking cancelled successfully");

      dispatch(getMyTableBookings(token));

    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Table Bookings
      </h1>

      {/* Empty State */}
      {tablebookings?.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No bookings found.
        </div>
      )}

      {/* Booking Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tablebookings?.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-xl shadow-md p-6 border hover:shadow-xl transition duration-300"
          >
            <p><strong>Table:</strong> {booking.table?.tableNumber}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
            <p><strong>Amount:</strong> ₹{booking.amount}</p>

            {/* Status Badge */}
            <p className="mt-3">
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {booking.status}
              </span>
            </p>

            {/* Buttons Logic */}
            <div className="mt-5">

              {/* Pending → Only Pay */}
              {
                <button
                  onClick={() => handlePayment(booking)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Pay Now
                </button>
              }

              {/* Confirmed → Only Cancel */}
              {
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>
              }

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
