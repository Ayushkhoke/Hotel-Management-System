// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { bookRoom } from "../../services/roombookingApi"; // ✅ import your API
// import { useDispatch } from "react-redux";
// import {useNavigate} from 'react-router-dom'
// export default function RoomBooking({ room, onClose }) {
//   const { token } = useSelector((state) => state.auth);

//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate=useNavigate();
//  const dispatch=useDispatch();
//   async function handleBooking(e) {
//     e.preventDefault();

//     if (!checkIn || !checkOut) {
//       toast.error("Please select dates");
//       return;
//     }

//     const totalDays =
//       (new Date(checkOut) - new Date(checkIn)) /
//       (1000 * 60 * 60 * 24);

//     if (totalDays <= 0) {
//       toast.error("Check-out must be after check-in");
//       return;
//     }

//     const totalPrice = totalDays * room.pricePerNight;

//     try {
//       setLoading(true);

//       const booking = await bookRoom(
//         {
//           room: room._id,
//           checkIn,
//           checkOut,
//           totalPrice,
//         },
//         token
//       );

//       if (booking) {
//         toast.success("Room booking created 🎉");
//         if (onClose) onClose();
//         navigate("/dashboard/roombooked");
//       } else {
//         toast.error("Failed to book room - please try again");
//       }

//     } catch (error) {
//       toast.error("Booking failed - " + (error?.message || "Please try again"));
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-black">
//       <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">
//           Book Room {room.roomNumber}
//         </h2>

//         <p className="text-sm text-gray-500 mb-4">
//           ${room.pricePerNight} per night
//         </p>

//         <form onSubmit={handleBooking} className="space-y-4">
//           <div>
//             <label className="block text-sm">Check In</label>
//             <input
//               type="date"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//               className="w-full border px-3 py-2 rounded-md"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm">Check Out</label>
//             <input
//               type="date"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//               className="w-full border px-3 py-2 rounded-md"
//               required
//             />
//           </div>

//           <div className="flex justify-between pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-400 px-4 py-2 text-white rounded-md"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-green-600 px-4 py-2 text-white rounded-md"
//             >
//               {loading ? "Booking..." : "Book Room"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { bookRoom } from "../../services/roombookingApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CalendarDays, X, BedDouble } from "lucide-react";

export default function RoomBooking({ room, onClose }) {
  const { token } = useSelector((state) => state.auth);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        toast.success("Room booked successfully 🎉");
        if (onClose) onClose();
        navigate("/dashboard/roombooked");
      } else {
        toast.error("Failed to book room");
      }
    } catch (error) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">

      {/* NEW Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-4 sm:p-6 text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <BedDouble size={20} />
              Room {room.roomNumber}
            </h2>
            <p className="text-gray-300 text-sm">
              ${room.pricePerNight} per night
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleBooking} className="space-y-5">

          {/* Check In */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2 mb-1">
              <CalendarDays size={16} />
              Check In
            </label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded-lg focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
              required
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2 mb-1">
              <CalendarDays size={16} />
              Check Out
            </label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded-lg focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-white/30 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-lg"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
