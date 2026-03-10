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
//                     ${r.pricePerNight} / night
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
//                 ${r.pricePerNight} / night
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
//                     ${r.pricePerNight} / night
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
//                     ${r.pricePerNight} / night
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
//                       ${r.pricePerNight} / night
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
//                     ${r.pricePerNight} / night
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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from "../../services/roomApi";
import { setRoom, setEditRoom } from "../../slices/roomSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Upload from "./Upload";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

function getRoomRating(roomNumber) {
  const base = Number(roomNumber) || 1;
  return (3.8 + (base % 12) / 10).toFixed(1);
}

function convertWordToNumber(text) {
  const numberWords = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
    'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
    'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
    'eighteen': '18', 'nineteen': '19', 'twenty': '20'
  };
  
  const lowerText = text.toLowerCase().trim();
  
  // Check if entire text is a number word
  if (numberWords[lowerText]) {
    return numberWords[lowerText];
  }
  
  // Check if text contains "room" and then a number word
  const words = lowerText.split(/\s+/);
  for (const word of words) {
    if (numberWords[word]) {
      return numberWords[word];
    }
  }
  
  return text;
}

function getRoomImages(room) {
  if (Array.isArray(room?.images) && room.images.length) {
    return room.images.filter(Boolean);
  }

  return room?.image ? [room.image] : [];
}

