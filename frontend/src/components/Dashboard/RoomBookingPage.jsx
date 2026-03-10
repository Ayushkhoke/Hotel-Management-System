// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import RoomBooking from "./RoomBooking";

// export default function RoomBookingPage() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const room = location.state?.room;
//   const roomImages = useMemo(() => {
//     if (Array.isArray(room?.images) && room.images.length) {
//       return room.images.filter(Boolean);
//     }

//     if (room?.image) {
//       return [room.image];
//     }

//     return [];
//   }, [room]);
//   const [selectedImage, setSelectedImage] = useState(roomImages[0] || "");
//   const [showBookingModal, setShowBookingModal] = useState(false);

//   if (!room) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">No room selected for booking.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8 md:py-12">
//       <div className="max-w-6xl mx-auto">
//         <button
//           onClick={() => navigate(-1)}
//           className="mb-4 text-sm text-green-700 font-semibold hover:underline"
//         >
//           Back to Rooms
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//             <img
//               src={
//                 selectedImage ||
//                 "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
//               }
//               alt={`Room ${room.roomNumber}`}
//               className="w-full h-72 md:h-96 object-cover rounded-lg"
//             />

//             {!!roomImages.length && (
//               <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
//                 {roomImages.map((img, index) => (
//                   <button
//                     key={`${img}-${index}`}
//                     onClick={() => setSelectedImage(img)}
//                     className={`rounded overflow-hidden border-2 ${
//                       selectedImage === img ? "border-green-600" : "border-transparent"
//                     }`}
//                   >
//                     <img
//                       src={img}
//                       alt={`Room ${room.roomNumber} ${index + 1}`}
//                       className="w-full h-16 object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h1 className="text-2xl font-bold text-gray-900">Room {room.roomNumber}</h1>
//             <p className="text-gray-600 mt-1">{room.type} • Capacity {room.capacity}</p>
//             <p className="text-3xl font-bold text-green-700 mt-4">${room.pricePerNight}</p>
//             <p className="text-sm text-gray-500">per night</p>

//             <button
//               onClick={() => setShowBookingModal(true)}
//               disabled={!room.isAvailable}
//               className="mt-6 w-full bg-green-600 text-white py-2.5 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {room.isAvailable ? "Book This Room" : "Currently Unavailable"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showBookingModal && (
//         <RoomBooking room={room} onClose={() => setShowBookingModal(false)} />
//       )}
//     </div>
//   );
// }



import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomBooking from "./RoomBooking";
import { ArrowLeft, Users, BedDouble } from "lucide-react";

export default function RoomBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state?.room;

  const roomImages = useMemo(() => {
    if (Array.isArray(room?.images) && room.images.length) {
      return room.images.filter(Boolean);
    }
    if (room?.image) return [room.image];
    return [];
  }, [room]);

  const [selectedImage, setSelectedImage] = useState(roomImages[0] || "");
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No room selected
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
            "url('https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?auto=format&fit=crop&w=1600&q=80')",
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
          Back to Rooms
        </button>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-5 sm:gap-8">

          {/* IMAGE GALLERY */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-3 sm:p-4 shadow-xl">

            <img
              src={
                selectedImage ||
                "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
              }
              alt={`Room ${room.roomNumber}`}
              className="w-full h-60 sm:h-80 md:h-96 object-cover rounded-xl transition hover:scale-[1.02]"
            />

            {!!roomImages.length && (
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                {roomImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === img
                        ? "border-amber-400"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Room ${room.roomNumber} ${index + 1}`}
                      className="w-full h-14 sm:h-20 object-cover hover:opacity-80"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ROOM INFO CARD */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5 sm:p-8 shadow-xl text-white">

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Room {room.roomNumber}
            </h1>

            <p className="text-gray-300 flex items-center gap-2 mb-4">
              <BedDouble size={18} />
              {room.type}
            </p>

            <p className="text-gray-300 flex items-center gap-2 mb-6">
              <Users size={18} />
              Capacity {room.capacity}
            </p>

            {/* Price */}
            <div className="mb-8">
              <p className="text-3xl sm:text-4xl font-bold text-amber-400">
                ${room.pricePerNight}
              </p>
              <p className="text-sm text-gray-400">per night</p>
            </div>

            {/* Amenities */}
            <div className="mb-8 text-sm text-gray-300 space-y-1">
              <p>✔ Free WiFi</p>
              <p>✔ Air Conditioning</p>
              <p>✔ Smart TV</p>
              <p>✔ Breakfast Included</p>
            </div>

            {/* Booking Button */}
            <button
              onClick={() => setShowBookingModal(true)}
              disabled={!room.isAvailable}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold py-3 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-50"
            >
              {room.isAvailable
                ? "Reserve This Room"
                : "Currently Unavailable"}
            </button>
          </div>

        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <RoomBooking
          room={room}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}