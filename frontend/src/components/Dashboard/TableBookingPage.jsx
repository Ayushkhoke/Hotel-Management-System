import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableBooking from "./tablebooking/tablebooking";
import { ArrowLeft, Users, UtensilsCrossed, DollarSign, Star } from "lucide-react";

export default function TableBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const table = location.state?.table;
  
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!table) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg">No table selected for booking.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white mb-6 hover:text-amber-400 transition"
        >
          <ArrowLeft size={18} />
          Back to Tables
        </button>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-5 sm:gap-8">

          {/* TABLE IMAGE */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-3 sm:p-4 shadow-xl">
            <img
              src={
                table.image ||
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              }
              alt={`Table ${table.tableNumber}`}
              className="w-full h-60 sm:h-80 md:h-96 object-cover rounded-xl transition hover:scale-[1.02]"
            />

            {/* Table Features */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-white text-center text-xs sm:text-sm">
              <div className="bg-white/10 backdrop-blur-xl rounded-lg p-3 border border-white/20">
                <UtensilsCrossed className="mx-auto mb-1" size={20} />
                <p>Fine Dining</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-lg p-3 border border-white/20">
                <Star className="mx-auto mb-1" size={20} />
                <p>Premium</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-lg p-3 border border-white/20">
                <Users className="mx-auto mb-1" size={20} />
                <p>{table.capacity} Guests</p>
              </div>
            </div>
          </div>

          {/* TABLE INFO CARD */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 sm:p-8 shadow-xl text-white">

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Table {table.tableNumber}
            </h1>

            <p className="text-gray-300 flex items-center gap-2 mb-4">
              <UtensilsCrossed size={18} />
              {table.capacity >= 8 ? "Large Party Seating" : table.capacity >= 5 ? "Family Dining" : "Intimate Dining Experience"}
            </p>

            <p className="text-gray-300 flex items-center gap-2 mb-6">
              <Users size={18} />
              Capacity: {table.capacity} Guests
            </p>

            {/* Price */}
            <div className="mb-8">
              <p className="text-3xl sm:text-4xl font-bold text-amber-400">
                ${table.price}
              </p>
              <p className="text-sm text-gray-400">per person</p>
            </div>

            {/* Features */}
            <div className="mb-8 text-sm text-gray-300 space-y-1">
              <p>âœ” Premium Location</p>
              <p>âœ” Dedicated Service</p>
              <p>âœ” Special Ambiance</p>
              <p>âœ” Full Menu Access</p>
            </div>

            {/* Booking Button */}
            <button
              onClick={() => setShowBookingModal(true)}
              disabled={table.status === "occupied"}
              className="w-full bg-linear-to-r from-amber-500 to-yellow-400 text-black font-semibold py-3 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {table.status === "occupied"
                ? "Currently Booked"
                : "Reserve This Table"}
            </button>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <TableBooking
          tableId={table._id}
          closeModal={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}


// import React from "react";
// import { useLocation } from "react-router-dom";
// import TableBooking from "./tablebooking/tablebooking";

// export default function TableBookingPage() {
//   const location = useLocation();
//   const table = location.state?.table;

//   if (!table) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <p className="text-gray-500 text-lg">No table selected for booking.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* HERO SECTION */}
//       <div className="relative h-[320px] w-full overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
//           alt="Luxury Restaurant"
//           className="w-full h-full object-cover"
//         />

//         <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
//           <h1 className="text-4xl md:text-5xl font-bold">
//             Reserve Your Table
//           </h1>

//           <p className="mt-3 text-lg text-gray-200 max-w-xl">
//             Experience luxury dining at Royal Grand. Secure your table and
//             enjoy a memorable evening.
//           </p>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

//         {/* LEFT SIDE RESTAURANT INFO */}
//         <div className="space-y-6">

//           {/* Restaurant Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">

//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Royal Grand Restaurant
//             </h2>

//             <p className="text-gray-600 mb-4">
//               Enjoy fine dining with world-class chefs and premium ambience.
//               Perfect for family dinners, romantic evenings, and celebrations.
//             </p>

//             <div className="space-y-2 text-gray-700">
//               <p>ðŸ“ New York City</p>
//               <p>ðŸ“ž +1 (212) 555-9876</p>
//               <p>âœ‰ contact@royalgrand.com</p>
//               <p>ðŸ•’ Open: 11:00 AM â€“ 11:00 PM</p>
//             </div>

//           </div>

//           {/* TRUST / REVIEWS */}
//           <div className="bg-white rounded-2xl shadow-lg p-6">

//             <h3 className="text-xl font-semibold mb-3">
//               Customer Reviews
//             </h3>

//             <div className="flex items-center mb-3">
//               <span className="text-yellow-500 text-xl">â˜…â˜…â˜…â˜…â˜…</span>
//               <span className="ml-2 text-gray-700">
//                 4.8 / 5 from 1,200+ diners
//               </span>
//             </div>

//             <p className="text-gray-600 italic">
//               "Amazing ambience and delicious food. One of the best dining
//               experiences in the city!"
//             </p>

//           </div>

//         </div>

//         {/* RIGHT SIDE BOOKING FORM */}
//         <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">

//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Book Your Table
//           </h2>

//           <p className="text-gray-500 mb-6">
//             Secure your reservation in seconds.
//           </p>

//           <TableBooking tableId={table._id} />

//         </div>

//       </div>

//       {/* TRUST FOOTER SECTION */}
//       <div className="bg-white border-t mt-10 py-10">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">

//           <div>
//             <h4 className="font-semibold text-lg">Secure Booking</h4>
//             <p className="text-gray-500 text-sm">
//               Your reservation is protected with secure payment.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-semibold text-lg">Trusted by Diners</h4>
//             <p className="text-gray-500 text-sm">
//               Thousands of happy customers dine with us every month.
//             </p>
//           </div>

//           <div>
//             <h4 className="font-semibold text-lg">Instant Confirmation</h4>
//             <p className="text-gray-500 text-sm">
//               Get real-time booking confirmation immediately.
//             </p>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

