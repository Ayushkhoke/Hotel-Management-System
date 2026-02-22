// import React from "react";
// import { useSelector,useDispatch } from "react-redux";
// import { createTable } from "../../services/tableApi.jsx";
// import {useNavigate} from 'react-router-dom';
// export default function Tablecontainer() {


//     const {user,token}=useSelector((state)=>state.auth);
//   const { tables, table } = useSelector((state) => state.table);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formdata, setFormdata] = React.useState({
// tableNumber:"",
//   capacity:""  });

//   function changehandler(e){
//     setFormdata((prev)=>({
//         ...prev,
//         [e.target.name]:e.target.value,
//     }))

//   }
//   function submithandler(e){
//   e.preventDefault();
//    console.log("form submitted");
//     dispatch(createTable(formdata,navigate,token));
//   }

//   function edittablehandler(){
//      if (!table) return;
//      dispatch(setEditTable(true));
//   }
//   return(
//     <div>
//       <h1>Table Container</h1>
//       <p>User: {user?.name}</p>
//       <p>Table Number: {formdata.tableNumber}</p>
//         <p>Capacity: {formdata.capacity}</p>
//       <p>Total tables: {tables.length}</p>

//       <div>
//   <form onSubmit={submithandler}>
    
//         <label>Table Number:</label>
//         <input type="number"  placeholder="Table Name" name="tableNumber" value={formdata.tableNumber} onChange={changehandler}/>
//         <label>Capacity:</label> 
//         <input type="number" name="capacity" placeholder="capacity" value={formdata.capacity} onChange={changehandler}/>

//    <div className="flex gap-3">
//          <button type="submit">
//             CREATE TABLE
//         </button>

//         <button onClick={edittablehandler}>
//           Edit table
//         </button>
//    </div>
//   </form>
//       </div>
//     </div>
//   );
// }



// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { createTable,getalltable  } from "../../services/tableApi";
// import { setTable, setEditTable } from "../../slices/tableSlice";
// import { useNavigate } from "react-router-dom";
// import  Upload from './Upload'


// export default function Tablecontainer() {
//   const { user, token } = useSelector((state) => state.auth);
//   const { loading } = useSelector((state) => state.auth);

