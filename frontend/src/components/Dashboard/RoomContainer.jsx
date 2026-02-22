// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createRoom,
//   getAllRooms,
//   updateRoom,
//   deleteRoom
//   // make sure this exists in roomApi
// } from "../../services/roomApi";

// import {useState,useEffect} from 'react';
// import { setRoom, setEditRoom } from "../../slices/roomSlice";
// import Upload from "./Upload";

// export default function RoomContainer() {
//   const { token } = useSelector((state) => state.auth);
//   const { rooms, room, editRoom } = useSelector((state) => state.room);

//   const dispatch = useDispatch();

//   const [formdata, setFormdata] = useState({
//     roomNumber: "",
//     type: "",
//     capacity: "",
//     pricePerNight: "",
//     isAvailable: true,
//     image: null,
//   });

//   function changeHandler(e) {
//     const { name, value, type, checked } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("roomNumber", formdata.roomNumber);
//     data.append("type", formdata.type);
//     data.append("capacity", formdata.capacity);
//     data.append("pricePerNight", formdata.pricePerNight);
//     data.append("isAvailable", formdata.isAvailable);

//     if (formdata.image) data.append("image", formdata.image);

//     if (editRoom && room?._id) {
//       data.set("roomid", room._id); // overwrites instead of stacking

//         dispatch(updateRoom( data, token));
//     } else {
//       dispatch(createRoom(data, token));
//     }
//   }

//   function editHandler(selectedRoom) {
//     dispatch(setRoom(selectedRoom));
//     dispatch(setEditRoom(true));

//     setFormdata({
//       roomNumber: selectedRoom.roomNumber,
//       type: selectedRoom.type,
//       capacity: selectedRoom.capacity,
//       pricePerNight: selectedRoom.pricePerNight,
//       isAvailable: selectedRoom.isAvailable,
//       image: null,
//     });
//   }

//   function deletehandler(roomid){
// dispatch(deleteRoom(roomid, token));
//   }
//   useEffect(() => {
//     if (token){
// dispatch(getAllRooms(token));
//     } 
//   }, [dispatch, token]);

//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       {/* HEADER */}
//       <div className="mb-10">
//         <h1 className="text-3xl font-semibold text-slate-800">
//           Room Management
//         </h1>
//         <p className="text-slate-500 mt-1">
//           Manage hotel rooms and availability
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* ROOM LIST */}
//         <div className="lg:col-span-2 space-y-4">
//           {rooms.map((r) => (
//             <div
//               key={r._id}
//               className={`flex items-center justify-between bg-white border rounded-lg p-5
//               ${
//                 room?._id === r._id
//                   ? "border-blue-500"
//                   : "border-slate-200"
//               }
//               hover:shadow-sm transition`}
//             >
//               <div className="flex items-center gap-4">
//                 {r.image && (
//                   <img
//                     src={r.image}
//                     alt="room"
//                     className="w-20 h-14 object-cover rounded-md border"
//                   />
//                 )}

//                 <div>
//                   <p className="text-lg font-medium text-slate-800">
//                     Room {r.roomNumber}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     {r.type} • Capacity {r.capacity}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     ₹{r.pricePerNight} / night
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium
//                     ${
//                       r.isAvailable
//                         ? "bg-emerald-50 text-emerald-700"
//                         : "bg-red-50 text-red-700"
//                     }`}
//                 >
//                   {r.isAvailable ? "Available" : "Booked"}
//                 </span>

//                 <button
//                   onClick={() => editHandler(r)}
//                   className="text-blue-600 text-sm font-medium hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button  onClick={() => deletehandler(r._id)}
//   className="text-red-600 text-sm font-medium hover:underline">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* FORM */}
//         <div className="bg-white border border-slate-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-slate-800 mb-6">
//             {editRoom ? "Edit Room" : "Create Room"}
//           </h2>

//           <form onSubmit={submitHandler} className="space-y-4">
//             <div>
//               <label className="block text-sm text-slate-600 mb-1">
//                 Room Number
//               </label>
//               <input
//                 name="roomNumber"
//                 value={formdata.roomNumber}
//                 onChange={changeHandler}
//                 className="w-full border border-slate-300 rounded-md px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-slate-600 mb-1">
//                 Room Type
//               </label>
//               <input
//                 name="type"
//                 placeholder="Deluxe / Suite"
//                 value={formdata.type}
//                 onChange={changeHandler}
//                 className="w-full border border-slate-300 rounded-md px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-slate-600 mb-1">
//                 Capacity
//               </label>
//               <input
//                 type="number"
//                 name="capacity"
//                 value={formdata.capacity}
//                 onChange={changeHandler}
//                 className="w-full border border-slate-300 rounded-md px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-slate-600 mb-1">
//                 Price Per Night
//               </label>
//               <input
//                 type="number"
//                 name="pricePerNight"
//                 value={formdata.pricePerNight}
//                 onChange={changeHandler}
//                 className="w-full border border-slate-300 rounded-md px-3 py-2"
//               />
//             </div>

