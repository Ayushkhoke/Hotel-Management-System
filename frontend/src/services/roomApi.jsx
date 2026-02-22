import{apiConnector} from './apiconnector'
import {toast} from 'react-hot-toast';
import {room} from './apis';
import { setLoading } from "../slices/authSlice";
import {setRooms,setRoom,setEditRoom,clearRoom} from '../slices/roomSlice'
/* CREATE ROOM */
export function createRoom(data, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector(
        "POST",
        room.CREATE_ROOM_API,
        data,
        { Authorization: `Bearer ${token}` }
      );

      if (!res.data.success){
        throw new Error(res.data.message)
      }

      toast.success("Room created");
      dispatch(clearRoom());
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
    }
     dispatch(setLoading(false));

  };
 }

/* UPDATE ROOM */
// export function updateRoom(roomid, data, token) {
//   return async (dispatch) => {
//     try {
//       const res = await apiConnector(
//         "PUT",
//         room.GET_ROOM_API,
//         { ...data, roomid },
//         { Authorization: `Bearer ${token}` }
//       );

//       if (!res.data.success) throw new Error(res.data.message);

//       toast.success("Room updated");
//       dispatch(setEditRoom(false));
//       dispatch(setRoom(res.data.updatedRoom));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };
// }

// /* DELETE ROOM */
// export function deleteRoom(roomid, token) {
//   return async () => {
//     try {
//       const res = await apiConnector(
//         "DELETE",
//         room.UPDATE_ROOM_API,
//         { roomid },
//         { Authorization: `Bearer ${token}` }
//       );

//       if (!res.data.success) throw new Error(res.data.message);

//       toast.success("Room deleted");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };
// }


//get all romm
export function updateRoom(formData, token) {
  return async (dispatch) => {
    try {


      const res = await apiConnector(
        "PUT",
        room.UPDATE_ROOM_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      dispatch(getAllRooms(token));
      dispatch(setRoom(res.data.room));
      dispatch(setEditRoom(false));

      toast.success("Room updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Room update failed"
      );
    }
  };
}



export function getAllRooms(token) {
  return async (dispatch) => {
    let result = [];

    try {
      const headers = {
        Authorization: `Bearer ${token}`, // optional if public
      };

      const res = await apiConnector(
        "GET",
        room.GET_ROOM_API,
        null, // ✅ no body for GET
        headers
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      result = res.data.rooms; // ✅ match backend key
      dispatch(setRooms(result));

    } catch (error) {
      console.log("Error fetching rooms", error);
      toast.error("Could not get rooms");
    }
  };
}



export function deleteRoom(roomid, token) {
  return async (dispatch) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await apiConnector(
        "DELETE",                     // backend uses POST
        room.DELETE_ROOM_API,       // /api/v1/room/deleteroom
        { roomid },                 // body
        headers
      );

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Room deleted successfully");

      // refresh room list
      dispatch(getAllRooms(token));

    } catch (error) {
      console.log("DELETE ROOM ERROR", error);
      toast.error("Could not delete room");
    }
  };
}