//   console.log("token=",token);
//   const { tables, table, edittable } = useSelector(
//     (state) => state.table
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formdata, setFormdata] = React.useState({
//     tableNumber: "",
//     capacity: "",
//       status: "available",
//   image: null,
//   });

//   function changehandler(e) {
//     setFormdata((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   }

// function submitHandler(e) {
//   e.preventDefault();

//  const data=new FormData();
 
//   data.append("tableNumber", formdata.tableNumber);
//     data.append("capacity", formdata.capacity);
//     data.append("status", formdata.status);
//   if (formdata.image) {
//       data.append("image", formdata.image);
//     }

//     dispatch(createTable(data, navigate, token));
// }


//   function editHandler(selectedTable) {
//     dispatch(setTable(selectedTable));
//     dispatch(setEditTable(true));

//     setFormdata({
//       tableNumber: selectedTable.tableNumber,
//       capacity: selectedTable.capacity,
//       status:"available",
//       image:null,
//     });
//   }
//   React.useEffect(() => {
//   if (token) {
//     dispatch(getalltable(token));
//   }
// }, [dispatch, token]);


//   return (
//     <div className="p-6 grid grid-cols-2 gap-6">

//       {/* LEFT: TABLE LIST */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">
//           🍽 Tables ({tables.length})
//         </h2>

//         {tables.map((t) => (
//           <div
//             key={t._id}
//             className={`p-4 mb-3 border rounded-lg ${
//               table?._id === t._id
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-300"
//             }`}
//           >
//             <p><b>Table:</b> {t.tableNumber}</p>
//             <p><b>Capacity:</b> {t.capacity}</p>
//             <p><b>Status:</b> {t.status || "available"}</p>
//             <img src={t.image} className="w-[50px] h-[50px]"/>
//             <button
//               type="button"
//               className="mt-2 text-blue-600"
//               onClick={() => editHandler(t)}
//             >
//               ✏ Edit
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT: FORM */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">
//           {edittable ? "✏ Edit Table" : "➕ Create Table"}
//         </h2>

//         <form
//           onSubmit={submitHandler}
//           className="p-4 border rounded-lg"
//         >
//           <label>Table Number</label>
//           <input
//             className="w-full p-2 border rounded mb-3"
//             type="number"
//             name="tableNumber"
//             value={formdata.tableNumber}
//             onChange={changehandler}
//           />

//           <label>Capacity</label>
//           <input
//             className="w-full p-2 border rounded mb-3"
//             type="number"
//             name="capacity"
//             value={formdata.capacity}
//             onChange={changehandler}
//           />

//              <label>status</label>
//           <select
//             className="w-full p-2 border rounded mb-3"
//             type="text"
//             name="status"
//             value={formdata.status}
//             onChange={changehandler}
//           >
//             <option > available</option>
//               <option > occupied</option>
//             </select>

// <Upload
//   label="Table Image"
//   onChange={(file) =>
//     setFormdata((prev) => ({
//       ...prev,
//       image: file,
//     }))
//   }
// />



//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded"
//           >
//             {edittable ? "UPDATE TABLE" : "CREATE TABLE"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { createTable, getalltable, updateTableStatus } from "../../services/tableApi";
// import { setTable, setEditTable } from "../../slices/tableSlice";
// import { useNavigate } from "react-router-dom";
// import Upload from "./Upload";

// export default function Tablecontainer() {
//   const { token } = useSelector((state) => state.auth);
//   const { tables, table, edittable } = useSelector((state) => state.table);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formdata, setFormdata] = React.useState({
//     tableNumber: "",
//     capacity: "",
//     status: "available",
//     image: null,
//   });

//   function changehandler(e) {
//     setFormdata((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   }

//   // ✅ FIXED SUBMIT HANDLER
//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("tableNumber", formdata.tableNumber);
//     data.append("capacity", formdata.capacity);
//     data.append("status", formdata.status);

//     if (formdata.image) {
//       data.append("image", formdata.image);
//     }

//     if (edittable && table?._id) {
//       // 🔥 UPDATE
//       dispatch(updateTableStatus(table._id, data, token));
//     } else {
//       // ➕ CREATE
//       dispatch(createTable(data, navigate, token));
//     }
//   }

//   // ✅ FIXED EDIT HANDLER
//   function editHandler(selectedTable) {
//     dispatch(setTable(selectedTable));
//     dispatch(setEditTable(true));

//     setFormdata({
//       tableNumber: selectedTable.tableNumber,
//       capacity: selectedTable.capacity,
//       status: selectedTable.status || "available",
//       image: null,
//     });
//   }

//   React.useEffect(() => {
//     if (token) {
//       dispatch(getalltable(token));
//     }
//   }, [dispatch, token]);

//   return (
//     <div className="p-6 grid grid-cols-2 gap-6">

//       {/* LEFT: TABLE LIST */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">
//           🍽 Tables ({tables.length})
//         </h2>

//         {tables.map((t) => (
//           <div
//             key={t._id}
//             className={`p-4 mb-3 border rounded-lg ${
//               table?._id === t._id
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-300"
//             }`}
//           >
//             <p><b>Table:</b> {t.tableNumber}</p>
//             <p><b>Capacity:</b> {t.capacity}</p>
//             <p><b>Status:</b> {t.status}</p>
//             {t.image && <img src={t.image} className="w-[50px] h-[50px]" />}

//             <button
//               type="button"
//               className="mt-2 text-blue-600"
//               onClick={() => editHandler(t)}
//             >
//               ✏ Edit
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT: FORM */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">
//           {edittable ? "✏ Edit Table" : "➕ Create Table"}
//         </h2>

//         <form onSubmit={submitHandler} className="p-4 border rounded-lg">
//           <label>Table Number</label>
//           <input
//             className="w-full p-2 border rounded mb-3"
//             type="number"
//             name="tableNumber"
//             value={formdata.tableNumber}
//             onChange={changehandler}
//           />

//           <label>Capacity</label>
//           <input
//             className="w-full p-2 border rounded mb-3"
//             type="number"
//             name="capacity"
//             value={formdata.capacity}
//             onChange={changehandler}
//           />

//           <label>Status</label>
//           <select
//             className="w-full p-2 border rounded mb-3"
//             name="status"
//             value={formdata.status}
//             onChange={changehandler}
//           >
//             <option value="available">available</option>
//             <option value="occupied">occupied</option>
//           </select>

//           <Upload
//             label="Table Image"
//             onChange={(file) =>
//               setFormdata((prev) => ({
//                 ...prev,
//                 image: file,
//               }))
//             }
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded"
//           >
//             {edittable ? "UPDATE TABLE" : "CREATE TABLE"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {useState,useEffect} from 'react';
// import {
//   createTable,
//   getalltable,
//   updateTableStatus,
// } from "../../services/tableApi";
// import { setTable, setEditTable } from "../../slices/tableSlice";
// import { useNavigate } from "react-router-dom";
// import Upload from "./Upload";

// export default function Tablecontainer() {
//   const { token } = useSelector((state) => state.auth);
//   const { tables, table, edittable } = useSelector((state) => state.table);
// const [searchTableNo, setSearchTableNo] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formdata, setFormdata] = React.useState({
//     tableNumber: "",
//     capacity: "",
//     status: "available",
//     image: null,
//   });

//   function changehandler(e) {
//     setFormdata((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("tableNumber", formdata.tableNumber);
//     data.append("capacity", formdata.capacity);
//     data.append("status", formdata.status);
//     if (formdata.image) data.append("image", formdata.image);

//     if (edittable && table?._id) {
//       dispatch(updateTableStatus(table._id, data, token));
//     } else {
//       dispatch(createTable(data, navigate, token));
//     }
//   }

//   function editHandler(selectedTable) {
//     dispatch(setTable(selectedTable));
//     dispatch(setEditTable(true));

//     setFormdata({
//       tableNumber: selectedTable.tableNumber,
//       capacity: selectedTable.capacity,
//       status: selectedTable.status || "available",
//       image: null,
//     });
//   }

//   useEffect(() => {
//     if (token) dispatch(getalltable(token));
//   }, [dispatch, token]);

//   // 🔍 FILTER LOGIC
//   const filtertables = tables.filter((t) =>
//     t.tableNumber.toString().includes(searchTableNo)
//   );
//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       {/* HEADER */}
//       <div className="mb-10">
//         <h1 className="text-3xl font-semibold text-slate-800">
//           Table Management
//         </h1>
//         <p className="text-slate-500 mt-1">
//           Manage restaurant tables and availability
//         </p>
//       </div>

//   <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Table Number..."
//           value={searchTableNo}
//           onChange={(e) => setSearchTableNo(e.target.value)}
//           className="w-full border border-slate-300 rounded-md px-4 py-2"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* TABLE LIST */}
//         <div className="lg:col-span-2 space-y-4">
//           {filtertables.map((t) => (
//             <div
//               key={t._id}
//               className={`flex items-center justify-between bg-white border rounded-lg p-5
//               ${
//                 table?._id === t._id
//                   ? "border-blue-500"
//                   : "border-slate-200"
//               }
//               hover:shadow-sm transition`}
//             >
//               <div className="flex items-center gap-4">
//                 {t.image && (
//                   <img
//                     src={t.image}
//                     alt="table"
//                     className="w-20 h-14 object-cover rounded-md border"
//                   />
//                 )}

//                 <div>
//                   <p className="text-lg font-medium text-slate-800">
//                     Table {t.tableNumber}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     Capacity: {t.capacity}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium
//                     ${
//                       t.status === "available"
//                         ? "bg-emerald-50 text-emerald-700"
//                         : "bg-red-50 text-red-700"
//                     }`}
//                 >
//                   {t.status}
//                 </span>

//                 <button
//                   onClick={() => editHandler(t)}
//                   className="text-blue-600 text-sm font-medium hover:underline"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>
//           ))}

//           {filtertables.length === 0 && (
//   <p className="text-center text-slate-500">No tables found</p>
// )}

//         </div>

//         {/* FORM */}
//         <div className="bg-white border border-slate-200 rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-slate-800 mb-6">
//             {edittable ? "Edit Table" : "Create Table"}
//           </h2>

//           <form onSubmit={submitHandler} className="space-y-4">
//             <div>
//               <label className="block text-sm text-slate-600 mb-1">
//                 Table Number
//               </label>
//               <input
//                 type="number"
//                 name="tableNumber"
//                 value={formdata.tableNumber}
//                 onChange={changehandler}
//                 className="w-full border border-slate-300 rounded-md px-3 py-2
//                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
//                 onChange={changehandler}
//                 className="w-full border border-slate-300 rounded-md px-3 py-2
//                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-slate-600 mb-1">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={formdata.status}
//                 onChange={changehandler}
//                 className="w-full border border-slate-300 rounded-md px-3 py-2"
//               >
//                 <option value="available">Available</option>
//                 <option value="occupied">Occupied</option>
//               </select>
//             </div>

//             <Upload
//               label="Table Image"
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
//               {edittable ? "Update Table" : "Create Table"}
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
//   createTable,
//   getalltable,
//   updateTableStatus,
// } from "../../services/tableApi";
// import { setTable, setEditTable } from "../../slices/tableSlice";
// import { useNavigate } from "react-router-dom";
// import Upload from "./Upload";

// export default function Tablecontainer() {
//   const { token, user } = useSelector((state) => state.auth);
//   const { tables, table, edittable } = useSelector((state) => state.table);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [searchTableNo, setSearchTableNo] = useState("");

//   const [formdata, setFormdata] = useState({
//     tableNumber: "",
//     capacity: "",
//     status: "available",
//     image: null,
//   });

//   // ---------------- HANDLERS ----------------

//   function changehandler(e) {
//     const { name, value } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("tableNumber", formdata.tableNumber);
//     data.append("capacity", formdata.capacity);
//     data.append("status", formdata.status);
//     if (formdata.image) data.append("image", formdata.image);

//     if (edittable && table?._id) {
//       dispatch(updateTableStatus(table._id, data, token));
//     } else {
//       dispatch(createTable(data, navigate, token));
//     }

//     setFormdata({
//       tableNumber: "",
//       capacity: "",
//       status: "available",
//       image: null,
//     });
//     dispatch(setEditTable(false));
//   }

//   function editHandler(selectedTable) {
//     dispatch(setTable(selectedTable));
//     dispatch(setEditTable(true));

//     setFormdata({
//       tableNumber: selectedTable.tableNumber,
//       capacity: selectedTable.capacity,
//       status: selectedTable.status || "available",
//       image: null,
//     });
//   }

//   // ---------------- EFFECT ----------------

//   useEffect(() => {
//     if (token) {
//       dispatch(getalltable(token));
//     }
//   }, [dispatch, token]);

//   // ---------------- FILTER ----------------

//   const filtertables = tables.filter((t) =>
//     t.tableNumber.toString().includes(searchTableNo)
//   );

//   // ---------------- UI ----------------

//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       {/* HEADER */}
//       <div className="mb-10">
//         <h1 className="text-3xl font-semibold text-slate-800">
//           Table Management
//         </h1>
//         <p className="text-slate-500 mt-1">
//           View restaurant tables and availability
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Table Number..."
//           value={searchTableNo}
//           onChange={(e) => setSearchTableNo(e.target.value)}
//           className="w-full border border-slate-300 rounded-md px-4 py-2"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* TABLE LIST (ADMIN + USER) */}
//         <div className="lg:col-span-2 space-y-4">
//           {filtertables.map((t) => (
//             <div
//               key={t._id}
//               className={`flex items-center justify-between bg-white border rounded-lg p-5
//               ${
//                 table?._id === t._id
//                   ? "border-blue-500"
//                   : "border-slate-200"
//               } hover:shadow-sm transition`}
//             >
//               <div className="flex items-center gap-4">
//                 {t.image && (
//                   <img
//                     src={t.image}
//                     alt="table"
//                     className="w-20 h-14 object-cover rounded-md border"
//                   />
//                 )}

//                 <div>
//                   <p className="text-lg font-medium text-slate-800">
//                     Table {t.tableNumber}
//                   </p>
//                   <p className="text-sm text-slate-500">
//                     Capacity: {t.capacity}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-medium
//                   ${
//                     t.status === "available"
//                       ? "bg-emerald-50 text-emerald-700"
//                       : "bg-red-50 text-red-700"
//                   }`}
//                 >
//                   {t.status}
//                 </span>

//                 {/* 🔐 ADMIN ONLY EDIT */}
//                 {user?.accountType === "Admin" && (
//                   <button
//                     onClick={() => editHandler(t)}
//                     className="text-blue-600 text-sm font-medium hover:underline"
//                   >
//                     Edit
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}

//           {filtertables.length === 0 && (
//             <p className="text-center text-slate-500">
//               No tables found
//             </p>
//           )}
//         </div>

//         {/* 🔐 ADMIN ONLY FORM */}
//         {user?.accountType === "Admin" && (
//           <div className="bg-white border border-slate-200 rounded-lg p-6">
//             <h2 className="text-xl font-semibold text-slate-800 mb-6">
//               {edittable ? "Edit Table" : "Create Table"}
//             </h2>

//             <form onSubmit={submitHandler} className="space-y-4">
//               <div>
//                 <label className="block text-sm text-slate-600 mb-1">
//                   Table Number
//                 </label>
//                 <input
//                   type="number"
//                   name="tableNumber"
//                   value={formdata.tableNumber}
//                   onChange={changehandler}
//                   className="w-full border border-slate-300 rounded-md px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-slate-600 mb-1">
//                   Capacity
//                 </label>
//                 <input
//                   type="number"
//                   name="capacity"
//                   value={formdata.capacity}
//                   onChange={changehandler}
//                   className="w-full border border-slate-300 rounded-md px-3 py-2"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-slate-600 mb-1">
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   value={formdata.status}
//                   onChange={changehandler}
//                   className="w-full border border-slate-300 rounded-md px-3 py-2"
//                 >
//                   <option value="available">Available</option>
//                   <option value="occupied">Occupied</option>
//                 </select>
//               </div>

//               <Upload
//                 label="Table Image"
//                 onChange={(file) =>
//                   setFormdata((prev) => ({
//                     ...prev,
//                     image: file,
//                   }))
//                 }
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-md
//                 font-medium hover:bg-blue-700 transition"
//               >
//                 {edittable ? "Update Table" : "Create Table"}
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }
// import React, { useState, useEffect } from "react";

