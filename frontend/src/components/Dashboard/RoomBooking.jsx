import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { bookRoom } from "../../services/roombookingApi"; // ✅ import your API
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
export default function RoomBooking({ room, onClose }) {
  const { token } = useSelector((state) => state.auth);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
 const dispatch=useDispatch();
  async function handleBooking(e) {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      toast.error("Please select dates");
      return;
    }

    const totalDays =
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24);

    if (totalDays <= 0) {
      toast.error("Check-out must be after check-in");
      return;
    }

    const totalPrice = totalDays * room.pricePerNight;

    try {
      setLoading(true);

      const booking = await bookRoom(
        {
          room: room._id,
          checkIn,
          checkOut,
          totalPrice,
        },
        token
      );

      if (booking) {
        toast.success("Room booking created 🎉");
        navigate("/dashboard/roombooked")
        onClose(); // close modal only if success
      }

    } catch (error) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Book Room {room.roomNumber}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          ₹{room.pricePerNight} per night
        </p>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-sm">Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 text-white rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 px-4 py-2 text-white rounded-md"
            >
              {loading ? "Booking..." : "Book Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