//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 name="isAvailable"
//                 checked={formdata.isAvailable}
//                 onChange={changeHandler}
//               />
//               Available
//             </label>

//             <Upload
//               label="Room Image"
//               onChange={(file) =>
//                 setFormdata((prev) => ({
//                   ...prev,
//                   image: file,
//                 }))
//               }
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md
//               font-medium hover:bg-blue-700 transition"
//             >
//               {editRoom ? "Update Room" : "Create Room"}
//             </button>


//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createRoom,
//   getAllRooms,
//   updateRoom,
//   deleteRoom,
// } from "../../services/roomApi";
// import { setRoom, setEditRoom } from "../../slices/roomSlice";
// import Upload from "./Upload";

// export default function RoomContainer() {
//   const { token,user } = useSelector((state) => state.auth);
//   const { rooms, room, editRoom } = useSelector((state) => state.room);
//   const dispatch = useDispatch();

//   const [searchRoomNo, setSearchRoomNo] = useState("");

//   const [formdata, setFormdata] = useState({
//     roomNumber: "",
//     type: "",
//     capacity: "",
//     pricePerNight: "",
//     isAvailable: true,
//     image: null,
//   });

//   function changeHandler(e) {
//     const { name, value, type, checked } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("roomNumber", formdata.roomNumber);
//     data.append("type", formdata.type);
//     data.append("capacity", formdata.capacity);
//     data.append("pricePerNight", formdata.pricePerNight);
//     data.append("isAvailable", formdata.isAvailable);
//     if (formdata.image) data.append("image", formdata.image);

//     if (editRoom && room?._id) {
//       data.set("roomid", room._id);
//       dispatch(updateRoom(data, token));
//     } else {
//       dispatch(createRoom(data, token));
//     }
//   }

//   function editHandler(selectedRoom) {
//     dispatch(setRoom(selectedRoom));
//     dispatch(setEditRoom(true));

//     setFormdata({
//       roomNumber: selectedRoom.roomNumber,
//       type: selectedRoom.type,
//       capacity: selectedRoom.capacity,
//       pricePerNight: selectedRoom.pricePerNight,
//       isAvailable: selectedRoom.isAvailable,
//       image: null,
//     });
//   }

//   function deletehandler(roomid) {
//     dispatch(deleteRoom(roomid, token));
//   }

//   useEffect(() => {
//     if (token) {
//       dispatch(getAllRooms(token));
//     }
//   }, [dispatch, token]);

//   // 🔍 FILTER LOGIC
//   const filteredRooms = rooms.filter((r) =>
//     r.roomNumber.toString().includes(searchRoomNo)
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-semibold text-slate-800">
//           Room Management
//         </h1>
//         <p className="text-slate-500 mt-1">
//           Manage hotel rooms and availability
//         </p>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Room Number..."
//           value={searchRoomNo}
//           onChange={(e) => setSearchRoomNo(e.target.value)}
//           className="w-full border border-slate-300 rounded-md px-4 py-2"
//         />
//       </div>
//  {user?.accountType === "Admin" && (
//   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//     {/* ROOM LIST */}
//     <div className="lg:col-span-2 space-y-4">
//       {filteredRooms.map((r) => (
//         <div
//           key={r._id}
//           className={`flex items-center justify-between bg-white border rounded-lg p-5
//           ${
//             room?._id === r._id
//               ? "border-blue-500"
//               : "border-slate-200"
//           }`}
//         >
//           <div className="flex items-center gap-4">
//             {r.image && (
//               <img
//                 src={r.image}
//                 alt="room"
//                 className="w-20 h-14 object-cover rounded-md border"
//               />
//             )}

//             <div>
//               <p className="text-lg font-medium text-slate-800">
//                 Room {r.roomNumber}
//               </p>
//               <p className="text-sm text-slate-500">
//                 {r.type} • Capacity {r.capacity}
//               </p>
//               <p className="text-sm text-slate-500">
//                 ₹{r.pricePerNight} / night
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <span
//               className={`px-3 py-1 rounded-full text-sm font-medium
//               ${
//                 r.isAvailable
//                   ? "bg-emerald-50 text-emerald-700"
//                   : "bg-red-50 text-red-700"
//               }`}
//             >
//               {r.isAvailable ? "Available" : "Booked"}
//             </span>

//             <button
//               onClick={() => editHandler(r)}
//               className="text-blue-600 text-sm font-medium"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => deletehandler(r._id)}
//               className="text-red-600 text-sm font-medium"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}

//       {filteredRooms.length === 0 && (
//         <p className="text-center text-slate-500">No rooms found</p>
//       )}
//     </div>

//     {/* FORM */}
//     <div className="bg-white border border-slate-200 rounded-lg p-6">
//       <h2 className="text-xl font-semibold text-slate-800 mb-6">
//         {editRoom ? "Edit Room" : "Create Room"}
//       </h2>