// import { useSelector, useDispatch } from "react-redux";
// import ConfirmationModal from "../comman/ConfirmationModal";
// import {
//   createTable,
//   getalltable,
//   updateTableStatus,
// } from "../../services/tableApi";
// import {cancelTableBooking} from '../../services/tablebookingApi'
// import { setTable, setEditTable } from "../../slices/tableSlice";
// import Upload from "./Upload";

// export default function Tablecontainer() {
//   const { token, user } = useSelector((state) => state.auth);
//   const { tables, table, edittable } = useSelector((state) => state.table);
//   const dispatch = useDispatch();

//   // 🔥 Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTableId, setSelectedTableId] = useState(null);

//   // 🔍 Search
//   const [searchTableNo, setSearchTableNo] = useState("");

//   // 🛠 Admin Form
//   const [formdata, setFormdata] = useState({
//     tableNumber: "",
//     capacity: "",
//     status: "available",
//     image: null,
//   });

//   // ---------------- BOOK TABLE ----------------
//   function tablebooking(tableid) {
//     setSelectedTableId(tableid);
//     setShowModal(true);
//   }

//   // ---------------- FORM HANDLERS ----------------
//   function changehandler(e) {
//     const { name, value } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("tableNumber", formdata.tableNumber);
//     data.append("capacity", formdata.capacity);
//     data.append("status", formdata.status);

