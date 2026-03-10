// services/tablebookingApi.js


// export const bookTable = (data, token) => {
//   return async (dispatch) => {
//     try {
//       const response = await apiConnector(
//         "POST",
//         tableBooking.BOOK_TABLE_API,
//         data,
//         {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         }
//       );

//       if (!response?.data?.success) {
//         throw new Error(response?.data?.message);
//       }

//       dispatch(setTablebooked(response.data.data));

//       toast.success("successfully bboked the table");
    
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//         error.message ||
//         "Booking failed"
//       );
//     }
//   };
// };


import { toast } from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { tableBooking } from "./apis";
import { setTablebooked } from "../slices/tableSlice";

import { setTablebookings } from "../slices/tableSlice";
export const bookTable = (data, token) => {
  return async (dispatch) => {
    try {
      console.log("=== BOOKING TABLE ===");
      console.log("Data being sent:", data);
      console.log("Token:", token ? "Present" : "Missing");
      
      const response = await apiConnector(
        "POST",
        tableBooking.BOOK_TABLE_API,
        data,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      console.log("Response received:", response?.data);

      if (!response?.data?.success) {
        const errorMsg = response?.data?.message || "Booking failed";
        console.error("Booking failed:", errorMsg);
        throw new Error(errorMsg);
      }

      dispatch(setTablebooked(response.data.data));
      toast.success("Table booked successfully");

      console.log("Booking successful:", response.data.data);
      return response.data.data;

    } catch (error) {
      console.error("=== BOOKING ERROR ===");
      console.error("Full error:", error);
      console.error("Error response:", error?.response?.data);
      
      const errorMsg = error?.response?.data?.message || error.message || "Booking failed";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };
};



export const getMyTableBookings = (token) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "GET",
        tableBooking.GET_TABLEBOOKING_API,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to fetch bookings");
      }

      console.log("GET BOOKINGS RESPONSE:", response.data.data);

      dispatch(setTablebookings(response.data.data || []));

      return response.data.data;

    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message || "Unable to fetch bookings";
      toast.error(errorMsg);
      return [];
    }
  };
};

export const cancelTableBooking = (tablebooking_id, token) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "PUT",
        tableBooking.CANCEL_TABLE_BOOKING_API,
        { tablebooking_id },
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Cancel failed");
      }

      toast.success(response?.data?.message || "Booking cancelled successfully");

      // Refresh bookings to immediately reflect cancelled state in UI
      await dispatch(getMyTableBookings(token));

      return response?.data?.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error.message || "Cancel failed";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };
};




// export const cancelTableBooking = (data, token) => {
//   return async (dispatch) => {
//     try {
//       const response = await apiConnector(
//         "POST",
//         tableBooking.CANCEL_TABLE_BOOKING_API,
//         data,
//         {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         }
//       );

//       if (!response?.data?.success) {
//         throw new Error(response?.data?.message);
//       }

//       toast.success(response.data.message);

//       // 🔥 Refresh bookings after cancel
//       dispatch(getMyTableBookings(token));
//      toast.success("cancel the table booking");
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//         error.message ||
//         "Cancel failed"
//       );
//     }
//   };
// };