//       <form onSubmit={submitHandler} className="space-y-4">
//         <input
//           name="roomNumber"
//           placeholder="Room Number"
//           value={formdata.roomNumber}
//           onChange={changeHandler}
//           className="w-full border rounded-md px-3 py-2"
//         />

//         <input
//           name="type"
//           placeholder="Room Type"
//           value={formdata.type}
//           onChange={changeHandler}
//           className="w-full border rounded-md px-3 py-2"
//         />

//         <input
//           type="number"
//           name="capacity"
//           placeholder="Capacity"
//           value={formdata.capacity}
//           onChange={changeHandler}
//           className="w-full border rounded-md px-3 py-2"
//         />

//         <input
//           type="number"
//           name="pricePerNight"
//           placeholder="Price Per Night"
//           value={formdata.pricePerNight}
//           onChange={changeHandler}
//           className="w-full border rounded-md px-3 py-2"
//         />

//         <label className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             name="isAvailable"
//             checked={formdata.isAvailable}
//             onChange={changeHandler}
//           />
//           Available
//         </label>

//         <Upload
//           label="Room Image"
//           onChange={(file) =>
//             setFormdata((prev) => ({ ...prev, image: file }))
//           }
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md"
//         >
//           {editRoom ? "Update Room" : "Create Room"}
//         </button>
//       </form>
//     </div>
//   </div>
// )}

    
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createRoom,
//   getAllRooms,
//   updateRoom,
//   deleteRoom,
// } from "../../services/roomApi";
// import { setRoom, setEditRoom } from "../../slices/roomSlice";
// import Upload from "./Upload";

// export default function RoomContainer() {
//   const { token, user } = useSelector((state) => state.auth);
//   const { rooms, room, editRoom } = useSelector((state) => state.room);
//   const dispatch = useDispatch();

//   const [searchRoomNo, setSearchRoomNo] = useState("");

//   const [formdata, setFormdata] = useState({
//     roomNumber: "",
//     type: "",
//     capacity: "",
//     pricePerNight: "",
//     isAvailable: true,
//     image: null,
//   });

//   // ---------------- HANDLERS ----------------

//   function changeHandler(e) {
//     const { name, value, type, checked } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("roomNumber", formdata.roomNumber);
//     data.append("type", formdata.type);
//     data.append("capacity", formdata.capacity);
//     data.append("pricePerNight", formdata.pricePerNight);
//     data.append("isAvailable", formdata.isAvailable);
//     if (formdata.image) data.append("image", formdata.image);

//     if (editRoom && room?._id) {
//       data.append("roomid", room._id);
//       dispatch(updateRoom(data, token));
//     } else {
//       dispatch(createRoom(data, token));
//     }

//     // reset
//     setFormdata({
//       roomNumber: "",
//       type: "",
//       capacity: "",
//       pricePerNight: "",
//       isAvailable: true,
//       image: null,
//     });
//     dispatch(setEditRoom(false));
//   }

//   function editHandler(selectedRoom) {
//     dispatch(setRoom(selectedRoom));
//     dispatch(setEditRoom(true));

//     setFormdata({
//       roomNumber: selectedRoom.roomNumber,
//       type: selectedRoom.type,
//       capacity: selectedRoom.capacity,
//       pricePerNight: selectedRoom.pricePerNight,
//       isAvailable: selectedRoom.isAvailable,
//       image: null,
//     });
//   }

//   function deletehandler(roomid) {
//     dispatch(deleteRoom(roomid, token));
//   }

//   // ---------------- EFFECT ----------------

//   useEffect(() => {
//     if (token) {
//       dispatch(getAllRooms(token));
//     }
//   }, [dispatch, token]);

//   // ---------------- FILTER ----------------

//   const filteredRooms = rooms.filter((r) =>
//     r.roomNumber.toString().includes(searchRoomNo)
//   );

//   // ---------------- UI ----------------

//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-semibold text-slate-800">
//           Room Management
//         </h1>
//         <p className="text-slate-500 mt-1">
//           View rooms and availability
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Room Number..."
//           value={searchRoomNo}
//           onChange={(e) => setSearchRoomNo(e.target.value)}
//           className="w-full border border-slate-300 rounded-md px-4 py-2"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* ROOM LIST (ADMIN + USER) */}
//         <div className="lg:col-span-2 space-y-4">
//           {filteredRooms.map((r) => (
//             <div
//               key={r._id}
//               className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-5"
//             >
//               <div className="flex items-center gap-4">
//                 {r.image && (
//                   <img
//                     src={r.image}
//                     alt="room"
//                     className="w-20 h-14 object-cover rounded-md border"
//                   />
//                 )}

//                 <div>
//                   <p className="text-lg font-medium text-slate-800">
//                     Room {r.roomNumber}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     {r.type} • Capacity {r.capacity}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     ₹{r.pricePerNight} / night
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     r.isAvailable
//                       ? "bg-emerald-50 text-emerald-700"
//                       : "bg-red-50 text-red-700"
//                   }`}
//                 >
//                   {r.isAvailable ? "Available" : "Booked"}
//                 </span>

