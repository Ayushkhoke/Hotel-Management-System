
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],       // all rooms
  room: null,      // single room
  editRoom: false,
}


const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms(state, action) {
      state.rooms = action.payload;
    },
    setRoom(state, action) {
      state.room = action.payload;
    },
    setEditRoom(state, action) {
      state.editRoom = action.payload;
    },
    clearRoom(state) {
      state.room = null;
      state.editRoom = false;
    },
    
  },
});

export const {
  setRooms,
  setRoom,
  setEditRoom,
  clearRoom,
} = roomSlice.actions;

export default roomSlice.reducer;