//     if (formdata.image) {
//       data.append("image", formdata.image);
//     }

//     if (edittable && table?._id) {
//       dispatch(updateTableStatus(table._id, data, token));
//     } else {
//       dispatch(createTable(data, token));
//     }

//     setFormdata({
//       tableNumber: "",
//       capacity: "",
//       status: "available",
//       image: null,
//     });

//     dispatch(setEditTable(false));
//   }

//   function editHandler(selectedTable) {
//     dispatch(setTable(selectedTable));
//     dispatch(setEditTable(true));

//     setFormdata({
//       tableNumber: selectedTable.tableNumber,
//       capacity: selectedTable.capacity,
//       status: selectedTable.status || "available",
//       image: null,
//     });
//   }

//   // ---------------- FETCH TABLES ----------------
//   useEffect(() => {
//     if (token) {
//       dispatch(getalltable(token));
//     }
//   }, [dispatch, token]);

//   // ---------------- FILTER ----------------
//   const filtertables = tables.filter((t) =>
//     t.tableNumber.toString().includes(searchTableNo)
//   );

// function cancelbooking(tablebookingid) {
//   if (token) {
//     dispatch(
//       cancelTableBooking(
//         { tablebooking_id: tablebookingid }, // 🔥 send object
//         token
//       )
//     );
//   }
// }