//                 {/* ADMIN ONLY ACTIONS */}
//                 {user?.accountType === "Admin" && (
//                   <>
//                     <button
//                       onClick={() => editHandler(r)}
//                       className="text-blue-600 text-sm font-medium"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deletehandler(r._id)}
//                       className="text-red-600 text-sm font-medium"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}

//           {filteredRooms.length === 0 && (
//             <p className="text-center text-slate-500">
//               No rooms found
//             </p>
//           )}
//         </div>

//         {/* ADMIN ONLY FORM */}
//         {user?.accountType === "Admin" && (
//           <div className="bg-white border border-slate-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-slate-800 mb-6">
//               {editRoom ? "Edit Room" : "Create Room"}
//             </h2>

//             <form onSubmit={submitHandler} className="space-y-4">
//               <input
//                 name="roomNumber"
//                 placeholder="Room Number"
//                 value={formdata.roomNumber}
//                 onChange={changeHandler}
//                 className="w-full border rounded-md px-3 py-2"
//                 required
//               />

//               <input
//                 name="type"
//                 placeholder="Room Type"
//                 value={formdata.type}
//                 onChange={changeHandler}
//                 className="w-full border rounded-md px-3 py-2"
//                 required
//               />

//               <input
//                 type="number"
//                 name="capacity"
//                 placeholder="Capacity"
//                 value={formdata.capacity}
//                 onChange={changeHandler}
//                 className="w-full border rounded-md px-3 py-2"
//                 required
//               />

//               <input
//                 type="number"
//                 name="pricePerNight"
//                 placeholder="Price Per Night"
//                 value={formdata.pricePerNight}
//                 onChange={changeHandler}
//                 className="w-full border rounded-md px-3 py-2"
//                 required
//               />

//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   name="isAvailable"
//                   checked={formdata.isAvailable}
//                   onChange={changeHandler}
//                 />
//                 Available
//               </label>

//               <Upload
//                 label="Room Image"
//                 onChange={(file) =>
//                   setFormdata((prev) => ({
//                     ...prev,
//                     image: file,
//                   }))
//                 }
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-md"
//               >
//                 {editRoom ? "Update Room" : "Create Room"}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createRoom,
//   getAllRooms,
//   updateRoom,
//   deleteRoom,
// } from "../../services/roomApi";
// import { setRoom, setEditRoom } from "../../slices/roomSlice";
// import Upload from "./Upload";
// import RoomBooking from "./RoomBooking";

// export default function RoomContainer() {
//   const { token, user } = useSelector((state) => state.auth);
//   const { rooms, room, editRoom } = useSelector((state) => state.room);
//   const dispatch = useDispatch();

//   const [searchRoomNo, setSearchRoomNo] = useState("");
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);

//   const [formdata, setFormdata] = useState({
//     roomNumber: "",
//     type: "",
//     capacity: "",
//     pricePerNight: "",
//     isAvailable: true,
//     image: null,
//   });

//   // ---------------- EFFECT ----------------

//   useEffect(() => {
//     if (token) {
//       dispatch(getAllRooms(token));
//     }
//   }, [dispatch, token]);

//   // ---------------- HANDLERS ----------------

//   function changeHandler(e) {
//     const { name, value, type, checked } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formdata).forEach((key) => {
//       if (formdata[key] !== null) {
//         data.append(key, formdata[key]);
//       }
//     });

//     if (editRoom && room?._id) {
//       data.append("roomid", room._id);
//       dispatch(updateRoom(data, token));
//     } else {
//       dispatch(createRoom(data, token));
//     }

//     setFormdata({
//       roomNumber: "",
//       type: "",
//       capacity: "",
//       pricePerNight: "",
//       isAvailable: true,
//       image: null,
//     });

//     dispatch(setEditRoom(false));
//   }

//   function editHandler(selectedRoom) {
//     dispatch(setRoom(selectedRoom));
//     dispatch(setEditRoom(true));

//     setFormdata({
//       roomNumber: selectedRoom.roomNumber,
//       type: selectedRoom.type,
//       capacity: selectedRoom.capacity,
//       pricePerNight: selectedRoom.pricePerNight,
//       isAvailable: selectedRoom.isAvailable,
//       image: null,
//     });
//   }

//   function deleteHandler(roomid) {
//     dispatch(deleteRoom(roomid, token));
//   }

//   const filteredRooms = rooms.filter((r) =>
//     r.roomNumber.toString().includes(searchRoomNo)
//   );

//   // ---------------- UI ----------------

//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       <h1 className="text-3xl font-semibold mb-6">Room Management</h1>

//       <input
//         type="text"
//         placeholder="Search by Room Number..."
//         value={searchRoomNo}
//         onChange={(e) => setSearchRoomNo(e.target.value)}
//         className="w-full border px-4 py-2 rounded-md mb-6"
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-4">
//           {filteredRooms.map((r) => (
//             <div
//               key={r._id}
//               className="flex justify-between items-center bg-white p-5 rounded-lg shadow"
//             >
//               <div className="flex items-center gap-4">
//                 {r.image && (
//                   <img
//                     src={r.image}
//                     alt="room"
//                     className="w-20 h-14 object-cover rounded"
//                   />
//                 )}

