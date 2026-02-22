import { apiConnector } from "./apiconnector";
import {toast} from 'react-hot-toast'
import {booking} from './apis'
import { setbooking } from "../slices/bookingSlice";




export async function bookRoom(data, token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await apiConnector(
      "POST",
      booking.ROOM_BOOK_API,
      data,
      headers
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("Successfully booked the room 🎉");

    return res.data.booking // ✅ correct according to backend
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Booking failed"
    );
  }
}


export function getMyBookings(token) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "GET",
        booking.GET_MY_BOOKINGS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      dispatch(setbooking(res.data.bookings));

    } catch (error) {
      toast.error("Failed to fetch bookings");
      console.error("GET BOOKINGS ERROR:", error);
    }
  };
}



export async function deleteBooking(bookingId, token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await apiConnector(
      "DELETE",
      booking.DELETE_BOOKING_API,
      { bookingId },
      headers
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("Booking deleted successfully");

    return true;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to delete booking"
    );
  }
}
