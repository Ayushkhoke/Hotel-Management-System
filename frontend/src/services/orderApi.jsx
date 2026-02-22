import { toast } from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { order } from "./apis";
import { setOrder,setOrderItem,setCancelOrder } from "../slices/orderSlice";
import {setLoading} from '../slices/authSlice'
export function placeOrder(data, token) {
  return async (dispatch) => {
      dispatch(setLoading(true));
    try {
      const res = await apiConnector(
        "POST",
        order.CREATE_ORDER_API,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Failed to place order");
      }

      toast.success("Order placed successfully");

      // ✅ Dispatch to Redux
      dispatch(setOrder(res.data.data));

      return res.data.data;

    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to place order"
      );
    
    }
       finally {
            dispatch(setLoading(false)); 
          }
  };
}



// export function getMyOrders(orderId, token) {
//   return async (dispatch) => {
//     try {
//       const res = await apiConnector(
//         "POST",
//         order.GET_MY_ORDERS_API,
//         { orderId },
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );

//       if (!res?.data?.success) {
//         throw new Error(res?.data?.message || "Failed to fetch orders");
//       }

//       toast.success("Orders fetched successfully");

//       return res.data.data;

//     } catch (error) {
//       console.error("GET ORDER ERROR:", error);
//       toast.error(
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to fetch orders"
//       );
//       return [];
//     }
//   };
// }


export function getMyOrders(token) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "GET",                        // ✅ GET request
        order.GET_MY_ORDERS_API,      // e.g. "/api/v1/order/my-orders"
        null,                         // ✅ No body
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Failed to fetch orders");
      }

      // Save orders in redux
      dispatch(setOrder(res.data.data));

      return res.data.data;

    } catch (error) {
      console.error("GET ORDER ERROR:", error);

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch orders"
      );

      return [];
    }
  };
}


// export function cancelOrder(orderId, token) {
//   return async (dispatch) => {
//     try {
//       const res = await apiConnector(
//         "POST",
//         order.CANCEL_ORDER_API,
//         { order_id: orderId },
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );

//       if (!res?.data?.success) {
//         throw new Error(res?.data?.message || "Failed to cancel order");
//       }

//       toast.success("Order cancelled successfully");

//       return res.data.data;

//     } catch (error) {
//       console.error("CANCEL ORDER ERROR:", error);
//       toast.error(
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to cancel order"
//       );
//       return null;
//     }
//   };
// }
