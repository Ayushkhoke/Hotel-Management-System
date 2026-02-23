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

  const handlePayment = (booking) => {
    buyTablePayment(token, user, booking, dispatch);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 px-4 sm:px-8 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          🍽 My Table Bookings
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Manage your reservations and payments easily
        </p>
      </div>

      {/* Empty State */}
      {tablebookings?.length === 0 && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
          <p className="text-gray-600 text-lg">No bookings found 😔</p>
        </div>
      )}

      {/* Booking Cards */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tablebookings?.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 flex flex-col justify-between"
          >
            {/* Booking Info */}
            <div className="space-y-2 text-sm sm:text-base">
              <h2 className="text-lg font-semibold text-gray-800">
                Table #{booking.table?.tableNumber}
              </h2>

              <p className="text-gray-600">
                <span className="font-medium">Date:</span>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Time Slot:</span>{" "}
                {booking.timeSlot}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Guests:</span>{" "}
                {booking.guests}
              </p>

              <p className="text-xl font-bold text-green-600 mt-2">
                ₹{booking.amount}
              </p>

              {/* Status Badge */}
              <div className="mt-3">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    booking.paymentStatus === "paid" || booking.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : booking.paymentStatus === "pending" || booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.paymentStatus === "paid" || booking.status === "Confirmed"
                    ? "Confirmed ✅"
                    : booking.paymentStatus === "pending" || booking.status === "Pending"
                    ? "Pending ⏳"
                    : booking.status || "Unknown"}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              
              {(booking.paymentStatus !== "paid") &&
               booking.status !== "Cancelled" && (
                <button
                  onClick={() => handlePayment(booking)}
                  className="w-full sm:w-auto flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition font-medium shadow-sm"
                >
                  💳 Pay Now
                </button>
              )}

              {booking.status !== "Cancelled" &&
               booking.paymentStatus !== "paid" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="w-full sm:w-auto flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition font-medium shadow-sm"
                >
                  ❌ Cancel
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}