//                 <div>
//                   <p className="font-semibold text-lg">
//                     Room {r.roomNumber}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {r.type} • Capacity {r.capacity}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     ₹{r.pricePerNight} / night
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     r.isAvailable
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {r.isAvailable ? "Available" : "Booked"}
//                 </span>

//                 {/* USER BOOK BUTTON */}
//                 {user?.accountType !== "Admin" && r.isAvailable && (
//                   <button
//                     onClick={() => {
//                       setSelectedRoom(r);
//                       setShowBookingModal(true);
//                     }}
//                     className="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
//                   >
//                     Book Room
//                   </button>
//                 )}

//                 {/* ADMIN BUTTONS */}
//                 {user?.accountType === "Admin" && (
//                   <>
//                     <button
//                       onClick={() => editHandler(r)}
//                       className="text-blue-600 text-sm"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteHandler(r._id)}
//                       className="text-red-600 text-sm"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ADMIN FORM */}
//         {user?.accountType === "Admin" && (
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">
//               {editRoom ? "Edit Room" : "Create Room"}
//             </h2>

//             <form onSubmit={submitHandler} className="space-y-4">
//               <input
//                 name="roomNumber"
//                 placeholder="Room Number"
//                 value={formdata.roomNumber}
//                 onChange={changeHandler}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />

//               <input
//                 name="type"
//                 placeholder="Room Type"
//                 value={formdata.type}
//                 onChange={changeHandler}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />

//               <input
//                 type="number"
//                 name="capacity"
//                 placeholder="Capacity"
//                 value={formdata.capacity}
//                 onChange={changeHandler}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />

//               <input
//                 type="number"
//                 name="pricePerNight"
//                 placeholder="Price Per Night"
//                 value={formdata.pricePerNight}
//                 onChange={changeHandler}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />

//               <label className="flex items-center gap-2 text-sm">
//                 <input
//                   type="checkbox"
//                   name="isAvailable"
//                   checked={formdata.isAvailable}
//                   onChange={changeHandler}
//                 />
//                 Available
//               </label>

//               <Upload
//                 label="Room Image"
//                 onChange={(file) =>
//                   setFormdata((prev) => ({
//                     ...prev,
//                     image: file,
//                   }))
//                 }
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded"
//               >
//                 {editRoom ? "Update Room" : "Create Room"}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* BOOKING MODAL */}
//       {showBookingModal && selectedRoom && (
//         <RoomBooking
//           room={selectedRoom}
//           onClose={() => setShowBookingModal(false)}
//         />
//       )}
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createRoom,
//   getAllRooms,
//   updateRoom,
//   deleteRoom,
// } from "../../services/roomApi";
// import { setRoom, setEditRoom } from "../../slices/roomSlice";
// import Upload from "./Upload";
// import RoomBooking from "./RoomBooking";

// export default function RoomContainer() {
//   const { token, user } = useSelector((state) => state.auth);
//   const { rooms, room, editRoom } = useSelector((state) => state.room);
//   const dispatch = useDispatch();

//   const [searchRoomNo, setSearchRoomNo] = useState("");
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [resetKey, setResetKey] = useState(0);

//   const [formdata, setFormdata] = useState({
//     roomNumber: "",
//     type: "",
//     capacity: "",
//     pricePerNight: "",
//     isAvailable: true,
//     image: null,
//   });

//   useEffect(() => {
//     if (token) {
//       dispatch(getAllRooms(token));
//     }
//   }, [dispatch, token]);

//   function changeHandler(e) {
//     const { name, value, type, checked } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();
//     const data = new FormData();

//     Object.keys(formdata).forEach((key) => {
//       if (formdata[key] !== null) {
//         data.append(key, formdata[key]);
//       }
//     });

//     if (editRoom && room?._id) {
//       data.append("roomid", room._id);
//       dispatch(updateRoom(data, token));
//     } else {
//       dispatch(createRoom(data, token));
//     }

//     setFormdata({
//       roomNumber: "",
//       type: "",
//       capacity: "",
//       pricePerNight: "",
//       isAvailable: true,
//       image: null,
//     });

//     setResetKey((prev) => prev + 1);
//     dispatch(setEditRoom(false));
//   }

//   function editHandler(selectedRoom) {
//     dispatch(setRoom(selectedRoom));
//     dispatch(setEditRoom(true));

//     setFormdata({
//       roomNumber: selectedRoom.roomNumber,
//       type: selectedRoom.type,
//       capacity: selectedRoom.capacity,
//       pricePerNight: selectedRoom.pricePerNight,
//       isAvailable: selectedRoom.isAvailable,
//       image: null,
//     });

//     setResetKey((prev) => prev + 1);
//   }

//   function deleteHandler(roomid) {
//     dispatch(deleteRoom(roomid, token));
//   }