//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       {/* HEADER */}
//       <div className="mb-10">
//         <h1 className="text-3xl font-semibold text-slate-800">
//           Table Management
//         </h1>
//         <p className="text-slate-500 mt-1">
//           View restaurant tables and availability
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Table Number..."
//           value={searchTableNo}
//           onChange={(e) => setSearchTableNo(e.target.value)}
//           className="w-full border rounded-md px-4 py-2"
//         />
//       </div>

//       {/* TABLE LIST */}
//       <div className="space-y-4">
//         {filtertables.map((t) => (
//           <div
//             key={t._id}
//             className="flex items-center justify-between bg-white border rounded-lg p-5"
//           >
//             {/* LEFT SIDE */}
//             <div className="flex items-center gap-4">
//               {t.image && (
//                 <img
//                   src={t.image}
//                   alt="table"
//                   className="w-24 h-16 object-cover rounded-md border"
//                 />
//               )}

//               <div>
//                 <p className="text-lg font-medium">
//                   Table {t.tableNumber}
//                 </p>
//                 <p className="text-sm text-slate-500">
//                   Capacity: {t.capacity}
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   t.status === "available"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {t.status}
//               </span>

//               {/* USER BOOK BUTTON */}
//               {user?.accountType === "User" && (
//                 <button
//                   onClick={() => tablebooking(t._id)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md"
//                   // disabled={t.status !== "available"}
//                 >
//                   Book Table
//                 </button>

                
//               )
//               }

