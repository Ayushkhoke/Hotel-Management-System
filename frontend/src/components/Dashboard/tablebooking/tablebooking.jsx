// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { bookTable } from "../../../services/tablebookingApi";
// import { X, Calendar, Clock, Users, ChevronRight } from "lucide-react";

// export default function TableBooking({ tableId, closeModal }) {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [date, setDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [guests, setGuests] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleBooking = async (e) => {
//     e.preventDefault();

//     if (!date || !timeSlot || !guests) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     const bookingData = {
//       table_id: tableId,
//       date,
//       timeSlot,
//       guests: Number(guests),
//     };

//     setLoading(true);

//     try {
//       const result = await dispatch(bookTable(bookingData, token));
      
//       if (result) {
//         toast.success("Table booked successfully! 🎉");
//         if (closeModal) closeModal();
//         navigate("/dashboard/my-table-bookings");
//       } else {
//         toast.error("Failed to book table - please try again");
//       }
//     } catch (err) {
//       toast.error("Booking error - please try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (loading) return;

//     if (typeof closeModal === "function") {
//       closeModal();
//       return;
//     }

//     // Fallback when this component is used as a full page (not modal)
//     navigate("/dashboard/table");
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//       onClick={handleCancel}
//     >
//       <div
//         className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all"
//         onClick={(e) => e.stopPropagation()}
//       >
        
//         {/* Header with Gradient */}
//         <div className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
//           <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
//           <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
          
//           <div className="relative flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="bg-white/20 p-2 rounded-full">
//                   <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M17.9 3H2.1C1 3 0 4 0 5v10c0 1 1 2 2.1 2h15.8c1.1 0 2.1-1 2.1-2V5c0-1-1-2-2.1-2z"/>
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Reserve Table</h2>
//               </div>
//               <p className="text-emerald-50 text-sm">Complete your dining reservation</p>
//             </div>
            
//             <button
//               onClick={handleCancel}
//               className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
//               disabled={loading}
//               aria-label="Close booking form"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Form Body */}
//         <form onSubmit={handleBooking} className="p-6 space-y-5">
          
//           {/* Date Field */}
//           <div className="space-y-2">
//             <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
//               <Calendar size={18} className="text-emerald-600" />
//               Select Date
//             </label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all bg-gray-50 hover:bg-white cursor-pointer"
//               required
//             />
//           </div>

//           {/* Time Slot Field */}
//           <div className="space-y-2">
//             <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
//               <Clock size={18} className="text-teal-600" />
//               Select Time Slot
//             </label>
//             <select
//               value={timeSlot}
//               onChange={(e) => setTimeSlot(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all bg-gray-50 hover:bg-white cursor-pointer appearance-none"
//               required
//             >
//               <option value="">🕐 Choose a time...</option>
//               <option value="morning">🌅 Morning (6 AM - 12 PM)</option>
//               <option value="afternoon">☀️ Afternoon (12 PM - 5 PM)</option>
//               <option value="evening">🌆 Evening (5 PM - 9 PM)</option>
//               <option value="night">🌙 Night (9 PM - 12 AM)</option>
//             </select>
//           </div>

//           {/* Guests Field */}
//           <div className="space-y-2">
//             <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
//               <Users size={18} className="text-cyan-600" />
//               Number of Guests
//             </label>
//             <input
//               type="number"
//               placeholder="Enter number of guests"
//               value={guests}
//               onChange={(e) => setGuests(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200 transition-all bg-gray-50 hover:bg-white"
//               min="1"
//               max="20"
//               required
//             />
//             {guests && <p className="text-xs text-gray-500">👥 {guests} {guests == 1 ? 'guest' : 'guests'}</p>}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4">
            
//             {/* Cancel Button */}
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={loading}
//               className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-red-400 hover:bg-red-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
//             >
//               Cancel
//             </button>

//             {/* Confirm Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Booking...
//                 </>
//               ) : (
//                 <>
//                   Confirm Booking
//                   <ChevronRight size={18} />
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Info Text */}
//           <p className="text-xs text-gray-500 text-center pt-2">
//             💡 You'll be able to make payment after confirmation
//           </p>
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
import { X, Calendar, Clock, Users } from "lucide-react";

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
        toast.success("Reservation Confirmed 🍽️");
        if (closeModal) closeModal();
        navigate("/dashboard/my-table-bookings");
      }
    } catch {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (loading) return;

    if (typeof closeModal === "function") {
      closeModal();
      return;
    }

    navigate("/dashboard/table");
  };

  return (
    <div
      onClick={handleCancel}
      className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Booking Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 border-b border-white/20">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Reserve Your Table
            </h2>
            <p className="text-sm text-gray-300">
              Enjoy a luxury dining experience
            </p>
          </div>

          <button
            onClick={handleCancel}
            className="text-gray-300 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleBooking} className="p-4 sm:p-6 space-y-5 sm:space-y-6">

          {/* Date */}
          <div>
            <label className="text-sm text-gray-200 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Reservation Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded-lg focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="text-sm text-gray-200 mb-2 flex items-center gap-2">
              <Clock size={16} />
              Select Time
            </label>

            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded-lg focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
            >
              <option value="">Choose a time</option>
              <option value="morning">Morning (6 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 9 PM)</option>
              <option value="night">Night (9 PM - 12 AM)</option>
            </select>
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm text-gray-200 mb-2 flex items-center gap-2">
              <Users size={16} />
              Guests
            </label>

            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Number of guests"
              required
              className="w-full bg-black/30 border border-white/20 text-white px-4 py-3 rounded-lg focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-amber-500 to-yellow-400 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Processing Reservation..." : "Confirm Reservation"}
          </button>

          <p className="text-xs text-gray-300 text-center">
            Payment will be completed after reservation confirmation.
          </p>

        </form>
      </div>
    </div>
  );
}