//   const filteredRooms = rooms.filter((r) =>
//     r.roomNumber.toString().includes(searchRoomNo)
//   );

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-no-repeat text-white px-4 sm:px-10 py-12"
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')",
//       }}
//     >
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
//         <h1 className="text-4xl font-bold tracking-wide text-yellow-400">
//           Royal Grand Hotel Management
//         </h1>

//         <input
//           type="text"
//           placeholder="Search Room Number..."
//           value={searchRoomNo}
//           onChange={(e) => setSearchRoomNo(e.target.value)}
//           className="w-full md:w-80 bg-white/10 border border-yellow-500/30 px-4 py-2 rounded-xl backdrop-blur-md focus:ring-2 focus:ring-yellow-500 outline-none transition"
//         />
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
//         {/* ROOM LIST */}
//         <div className="xl:col-span-2 space-y-8">
//           {filteredRooms.map((r) => (
//             <div
//               key={r._id}
//               className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-yellow-500/40 hover:-translate-y-2 transition duration-500"
//             >
//               <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//                 <div className="flex items-center gap-6">
//                   {r.image && (
//                     <img
//                       src={r.image}
//                       alt="room"
//                       className="w-36 h-24 object-cover rounded-xl border border-yellow-500/40 group-hover:scale-105 transition duration-500"
//                     />
//                   )}

//                   <div>
//                     <h2 className="text-xl font-semibold text-yellow-400">
//                       Room {r.roomNumber}
//                     </h2>
//                     <p className="text-gray-300">
//                       {r.type} • Capacity {r.capacity}
//                     </p>
//                     <p className="text-green-400 font-medium mt-1">
//                       ₹{r.pricePerNight} / night
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <span
//                     className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                       r.isAvailable
//                         ? "bg-green-500/20 text-green-400"
//                         : "bg-red-500/20 text-red-400"
//                     }`}
//                   >
//                     {r.isAvailable ? "Available" : "Booked"}
//                   </span>

//                   {user?.accountType === "Admin" && (
//                     <>
//                       <button
//                         onClick={() => editHandler(r)}
//                         className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => deleteHandler(r._id)}
//                         className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105 transition duration-300"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ADMIN FORM */}
//         {user?.accountType === "Admin" && (
//           <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 p-8 rounded-2xl shadow-2xl">
//             <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
//               {editRoom ? "Edit Room" : "Create Luxury Room"}
//             </h2>

//             <form onSubmit={submitHandler} className="space-y-5">
//               <input
//                 name="roomNumber"
//                 placeholder="Room Number"
//                 value={formdata.roomNumber}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <input
//                 name="type"
//                 placeholder="Room Type"
//                 value={formdata.type}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <input
//                 type="number"
//                 name="capacity"
//                 placeholder="Capacity"
//                 value={formdata.capacity}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <input
//                 type="number"
//                 name="pricePerNight"
//                 placeholder="Price Per Night"
//                 value={formdata.pricePerNight}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <label className="flex items-center gap-2 text-gray-300">
//                 <input
//                   type="checkbox"
//                   name="isAvailable"
//                   checked={formdata.isAvailable}
//                   onChange={changeHandler}
//                 />
//                 Available
//               </label>

//               <Upload
//                 key={resetKey}
//                 label="Room Image"
//                 onChange={(file) =>
//                   setFormdata((prev) => ({
//                     ...prev,
//                     image: file,
//                   }))
//                 }
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/50 transition duration-300"
//               >
//                 {editRoom ? "Update Room" : "Create Room"}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>

//       {showBookingModal && selectedRoom && (
//         <RoomBooking
//           room={selectedRoom}
//           onClose={() => setShowBookingModal(false)}
//         />
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createRoom,
//   getAllRooms,
//   updateRoom,
//   deleteRoom,
// } from "../../services/roomApi";
// import { setRoom, setEditRoom } from "../../slices/roomSlice";
// import Upload from "./Upload";
// import RoomBooking from "./RoomBooking";

// export default function RoomContainer() {
//   const { token, user } = useSelector((state) => state.auth);
//   const { rooms, room, editRoom } = useSelector((state) => state.room);
//   const dispatch = useDispatch();

//   const [searchRoomNo, setSearchRoomNo] = useState("");
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [resetKey, setResetKey] = useState(0);

//   const [formdata, setFormdata] = useState({
//     roomNumber: "",
//     type: "",
//     capacity: "",
//     pricePerNight: "",
//     isAvailable: true,
//     image: null,
//   });

//   useEffect(() => {
//     if (token) dispatch(getAllRooms(token));
//   }, [dispatch, token]);

//   function changeHandler(e) {
//     const { name, value, type, checked } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();
//     const data = new FormData();

//     Object.keys(formdata).forEach((key) => {
//       if (formdata[key] !== null) {
//         data.append(key, formdata[key]);
//       }
//     });

//     if (editRoom && room?._id) {
//       data.append("roomid", room._id);
//       dispatch(updateRoom(data, token));
//     } else {
//       dispatch(createRoom(data, token));
//     }

