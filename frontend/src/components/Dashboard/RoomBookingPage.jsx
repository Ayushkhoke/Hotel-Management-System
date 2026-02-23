import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RoomBooking from "./RoomBooking";

export default function RoomBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state?.room;

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No room selected for booking.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20">
      <RoomBooking
        room={room}
      />
    </div>
  );
}
