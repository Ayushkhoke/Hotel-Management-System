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
      throw new Error(res.data.message || "Booking failed");
    }

    toast.success("Successfully booked the room 🎉");

    return res.data.booking; // ✅ correct according to backend
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "Booking failed";
    toast.error(errorMsg);
    throw new Error(errorMsg); // Properly throw so caller knows it failed
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
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await apiConnector(
      "DELETE",
      `${booking.DELETE_BOOKING_API}/${bookingId}`,
      null,
      headers
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success(res?.data?.message || "Booking cancelled successfully");
    return true;
  } catch (error) {
    // Backward compatibility for deployed servers still using DELETE /deletebooking with bookingId in body.
    if (error?.response?.status === 404) {
      try {
        const fallbackRes = await apiConnector(
          "DELETE",
          booking.DELETE_BOOKING_API,
          { bookingId },
          headers
        );

        if (!fallbackRes?.data?.success) {
          throw new Error(fallbackRes?.data?.message || "Failed to cancel booking");
        }

        toast.success(fallbackRes?.data?.message || "Booking cancelled successfully");
        return true;
      } catch (fallbackError) {
        const fallbackMessage =
          fallbackError?.response?.data?.message ||
          fallbackError?.message ||
          "Failed to cancel booking";
        toast.error(fallbackMessage);
        throw new Error(fallbackMessage);
      }
    }

    const message = error?.response?.data?.message || error?.message || "Failed to cancel booking";
    toast.error(message);
    throw new Error(message);
  }
}