//     setFormdata({
//       roomNumber: "",
//       type: "",
//       capacity: "",
//       pricePerNight: "",
//       isAvailable: true,
//       image: null,
//     });

//     setResetKey((prev) => prev + 1);
//     dispatch(setEditRoom(false));
//   }

//   function editHandler(selectedRoom) {
//     dispatch(setRoom(selectedRoom));
//     dispatch(setEditRoom(true));

//     setFormdata({
//       roomNumber: selectedRoom.roomNumber,
//       type: selectedRoom.type,
//       capacity: selectedRoom.capacity,
//       pricePerNight: selectedRoom.pricePerNight,
//       isAvailable: selectedRoom.isAvailable,
//       image: null,
//     });

//     setResetKey((prev) => prev + 1);
//   }

//   function deleteHandler(roomid) {
//     dispatch(deleteRoom(roomid, token));
//   }

//   const filteredRooms = rooms.filter((r) =>
//     r.roomNumber.toString().includes(searchRoomNo)
//   );

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-fixed text-white px-4 sm:px-10 py-16"
//       style={{
//         backgroundImage:
//           "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')",
//       }}
//     >
//       {/* HEADER */}
//       <div className="text-center mb-16">
//         <h1 className="text-5xl font-bold text-yellow-400 tracking-wider">
//           Royal Grand Hotel
//         </h1>
//         <p className="text-gray-300 mt-4 text-lg">
//           Luxury • Comfort • Excellence
//         </p>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">

//         {/* ROOM LIST */}
//         <div className="xl:col-span-2 space-y-10">
//           {filteredRooms.map((r) => (
//             <div
//               key={r._id}
//               className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/40 hover:-translate-y-3 transition duration-500"
//             >
//               <div className="grid md:grid-cols-2">

//                 {/* IMAGE */}
//                 {r.image && (
//                   <div className="overflow-hidden">
//                     <img
//                       src={r.image}
//                       alt="room"
//                       className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
//                     />
//                   </div>
//                 )}

//                 {/* CONTENT */}
//                 <div className="p-8 flex flex-col justify-center space-y-4">
//                   <h2 className="text-3xl font-semibold text-yellow-400">
//                     Room {r.roomNumber}
//                   </h2>

//                   <p className="text-gray-300 text-lg">
//                     {r.type} • Capacity {r.capacity}
//                   </p>

//                   <p className="text-2xl text-green-400 font-semibold">
//                     ₹{r.pricePerNight} / night
//                   </p>

//                   <span
//                     className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
//                       r.isAvailable
//                         ? "bg-green-500/20 text-green-400"
//                         : "bg-red-500/20 text-red-400"
//                     }`}
//                   >
//                     {r.isAvailable ? "Available" : "Booked"}
//                   </span>

//                   {user?.accountType === "Admin" && (
//                     <div className="flex gap-4 pt-4">
//                       <button
//                         onClick={() => editHandler(r)}
//                         className="px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105 transition duration-300 shadow-lg"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => deleteHandler(r._id)}
//                         className="px-6 py-2 bg-red-600 rounded-xl hover:bg-red-700 hover:scale-105 transition duration-300 shadow-lg"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ADMIN FORM */}
//         {user?.accountType === "Admin" && (
//           <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 p-10 rounded-3xl shadow-2xl sticky top-10">
//             <h2 className="text-3xl font-semibold mb-8 text-yellow-400 text-center">
//               {editRoom ? "Edit Luxury Room" : "Create Luxury Room"}
//             </h2>

//             <form onSubmit={submitHandler} className="space-y-6">
//               <input
//                 name="roomNumber"
//                 placeholder="Room Number"
//                 value={formdata.roomNumber}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <input
//                 name="type"
//                 placeholder="Room Type"
//                 value={formdata.type}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <input
//                 type="number"
//                 name="capacity"
//                 placeholder="Capacity"
//                 value={formdata.capacity}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <input
//                 type="number"
//                 name="pricePerNight"
//                 placeholder="Price Per Night"
//                 value={formdata.pricePerNight}
//                 onChange={changeHandler}
//                 className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
//                 required
//               />

//               <label className="flex items-center gap-2 text-gray-300">
//                 <input
//                   type="checkbox"
//                   name="isAvailable"
//                   checked={formdata.isAvailable}
//                   onChange={changeHandler}
//                 />
//                 Available
//               </label>

//               <Upload
//                 key={resetKey}
//                 label="Room Image"
//                 onChange={(file) =>
//                   setFormdata((prev) => ({
//                     ...prev,
//                     image: file,
//                   }))
//                 }
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/50 transition duration-300"
//               >
//                 {editRoom ? "Update Room" : "Create Room"}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>

//       {showBookingModal && selectedRoom && (
//         <RoomBooking
//           room={selectedRoom}
//           onClose={() => setShowBookingModal(false)}
//         />
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from "../../services/roomApi";
import { setRoom, setEditRoom } from "../../slices/roomSlice";
import Upload from "./Upload";
import RoomBooking from "./RoomBooking";