export default function RoomContainer() {
  const { token, user } = useSelector((state) => state.auth);
  const { rooms, room, editRoom } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchRoomNo, setSearchRoomNo] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [galleryState, setGalleryState] = useState({
    open: false,
    images: [],
    index: 0,
    title: "",
  });

  const [formdata, setFormdata] = useState({
    roomNumber: "",
    type: "",
    capacity: "",
    pricePerNight: "",
    isAvailable: true,
    images: [],
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

    data.append("roomNumber", formdata.roomNumber);
    data.append("type", formdata.type);
    data.append("capacity", formdata.capacity);
    data.append("pricePerNight", formdata.pricePerNight);
    data.append("isAvailable", formdata.isAvailable);

    formdata.images.forEach((file) => {
      data.append("images", file);
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
      images: [],
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
      images: [],
    });

    setResetKey((prev) => prev + 1);
  }

  function deleteHandler(roomid) {
    dispatch(deleteRoom(roomid, token));
  }

  const filteredRooms = rooms.filter((r) => {
    const searchText = searchRoomNo.toLowerCase().trim();
    const convertedSearch = convertWordToNumber(searchText);
    
    return (
      r.roomNumber.toString().includes(searchText) ||
      r.roomNumber.toString().includes(convertedSearch) ||
      r.type.toLowerCase().includes(searchText)
    );
  });

  function openRoomDetails(roomItem) {
    if (user?.accountType === "Admin") {
      return; // Admins cannot book rooms
    }
    navigate("/dashboard/roombooking", { state: { room: roomItem } });
  }

  function openGallery(roomItem, startIndex = 0) {
    const images = getRoomImages(roomItem);
    if (!images.length) return;

    setGalleryState({
      open: true,
      images,
      index: startIndex,
      title: `Room ${roomItem.roomNumber}`,
    });
  }

  function closeGallery() {
    setGalleryState({ open: false, images: [], index: 0, title: "" });
  }

  function showPrevImage() {
    setGalleryState((prev) => {
      const nextIndex =
        prev.index === 0 ? prev.images.length - 1 : prev.index - 1;
      return { ...prev, index: nextIndex };
    });
  }

  function showNextImage() {
    setGalleryState((prev) => {
      const nextIndex =
        prev.index === prev.images.length - 1 ? 0 : prev.index + 1;
      return { ...prev, index: nextIndex };
    });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 text-gray-900 px-3 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="w-full">
        <div className="mb-3 text-sm text-gray-500">
          Dashboard &gt; Rooms &gt; Accommodation
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gray-200 pb-3 mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Available Rooms ({filteredRooms.length})
          </h1>
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by room number (e.g., '3' or 'three') or type..."
            value={searchRoomNo}
            onChange={(e) => setSearchRoomNo(e.target.value)}
            className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-5">
            {filteredRooms.map((r) => {
              const roomImages = getRoomImages(r);
              const mainImage =
                roomImages[0] ||
                "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80";
              
              // Calculate varied discount based on room characteristics
              const roomNum = Number(r.roomNumber || 1);
              const roomPrice = Number(r.pricePerNight || 0);
              const capacity = Number(r.capacity || 2);
              
              // Discount varies by room features (12-35%)
              let discountPct;
              if (roomPrice > 3000) {
                discountPct = 25 + (roomNum % 5) * 2; // 25-33% for luxury rooms
              } else if (roomPrice > 1500) {
                discountPct = 18 + (roomNum % 6) * 2; // 18-28% for premium rooms
              } else {
                discountPct = 12 + (roomNum % 5) * 2; // 12-20% for standard rooms
              }
              
              const originalPrice = Math.round(roomPrice / (1 - discountPct / 100));
              const rating = getRoomRating(r.roomNumber);
              const reviewCount = 350 + Number(r.roomNumber || 0) * 15;

              return (
                <article
                  key={r._id}
                  className="bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[420px_1fr] gap-0">
                    {/* Room Image Section */}
                    <div className="relative bg-gray-100 h-56 sm:h-64 lg:h-auto">
                      <button
                        type="button"
                        onClick={() => openGallery(r, 0)}
                        className="w-full h-full text-left"
                      >
                        <img
                          src={mainImage}
                          alt={`Room ${r.roomNumber}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>

                      {roomImages.length > 1 && (
                        <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 overflow-hidden">
                          {roomImages.slice(0, 4).map((img, index) => (
                            <button
                              key={`${r._id}-thumb-${index}`}
                              type="button"
                              onClick={() => openGallery(r, index)}
                            >
                              <img
                                src={img}
                                alt={`Room ${r.roomNumber} ${index + 1}`}
                                className="w-12 h-9 object-cover rounded border border-white/80"
                              />
                            </button>
                          ))}
                          {roomImages.length > 4 && (
                            <span className="inline-flex items-center justify-center min-w-12 h-9 px-2 rounded bg-black/60 text-white text-xs font-semibold">
                              +{roomImages.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {user?.accountType !== "Admin" && (
                        <div className="absolute top-3 left-3 bg-white/95 px-2 py-1 rounded text-xs font-medium text-gray-700">
                          Company-Serviced
                        </div>
                      )}
                    </div>

                    {/* Room Details */}
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                          Room {r.roomNumber} - {r.type} Suite
                        </h2>
                        
                        <p className="text-sm text-gray-600 mt-0.5">
                          Prime Location • {r.capacity} Guests • <span className="text-red-600">● 0.3 km</span>
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                            {rating} ★
                          </span>
                          <span className="text-sm text-gray-600">
                            ({reviewCount} Ratings) • Very Good
                          </span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-gray-700">
                          <span className="flex items-center gap-1.5">
                            📶 Free Wifi
                          </span>
                          <span className="flex items-center gap-1.5">
                            🔌 Power backup
                          </span>
                          <span className="flex items-center gap-1.5">
                            💳 Card payment
                          </span>
                          <span className="text-gray-500">+ 11 more</span>
                        </div>

                        {user?.accountType !== "Admin" && (
                          <div className="mt-2">
                            <span className="inline-block bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded text-xs font-semibold">
                              🏆 WIZARD MEMBER
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-200">
                        <div>
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                              ${formatCurrency(r.pricePerNight)}
                            </span>
                            <span className="text-lg font-medium text-gray-400 line-through">
                              ${formatCurrency(originalPrice)}
                            </span>
                            <span className="text-lg font-semibold text-orange-600">
                              {discountPct}% off
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            + ${Math.round(Number(r.pricePerNight) * 0.13)} taxes & fees · per room per night
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                          {user?.accountType === "Admin" ? (
                            <>
                              <button
                                onClick={() => editHandler(r)}
                                className="w-full lg:w-auto px-4 py-2 rounded-md border border-blue-600 text-blue-700 text-sm font-semibold hover:bg-blue-50 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteHandler(r._id)}
                                className="w-full lg:w-auto px-4 py-2 rounded-md border border-red-600 text-red-700 text-sm font-semibold hover:bg-red-50 transition"
                              >
                                Delete
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => openRoomDetails(r)}
                                className="w-full lg:w-auto px-4 py-2 rounded-md border border-gray-400 bg-white text-gray-800 text-sm font-semibold hover:bg-gray-50 transition"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => openRoomDetails(r)}
                                disabled={!r.isAvailable}
                                className="w-full lg:w-auto px-5 py-2 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {r.isAvailable ? "Book Now" : "Unavailable"}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {!filteredRooms.length && (
              <div className="bg-white border border-gray-300 rounded-lg p-8 text-center text-gray-500">
                No rooms found matching your search.
              </div>
            )}
          </div>

          {user?.accountType === "Admin" && (
            <aside 
              className="bg-white border border-gray-300 p-5 rounded-lg shadow-sm lg:sticky lg:top-6 h-fit"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                {editRoom ? "Edit Room" : "Add New Room"}
              </h2>

              <form onSubmit={submitHandler} className="space-y-3">
                <input
                  name="roomNumber"
                  placeholder="Room Number"
                  value={formdata.roomNumber}
                  onChange={changeHandler}
                  className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  required
                />

                <input
                  name="type"
                  placeholder="Room Type (e.g., Deluxe, Suite)"
                  value={formdata.type}
                  onChange={changeHandler}
                  className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  required
                />

                <input
                  type="number"
                  name="capacity"
                  placeholder="Guest Capacity"
                  value={formdata.capacity}
                  onChange={changeHandler}
                  className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  required
                />

                <input
                  type="number"
                  name="pricePerNight"
                  placeholder="Price Per Night ($)"
                  value={formdata.pricePerNight}
                  onChange={changeHandler}
                  className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-green-500 outline-none text-sm"
                  required
                />

                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formdata.isAvailable}
                    onChange={changeHandler}
                    className="w-4 h-4 text-green-600 rounded"
                  />
                  Available for Booking
                </label>

                <Upload
                  key={resetKey}
                  label="Room Images"
                  multiple={true}
                  onChange={(files) =>
                    setFormdata((prev) => ({
                      ...prev,
                      images: files,
                    }))
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2.5 rounded-md font-semibold hover:bg-green-700 transition text-sm"
                >
                  {editRoom ? "Update Room" : "Create Room"}
                </button>
              </form>
            </aside>
          )}
        </div>
      </div>

      {galleryState.open && (
        <div 
          className="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
        >
          <div className="relative bg-white rounded-2xl w-full max-w-6xl p-4 md:p-6 shadow-2xl border border-white/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">
                {galleryState.title} Gallery
              </h3>
              <button
                type="button"
                onClick={closeGallery}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>

            <div className="relative">
              <img
                key={galleryState.index}
                src={galleryState.images[galleryState.index]}
                alt={`Room image ${galleryState.index + 1}`}
                className="w-full h-[44vh] sm:h-[50vh] md:h-[62vh] object-cover rounded-xl"
              />

              <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {galleryState.index + 1} / {galleryState.images.length}
              </span>

              {galleryState.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft className="text-gray-800 text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-105 transition"
                    aria-label="Next image"
                  >
                    <FaChevronRight className="text-gray-800 text-sm" />
                  </button>
                </>
              )}
            </div>

            {galleryState.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-2">
                {galleryState.images.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() =>
                      setGalleryState((prev) => ({ ...prev, index }))
                    }
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      galleryState.index === index
                        ? "border-green-600 ring-2 ring-green-200"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${index + 1}`}
                      className="w-full h-10 sm:h-12 md:h-14 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}