//      {user?.accountType === "User" && (
//                 <button
//                   onClick={() => cancelbooking(t._id)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md"
                 
//                 >
//                   Cancel Table
//                 </button>

                
//               )
//               }
           

//               {/* ADMIN EDIT */}
//               {user?.accountType === "Admin" && (
//                 <button
//                   onClick={() => editHandler(t)}
//                   className="text-blue-600 text-sm"
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🔥 MODAL OUTSIDE MAP */}
//       {showModal && (
//         <ConfirmationModal
//           tableId={selectedTableId}
//           closeModal={() => setShowModal(false)}
//         />
//       )}

//       {/* ADMIN FORM */}
//       {user?.accountType === "Admin" && (
//         <div className="bg-white border rounded-lg p-6 mt-10">
//           <h2 className="text-xl font-semibold mb-4">
//             {edittable ? "Edit Table" : "Create Table"}
//           </h2>

//           <form onSubmit={submitHandler} className="space-y-4">
//             <input
//               type="number"
//               name="tableNumber"
//               placeholder="Table Number"
//               value={formdata.tableNumber}
//               onChange={changehandler}
//               className="w-full border px-3 py-2 rounded-md"
//               required
//             />

//             <input
//               type="number"
//               name="capacity"
//               placeholder="Capacity"
//               value={formdata.capacity}
//               onChange={changehandler}
//               className="w-full border px-3 py-2 rounded-md"
//               required
//             />

//             <select
//               name="status"
//               value={formdata.status}
//               onChange={changehandler}
//               className="w-full border px-3 py-2 rounded-md"
//             >
//               <option value="available">Available</option>
//               <option value="occupied">Occupied</option>
//             </select>

//             <Upload
//               label="Table Image"
//               onChange={(file) =>
//                 setFormdata((prev) => ({
//                   ...prev,
//                   image: file,
//                 }))
//               }
//             />

//             <button className="w-full bg-blue-600 text-white py-2 rounded-md">
//               {edittable ? "Update Table" : "Create Table"}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   createTable,
//   getalltable,
//   updateTableStatus,
// } from "../../services/tableApi";
// // import { cancelTableBooking } from "../../services/tablebookingApi";
// import { setTable, setEditTable } from "../../slices/tableSlice";
// import Upload from "./Upload";
// import TableBooking from "../Dashboard/tablebooking/tablebooking"; // ✅ NEW

// export default function Tablecontainer() {
//   const { token, user } = useSelector((state) => state.auth);
//   const { tables, table, edittable } = useSelector((state) => state.table);
//   const dispatch = useDispatch();

//   // 🔥 Booking Modal State
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [selectedTableId, setSelectedTableId] = useState(null);

//   // 🔍 Search
//   const [searchTableNo, setSearchTableNo] = useState("");

//   // 🛠 Admin Form
//   const [formdata, setFormdata] = useState({
//     tableNumber: "",
//     capacity: "",
//     status: "available",
//     image: null,
//   });

//   // ---------------- BOOK TABLE ----------------
//   function handleBookTable(tableId) {
//     setSelectedTableId(tableId);
//     setShowBookingModal(true);
//   }

//   // ---------------- CANCEL BOOKING ----------------
//   // function handleCancelBooking(bookingId) {
//   //   if (token) {
//   //     dispatch(
//   //       cancelTableBooking(
//   //         { tablebooking_id: bookingId }, // ⚠️ must be booking ID, not table ID
//   //         token
//   //       )
//   //     );
//   //   }
//   // }

//   // ---------------- FORM HANDLERS ----------------
//   function changehandler(e) {
//     const { name, value } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("tableNumber", formdata.tableNumber);
//     data.append("capacity", formdata.capacity);
//     data.append("status", formdata.status);

//     if (formdata.image) {
//       data.append("image", formdata.image);
//     }

//     if (edittable && table?._id) {
//       dispatch(updateTableStatus(table._id, data, token));
//     } else {
//       dispatch(createTable(data, token));
//     }

//     setFormdata({
//       tableNumber: "",
//       capacity: "",
//       status: "available",
//       image: null,
//     });

//     dispatch(setEditTable(false));
//   }

//   function editHandler(selectedTable) {
//     dispatch(setTable(selectedTable));
//     dispatch(setEditTable(true));