export default function RoomContainer() {
  const { token, user } = useSelector((state) => state.auth);
  const { rooms, room, editRoom } = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const [searchRoomNo, setSearchRoomNo] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const [formdata, setFormdata] = useState({
    roomNumber: "",
    type: "",
    capacity: "",
    pricePerNight: "",
    isAvailable: true,
    image: null,
  });

  useEffect(() => {
    if (token) dispatch(getAllRooms(token));
  }, [dispatch, token]);

  function changeHandler(e) {
    const { name, value, type, checked } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formdata).forEach((key) => {
      if (formdata[key] !== null) {
        data.append(key, formdata[key]);
      }
    });

    if (editRoom && room?._id) {
      data.append("roomid", room._id);
      dispatch(updateRoom(data, token));
    } else {
      dispatch(createRoom(data, token));
    }

    setFormdata({
      roomNumber: "",
      type: "",
      capacity: "",
      pricePerNight: "",
      isAvailable: true,
      image: null,
    });

    setResetKey((prev) => prev + 1);
    dispatch(setEditRoom(false));
  }

  function editHandler(selectedRoom) {
    dispatch(setRoom(selectedRoom));
    dispatch(setEditRoom(true));

    setFormdata({
      roomNumber: selectedRoom.roomNumber,
      type: selectedRoom.type,
      capacity: selectedRoom.capacity,
      pricePerNight: selectedRoom.pricePerNight,
      isAvailable: selectedRoom.isAvailable,
      image: null,
    });

    setResetKey((prev) => prev + 1);
  }

  function deleteHandler(roomid) {
    dispatch(deleteRoom(roomid, token));
  }

  const filteredRooms = rooms.filter((r) =>
    r.roomNumber.toString().includes(searchRoomNo)
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white px-4 sm:px-6 lg:px-10 py-10 md:py-16 overflow-x-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider">
          Royal Grand Hotel
        </h1>
        <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg">
          Luxury • Comfort • Excellence
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">

        {/* ROOM LIST */}
        <div className="xl:col-span-2 space-y-8 md:space-y-10">
          {filteredRooms.map((r) => (
            <div
              key={r._id}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition duration-500"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">

                {r.image && (
                  <div className="overflow-hidden">
                    <img
                      src={r.image}
                      alt="room"
                      className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                )}

                <div className="p-5 md:p-8 flex flex-col justify-center space-y-3 md:space-y-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-yellow-400">
                    Room {r.roomNumber}
                  </h2>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                    {r.type} • Capacity {r.capacity}
                  </p>

                  <p className="text-lg sm:text-xl md:text-2xl text-green-400 font-semibold">
                    ₹{r.pricePerNight} / night
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                      r.isAvailable
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {r.isAvailable ? "Available" : "Booked"}
                  </span>

                  {user?.accountType === "Admin" && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-3">
                      <button
                        onClick={() => editHandler(r)}
                        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteHandler(r._id)}
                        className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ADMIN FORM */}
        {user?.accountType === "Admin" && (
          <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-xl xl:sticky xl:top-10">
            <h2 className="text-xl md:text-3xl font-semibold mb-6 md:mb-8 text-yellow-400 text-center">
              {editRoom ? "Edit Luxury Room" : "Create Luxury Room"}
            </h2>

            <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
              <input
                name="roomNumber"
                placeholder="Room Number"
                value={formdata.roomNumber}
                onChange={changeHandler}
                className="w-full bg-white/10 border border-white/20 px-4 py-2 md:py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition text-sm md:text-base"
                required
              />

              <input
                name="type"
                placeholder="Room Type"
                value={formdata.type}
                onChange={changeHandler}
                className="w-full bg-white/10 border border-white/20 px-4 py-2 md:py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition text-sm md:text-base"
                required
              />

              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formdata.capacity}
                onChange={changeHandler}
                className="w-full bg-white/10 border border-white/20 px-4 py-2 md:py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition text-sm md:text-base"
                required
              />

              <input
                type="number"
                name="pricePerNight"
                placeholder="Price Per Night"
                value={formdata.pricePerNight}
                onChange={changeHandler}
                className="w-full bg-white/10 border border-white/20 px-4 py-2 md:py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition text-sm md:text-base"
                required
              />

              <label className="flex items-center gap-2 text-gray-300 text-sm">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formdata.isAvailable}
                  onChange={changeHandler}
                />
                Available
              </label>

              <Upload
                key={resetKey}
                label="Room Image"
                onChange={(file) =>
                  setFormdata((prev) => ({
                    ...prev,
                    image: file,
                  }))
                }
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 py-3 md:py-4 rounded-xl md:rounded-2xl font-semibold hover:scale-105 transition duration-300 text-sm md:text-base"
              >
                {editRoom ? "Update Room" : "Create Room"}
              </button>
            </form>
          </div>
        )}
      </div>

      {showBookingModal && selectedRoom && (
        <RoomBooking
          room={selectedRoom}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}