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
      const response = await apiConnector(
        "POST",
        tableBooking.BOOK_TABLE_API,
        data,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      dispatch(setTablebooked(response.data.data));


      toast.success("Table booked successfully");

      return  response.data.data ;  // 🔥 IMPORTANT

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Booking failed"
      );
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
        throw new Error(response?.data?.message);
      }

      console.log("GET BOOKINGS RESPONSE:", response.data.data);

      dispatch(setTablebookings(response.data.data));

      return response.data.data;

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Unable to fetch bookings"
      );
      return null;
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
