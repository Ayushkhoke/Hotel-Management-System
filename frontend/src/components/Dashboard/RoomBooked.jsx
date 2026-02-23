import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookings, deleteBooking } from "../../services/roombookingApi";
import { buyPayment } from "../../services/paymentapi/RoompaymentApi";

export default function RoomBooked() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { booking } = useSelector((state) => state.booking);

  // 🔥 Fetch bookings on load
  useEffect(() => {
    if (token) {
      dispatch(getMyBookings(token));
    }
  }, [token, dispatch]);

  // 💳 Handle Payment
  async function handlePayment(singleBooking) {
    await buyPayment(token, user, singleBooking, dispatch);
  }

  // ❌ Handle Cancel
  async function handleCancel(id) {
    await deleteBooking(id, token);
    dispatch(getMyBookings(token));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 sm:px-8 py-10">
      
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          🏨 My Room Bookings
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Manage your reservations and payments easily
        </p>
      </div>

      {/* No Bookings */}
      {booking?.length === 0 && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center">
          <p className="text-gray-600 text-lg">No bookings found 😔</p>
        </div>
      )}

      {/* Booking Cards */}
      <div className="max-w-6xl mx-auto grid gap-6">
        {booking?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-100"
          >
            {/* Left Section - Booking Details */}
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Room #{item.room?.roomNumber}
              </h3>

              <div className="text-gray-600 text-sm sm:text-base space-y-1">
                <p>
                  <span className="font-medium">Check In:</span>{" "}
                  {new Date(item.checkIn).toLocaleDateString()}
                </p>

                <p>
                  <span className="font-medium">Check Out:</span>{" "}
                  {new Date(item.checkOut).toLocaleDateString()}
                </p>
              </div>

              <p className="text-2xl font-bold text-green-600 mt-2">
                ₹{item.totalPrice}
              </p>

              {/* Payment Status Badge */}
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  item.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.paymentStatus === "paid" ? "Paid ✅" : "Pending ⏳"}
              </span>
            </div>

            {/* Right Section - Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              
              {/* 💳 Pay Now Button */}
              {item.paymentStatus === "pending" && (
                <button
                  onClick={() => handlePayment(item)}
                  className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg font-medium shadow-sm w-full sm:w-auto"
                >
                  💳 Pay Now
                </button>
              )}

              {/* ❌ Cancel Button */}
              {item.status !== "cancelled" && (
                <button
                  onClick={() => handleCancel(item._id)}
                  className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-2 rounded-lg font-medium shadow-sm w-full sm:w-auto"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}