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
    <div className="min-h-screen bg-green-50 p-8">
      <h2 className="text-3xl font-bold mb-6">
        🏨 My Room Bookings
      </h2>

      {booking?.length === 0 && (
        <div className="bg-white p-6 rounded shadow text-center">
          No bookings found 😔
        </div>
      )}

      {booking?.map((item) => (
        <div
          key={item._id}
          className="bg-white p-6 rounded-lg shadow mb-4 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-lg">
              Room: {item.room?.roomNumber}
            </p>

            <p>
              Check In:{" "}
              {new Date(item.checkIn).toLocaleDateString()}
            </p>

            <p>
              Check Out:{" "}
              {new Date(item.checkOut).toLocaleDateString()}
            </p>

            <p className="text-xl font-bold text-green-600">
              ₹{item.totalPrice}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                item.paymentStatus === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {item.paymentStatus}
            </span>
          </div>

          <div className="flex gap-4">
            {/* 💳 Pay Now Button */}
            {item.paymentStatus === "pending" && (
              <button
                onClick={() => handlePayment(item)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                💳 Buy Now
              </button>
            )}

            {/* ❌ Cancel Button */}
            {item.status !== "cancelled" && (
              <button
                onClick={() => handleCancel(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
