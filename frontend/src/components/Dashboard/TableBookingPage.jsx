import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableBooking from "./tablebooking/tablebooking";

export default function TableBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const table = location.state?.table;

  if (!table) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No table selected for booking.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20">
      <TableBooking
        tableId={table._id}
      />
    </div>
  );
}
