// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { bookTable } from "../../../services/tablebookingApi";
// import {useDispatch} from 'react-redux'

// export default function TableBooking({ tableId, closeModal }) {
//   const { token } = useSelector((state) => state.auth);
// console.log("tableId",tableId);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [guests, setGuests] = useState("");
// const dispatch=useDispatch();
//  function handleBooking() {
//     // e.preventDefault();
//     const bookingData = {
//     table_id: tableId,
//     date: date,
//     timeSlot: time,
//     guests: guests,
//   };

//   dispatch(bookTable(bookingData, token));
//   closeModal();

//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-[400px]">
//         <h2 className="text-xl font-semibold mb-4">Book Table</h2>

//         <form  className="space-y-4">
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />

//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />

//           <input
//             type="number"
//             placeholder="Number of Guests"
//             value={guests}
//             onChange={(e) => setGuests(e.target.value)}
//             className="w-full border px-3 py-2 rounded-md"
//             required
//           />

//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 bg-gray-400 text-white rounded-md"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               onClick={handleBooking}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md"
//             >
//               Confirm Booking
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { bookTable } from "../../../services/tablebookingApi";

export default function TableBooking({ tableId, closeModal }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [guests, setGuests] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!date || !timeSlot || !guests) {
      toast.error("Please fill all fields");
      return;
    }

    const bookingData = {
      table_id: tableId,
      date,
      timeSlot,
      guests: Number(guests),
    };

    setLoading(true);

    try {
      const result = await dispatch(bookTable(bookingData, token));
      
      if (result) {
        toast.success("Table booked successfully! 🎉");
        if (closeModal) closeModal();
        navigate('/dashboard/tablebooked');
      } else {
        toast.error("Failed to book table - please try again");
      }
    } catch (err) {
      toast.error("Booking error - please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Book Table</h2>

        <form onSubmit={handleBooking} className="space-y-4">

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          />

          {/* Time Slot (ENUM MATCHING BACKEND) */}
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select Time Slot</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>

          {/* Guests */}
          <input
            type="number"
            placeholder="Number of Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            min="1"
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
