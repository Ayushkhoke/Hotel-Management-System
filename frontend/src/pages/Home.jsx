// import React from 'react'

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* Hero Section */}
//       <section className="bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center h-[70vh] flex items-center justify-center">
//         <div className="bg-black/60 p-8 rounded-lg text-center text-white">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Welcome to Grand Stay Hotel
//           </h1>
//           <p className="text-lg mb-6">
//             Comfort â€¢ Luxury â€¢ Exceptional Service
//           </p>
//           <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded">
//             Book Now
//           </button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-12 px-6 max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-10">
//           Why Choose Us
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2">Luxury Rooms</h3>
//             <p className="text-gray-600">
//               Spacious, elegant rooms designed for maximum comfort.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
//             <p className="text-gray-600">
//               Our staff is always available to assist you.
//             </p>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
//             <p className="text-gray-600">
//               Located near major attractions and business cente$ //             </p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="bg-gray-800 text-white py-12 text-center">
//         <h2 className="text-3xl font-bold mb-4">
//           Ready to Book Your Stay?
//         </h2>
//         <p className="mb-6">
//           Experience luxury and comfort like never before.
//         </p>
//         <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded">
//           Get Started
//         </button>
//       </section>

//     </div>
//   )
// }



import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
// import AIChat from "./AiComponent";
export default function Home() {
  // Keep destination in one place so map embed, search, and navigation always match.
  const destinationAddress =
    "Banjara's Chulla, Shankarpur Road, New Khapri, Nagpur, Maharashtra 441108";

  // ðŸ”¥ Animated Counters
  const [guests, setGuests] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [userPosition, setUserPosition] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  function openDirectionsWithOrigin(origin) {
    const originParam = `${origin.lat},${origin.lng}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originParam)}&destination=${encodeURIComponent(destinationAddress)}`;
    window.open(directionsUrl, "_blank", "noopener,noreferrer");
  }

  function handleLiveNavigation() {
    if (!navigator.geolocation) {
      setLocationError("Live location is not supported in this browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUserPosition(current);
        setLocationLoading(false);
        openDirectionsWithOrigin(current);
      },
      (error) => {
        let message = "Unable to fetch your current location.";

        if (error.code === 1) {
          message = "Location permission denied. Please allow location access to start navigation.";
        } else if (error.code === 2) {
          message = "Location unavailable. Please ensure GPS/network location is enabled.";
        } else if (error.code === 3) {
          message = "Location request timed out. Please try again.";
        }

        setLocationLoading(false);
        setLocationError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  useEffect(() => {
    let guestTarget = 12500;
    let bookingTarget = 8200;
    let roomTarget = 150;

    let interval = setInterval(() => {
      setGuests((prev) => (prev < guestTarget ? prev + 125 : guestTarget));
      setBookings((prev) => (prev < bookingTarget ? prev + 80 : bookingTarget));
      setRooms((prev) => (prev < roomTarget ? prev + 2 : roomTarget));
    }, 30);

    setTimeout(() => {
      clearInterval(interval);
      setGuests(guestTarget);
      setBookings(bookingTarget);
      setRooms(roomTarget);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Scroll Animation Setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationType = entry.target.getAttribute("data-animation");
          entry.target.classList.add(animationType);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-6">
            Grand Stay Hotel
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Where Elegance Meets Exceptional Comfort
          </p>
         <Link to="/signup">
  <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition duration-300">
    Reserve Your Stay
  </button>
</Link>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">

          <div>
            <h2 className="text-4xl font-semibold">
              {guests.toLocaleString()}+
            </h2>
            <p className="text-gray-500 mt-2 tracking-wide">
              Happy Guests
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-semibold">
              {bookings.toLocaleString()}+
            </h2>
            <p className="text-gray-500 mt-2 tracking-wide">
              Successful Bookings
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-semibold">
              {rooms}+
            </h2>
            <p className="text-gray-500 mt-2 tracking-wide">
              Luxury Rooms
            </p>
          </div>

        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-20">
            <h2 className="text-4xl font-light tracking-wide">
              A Refined Hospitality Experience
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Discover unmatched comfort, exceptional dining, and serene relaxation
              crafted for discerning travelers.
            </p>
          </div>

          {/* EXPERIENCE 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">

            <div className="animate-on-scroll" data-animation="slide-left">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Suite"
                className="rounded-3xl shadow-xl"
              />
            </div>

            <div className="animate-on-scroll" data-animation="fade-up">
              <h3 className="text-3xl font-light mb-6">
                Presidential Luxury Suites
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our suites redefine elegance with expansive interiors, private
                balconies, and panoramic views designed to elevate your stay.
              </p>
            </div>

          </div>

          {/* EXPERIENCE 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">

            <div className="order-2 md:order-1 animate-on-scroll" data-animation="fade-up">
              <h3 className="text-3xl font-light mb-6">
                Award-Winning Fine Dining
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Indulge in world-class cuisine curated by renowned chefs,
                blending international flavors with exquisite presentation.
              </p>
            </div>

            <div className="order-1 md:order-2 animate-on-scroll" data-animation="slide-right">
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80"
                alt="Fine Dining"
                className="rounded-3xl shadow-xl"
              />
            </div>

          </div>

          {/* EXPERIENCE 3 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="animate-on-scroll" data-animation="slide-left">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Spa"
                className="rounded-3xl shadow-xl"
              />
            </div>

            <div className="animate-on-scroll" data-animation="fade-up">
              <h3 className="text-3xl font-light mb-6">
                Wellness & Spa Retreat
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Escape into tranquility with our luxury spa therapies,
                rejuvenating treatments, and serene relaxation spaces.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="py-24 bg-[#f8f6f2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-light tracking-wide">Find Us</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Visit Grand Stay Hotel at the heart of the city. You can locate us directly from the map below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-xl border border-gray-200 min-h-85 bg-white">
              <iframe
                title="Grand Stay Hotel Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(destinationAddress)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-85 md:h-105 border-0"
              />
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-7 flex flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">Hotel Address</p>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Grand Stay Hotel</h3>
                <p className="text-gray-600 leading-relaxed">
                  {destinationAddress}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationAddress)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition duration-300"
              >
                Open In Google Maps
              </a>

              <button
                type="button"
                onClick={handleLiveNavigation}
                disabled={locationLoading}
                className="mt-3 inline-flex items-center justify-center bg-amber-600 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-700 transition duration-300 disabled:opacity-60"
              >
                {locationLoading ? "Fetching Live Location..." : "Use Live Location And Navigate"}
              </button>

              {userPosition && (
                <p className="mt-3 text-xs text-gray-500">
                  Live location detected: {userPosition.lat.toFixed(5)}, {userPosition.lng.toFixed(5)}
                </p>
              )}

              {locationError && (
                <p className="mt-2 text-xs text-red-600">{locationError}</p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* <AIChat/> */}

    </div>
  );
}