//     setFormdata({
//       tableNumber: selectedTable.tableNumber,
//       capacity: selectedTable.capacity,
//       status: selectedTable.status || "available",
//       image: null,
//     });
//   }

//   // ---------------- FETCH TABLES ----------------
//   useEffect(() => {
//     if (token) {
//       dispatch(getalltable(token));
//     }
//   }, [dispatch, token]);

//   // ---------------- FILTER ----------------
//   const filtertables = tables.filter((t) =>
//     t.tableNumber.toString().includes(searchTableNo)
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-10">
//       {/* HEADER */}
//       <div className="mb-10">
//         <h1 className="text-3xl font-semibold text-slate-800">
//           Table Management
//         </h1>
//         <p className="text-slate-500 mt-1">
//           View restaurant tables and availability
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Table Number..."
//           value={searchTableNo}
//           onChange={(e) => setSearchTableNo(e.target.value)}
//           className="w-full border rounded-md px-4 py-2"
//         />
//       </div>

//       {/* TABLE LIST */}
//       <div className="space-y-4">
//         {filtertables.map((t) => (
//           <div
//             key={t._id}
//             className="flex items-center justify-between bg-white border rounded-lg p-5"
//           >
//             {/* LEFT */}
//             <div className="flex items-center gap-4">
//               {t.image && (
//                 <img
//                   src={t.image}
//                   alt="table"
//                   className="w-24 h-16 object-cover rounded-md border"
//                 />
//               )}

//               <div>
//                 <p className="text-lg font-medium">
//                   Table {t.tableNumber}
//                 </p>
//                 <p className="text-sm text-slate-500">
//                   Capacity: {t.capacity}
//                 </p>
//                     <p className="text-sm text-slate-500">
//                   Price: {t.price}
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   t.status === "available"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {t.status}
//               </span>

//               {/* USER BUTTONS */}
//               {user?.accountType === "User" && (
//                 <>
//                   <button
//                     onClick={() => handleBookTable(t._id)}
//                     disabled={t.status !== "available"}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
//                   >
//                     Book Table
//                   </button>

//                   {/* ⚠️ Replace bookingId properly when you fetch user's bookings */}
//                   {/* <button
//                     onClick={() => handleCancelBooking(t.bookingId)}
//                     className="bg-red-600 text-white px-4 py-2 rounded-md"
//                   >
//                     Cancel
//                   </button> */}
//                 </>
//               )}

//               {/* ADMIN EDIT */}
//               {user?.accountType === "Admin" && (
//                 <button
//                   onClick={() => editHandler(t)}
//                   className="text-blue-600 text-sm"
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🔥 BOOKING MODAL */}
//       {showBookingModal && (
//         <TableBooking
//           tableId={selectedTableId}
//           closeModal={() => setShowBookingModal(false)}
//         />
//       )}

//       {/* ADMIN FORM */}
//       {user?.accountType === "Admin" && (
//         <div className="bg-white border rounded-lg p-6 mt-10">
//           <h2 className="text-xl font-semibold mb-4">
//             {edittable ? "Edit Table" : "Create Table"}
//           </h2>

//           <form onSubmit={submitHandler} className="space-y-4">
//             <input
//               type="number"
//               name="tableNumber"
//               placeholder="Table Number"
//               value={formdata.tableNumber}
//               onChange={changehandler}
//               className="w-full border px-3 py-2 rounded-md"
//               required
//             />

//             <input
//               type="number"
//               name="capacity"
//               placeholder="Capacity"
//               value={formdata.capacity}
//               onChange={changehandler}
//               className="w-full border px-3 py-2 rounded-md"
//               required
//             />

//             <select
//               name="status"
//               value={formdata.status}
//               onChange={changehandler}
//               className="w-full border px-3 py-2 rounded-md"
//             >
//               <option value="available">Available</option>
//               <option value="occupied">Occupied</option>
//             </select>

//             <Upload
//               label="Table Image"
//               onChange={(file) =>
//                 setFormdata((prev) => ({
//                   ...prev,
//                   image: file,
//                 }))
//               }
//             />

//             <button className="w-full bg-blue-600 text-white py-2 rounded-md">
//               {edittable ? "Update Table" : "Create Table"}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createTable,
  getalltable,
  updateTableStatus,
} from "../../services/tableApi";
import { setTable, setEditTable } from "../../slices/tableSlice";
import Upload from "./Upload";
import TableBooking from "../Dashboard/tablebooking/tablebooking";

export default function Tablecontainer() {
  const { token, user } = useSelector((state) => state.auth);
  const { tables, table, edittable } = useSelector((state) => state.table);
  const dispatch = useDispatch();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [searchTableNo, setSearchTableNo] = useState("");

  const [formdata, setFormdata] = useState({
    tableNumber: "",
    capacity: "",
    status: "available",
    image: null,
  });

  function handleBookTable(tableId) {
    setSelectedTableId(tableId);
    setShowBookingModal(true);
  }

  function changehandler(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("tableNumber", formdata.tableNumber);
    data.append("capacity", formdata.capacity);
    data.append("status", formdata.status);

    if (formdata.image) {
      data.append("image", formdata.image);
    }

    if (edittable && table?._id) {
      dispatch(updateTableStatus(table._id, data, token));
    } else {
      dispatch(createTable(data, token));
    }

    setFormdata({
      tableNumber: "",
      capacity: "",
      status: "available",
      image: null,
    });

    dispatch(setEditTable(false));
  }

  function editHandler(selectedTable) {
    dispatch(setTable(selectedTable));
    dispatch(setEditTable(true));

    setFormdata({
      tableNumber: selectedTable.tableNumber,
      capacity: selectedTable.capacity,
      status: selectedTable.status || "available",
      image: null,
    });
  }

  useEffect(() => {
    if (token) {
      dispatch(getalltable(token));
    }
  }, [dispatch, token]);

  const filtertables = tables.filter((t) =>
    t.tableNumber.toString().includes(searchTableNo)
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white px-4 sm:px-10 py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.92)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-yellow-400 tracking-wider">
          Royal Dining Experience
        </h1>
        <p className="text-gray-300 mt-4 text-lg">
          Elegant Atmosphere • Premium Service • Fine Dining
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-10 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search Table Number..."
          value={searchTableNo}
          onChange={(e) => setSearchTableNo(e.target.value)}
          className="w-full bg-white/10 border border-yellow-500/30 px-4 py-3 rounded-xl backdrop-blur-md focus:ring-2 focus:ring-yellow-500 outline-none transition"
        />
      </div>

      {/* TABLE LIST */}
      <div className="space-y-10 max-w-6xl mx-auto">
        {filtertables.map((t) => (
          <div
            key={t._id}
            className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-yellow-500/40 hover:-translate-y-3 transition duration-500"
          >
            <div className="grid md:grid-cols-2 items-center">

              {/* IMAGE */}
              {t.image && (
                <div className="overflow-hidden">
                  <img
                    src={t.image}
                    alt="table"
                    className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="p-8 space-y-4">
                <h2 className="text-3xl font-semibold text-yellow-400">
                  Table {t.tableNumber}
                </h2>

                <p className="text-gray-300 text-lg">
                  Capacity: {t.capacity}
                </p>

                <p className="text-green-400 text-xl font-semibold">
                  ₹{t.price || "Premium"}
                </p>

                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                    t.status === "available"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {t.status}
                </span>

                {user?.accountType === "User" && (
                  <button
                    onClick={() => handleBookTable(t._id)}
                    disabled={t.status !== "available"}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl font-semibold hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/40 transition duration-300 disabled:opacity-40"
                  >
                    Reserve Table
                  </button>
                )}

                {user?.accountType === "Admin" && (
                  <button
                    onClick={() => editHandler(t)}
                    className="mt-4 px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105 transition duration-300 shadow-lg"
                  >
                    Edit Table
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <TableBooking
          tableId={selectedTableId}
          closeModal={() => setShowBookingModal(false)}
        />
      )}

      {/* ADMIN FORM */}
      {user?.accountType === "Admin" && (
        <div className="max-w-4xl mx-auto mt-20 bg-white/10 backdrop-blur-xl border border-yellow-500/30 p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-semibold mb-8 text-yellow-400 text-center">
            {edittable ? "Edit Premium Table" : "Create Premium Table"}
          </h2>

          <form onSubmit={submitHandler} className="space-y-6">
            <input
              type="number"
              name="tableNumber"
              placeholder="Table Number"
              value={formdata.tableNumber}
              onChange={changehandler}
              className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
              required
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formdata.capacity}
              onChange={changehandler}
              className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
              required
            />

            <select
              name="status"
              value={formdata.status}
              onChange={changehandler}
              className="w-full bg-white/10 border border-white/20 px-4 py-3 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>

            <Upload
              label="Table Image"
              onChange={(file) =>
                setFormdata((prev) => ({
                  ...prev,
                  image: file,
                }))
              }
            />

            <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 py-4 rounded-2xl font-semibold hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/50 transition duration-300">
              {edittable ? "Update Table" : "Create Table"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

