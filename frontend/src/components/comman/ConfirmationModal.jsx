// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {useDispatch} from 'react-redux'
// // import{bookTable} from '../../services/tablebookingApi'

// // export default function ConfirmationModal({ tableId, closeModal }) {
// //   const navigate = useNavigate();
// // const [showModal, setShowModal] = useState(false);
// // const [selectedTableId, setSelectedTableId] = useState(null);

// //   const [bookingData, setBookingData] = useState({
// //     table_id: "",
// //     date:"",
// //     timeSlot: "evening",
// //     guests:" ",
// //   });
// //   const dispatch=useDispatch();

// //   function changeHandler(e) {
// //     const { name, value } = e.target;
// //     setBookingData((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   }

// //   function submitHandler(e) {
// //     e.preventDefault();
// //     console.log("BOOKING DATA:", bookingData);
// //     // call booking API here
// //     dispatch(bookTable(bookingData,token))
// //   }

// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// //       <form
// //         onSubmit={submitHandler}
// //         className="bg-white p-6 rounded-lg w-[350px] space-y-3"
// //       >
// //         <h2 className="text-lg font-semibold text-center">
// //           Confirm Booking
// //         </h2>

// //         <label>Table ID</label>
// //         <input
// //           type="text"
// //           name="table_id"
// //           value={bookingData.table_id}
// //           onChange={changeHandler}
// //           className="w-full border px-3 py-2 rounded-md"
// //           required
// //         />

// //         <label>Date</label>
// //         <input
// //           type="date"
// //           name="date"
// //           value={bookingData.date}
// //           onChange={changeHandler}
// //           className="w-full border px-3 py-2 rounded-md"
// //           required
// //         />

// //         <label>Time Slot</label>
// //         <select
// //           name="timeSlot"
// //           value={bookingData.timeSlot}
// //           onChange={changeHandler}
// //           className="w-full border px-3 py-2 rounded-md"
// //         >
// //           <option value="morning">Morning</option>
// //           <option value="evening">Evening</option>
// //           <option value="night">Night</option>
// //         </select>

// //         <label>Guests</label>
// //         <input
// //           type="number"
// //           name="guests"
// //           min="1"
// //           value={bookingData.guests}
// //           onChange={changeHandler}
// //           className="w-full border px-3 py-2 rounded-md"
// //           required
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-green-600 text-white py-2 rounded-md"
// //         >
// //           Book Table
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { bookTable } from "../../services/tablebookingApi";

// export default function ConfirmationModal({ tableId, closeModal }) {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [bookingData, setBookingData] = useState({
//     table_id: "",
//     date: "",
//     timeSlot: "evening",
//     guests: 1,
//   });

//   // 🔥 AUTO SET TABLE ID
//   useEffect(() => {
//     if (tableId) {
//       setBookingData((prev) => ({
//         ...prev,
//         table_id: tableId,
//       }));
//     }
//   }, [tableId]);

//   function changeHandler(e) {
//     const { name, value } = e.target;
//     setBookingData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function submitHandler(e) {
//     e.preventDefault();

//     dispatch(bookTable(bookingData, token));
//     closeModal();
//   }

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <form
//         onSubmit={submitHandler}
//         className="bg-white p-6 rounded-lg w-[350px] space-y-3"
//       >
//         <h2 className="text-lg font-semibold text-center">
//           Confirm Booking
//         </h2>

//         <p className="text-sm text-gray-500">
//           Table ID: {bookingData.table_id}
//         </p>

//         <label>Date</label>
//         <input
//           type="date"
//           name="date"
//           value={bookingData.date}
//           onChange={changeHandler}
//           className="w-full border px-3 py-2 rounded-md"
//           required
//         />

//         <label>Time Slot</label>
//         <select
//           name="timeSlot"
//           value={bookingData.timeSlot}
//           onChange={changeHandler}
//           className="w-full border px-3 py-2 rounded-md"
//         >
//           <option value="morning">Morning</option>
//           <option value="evening">Evening</option>
//           <option value="night">Night</option>
//         </select>

//         <label>Guests</label>
//         <input
//           type="number"
//           name="guests"
//           min="1"
//           value={bookingData.guests}
//           onChange={changeHandler}
//           className="w-full border px-3 py-2 rounded-md"
//           required
//         />

//         <div className="flex gap-3">
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-md"
//           >
//             Book Table
//           </button>

//           <button
//             type="button"
//             onClick={closeModal}
//             className="w-full bg-gray-400 text-white py-2 rounded-md"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { bookTable } from "../../services/tablebookingApi";

// export default function ConfirmationModal({ tableId, closeModal }) {
//   const { token } = useSelector((state) => state.auth);

//   const [bookingData, setBookingData] = useState({
//     table_id: "",
//     date: "",
//     timeSlot: "evening",
//     guests: 1,
//   });

//   // Auto set table ID
//   useEffect(() => {
//     if (tableId) {
//       setBookingData((prev) => ({
//         ...prev,
//         table_id: tableId,
//       }));
//     }
//   }, [tableId]);

//   function changeHandler(e) {
//     const { name, value } = e.target;
//     setBookingData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function submitHandler(e) {
//     e.preventDefault();

//     try {
//       await bookTable(bookingData, token);
//       closeModal(); // close only after success
//     } catch (error) {
//       // error already handled in service
//       console.log(error);
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <form
//         onSubmit={submitHandler}
//         className="bg-white p-6 rounded-lg w-[350px] space-y-3"
//       >
//         <h2 className="text-lg font-semibold text-center">
//           Confirm Booking
//         </h2>

//         <p className="text-sm text-gray-500">
//           Table ID: {bookingData.table_id}
//         </p>

//         <label>Date</label>
//         <input
//           type="date"
//           name="date"
//           value={bookingData.date}
//           onChange={changeHandler}
//           className="w-full border px-3 py-2 rounded-md"
//           required
//         />

//         <label>Time Slot</label>
//         <select
//           name="timeSlot"
//           value={bookingData.timeSlot}
//           onChange={changeHandler}
//           className="w-full border px-3 py-2 rounded-md"
//         >
//           <option value="morning">Morning</option>
//           <option value="evening">Evening</option>
//           <option value="night">Night</option>
//         </select>

//         <label>Guests</label>
//         <input
//           type="number"
//           name="guests"
//           min="1"
//           value={bookingData.guests}
//           onChange={changeHandler}
//           className="w-full border px-3 py-2 rounded-md"
//           required
//         />

//         <div className="flex gap-3">
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-md"
//           >
//             Book Table
//           </button>

//           <button
//             type="button"
//             onClick={closeModal}
//             className="w-full bg-gray-400 text-white py-2 rounded-md"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookTable } from "../../services/tablebookingApi";
import { getalltable } from "../../services/tableApi";

export default function ConfirmationModal({ tableId, closeModal }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [bookingData, setBookingData] = useState({
    table_id: "",
    date: "",
    timeSlot: "evening",
    guests: 1,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Auto set table_id
  useEffect(() => {
    if (tableId) {
      setBookingData((prev) => ({
        ...prev,
        table_id: tableId,
      }));
    }
  }, [tableId]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!bookingData.table_id || !bookingData.date) return;

    try {
      setLoading(true);

      await bookTable(bookingData, token);

      // 🔥 Refresh tables instantly
      dispatch(getalltable(token));

      // Reset form
      setBookingData({
        table_id: tableId,
        date: "",
        timeSlot: "evening",
        guests: 1,
      });

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg w-[350px] space-y-4"
      >
        <h2 className="text-lg font-semibold text-center">
          Confirm Booking
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Table ID: {bookingData.table_id}
        </p>

        {/* Date */}
        <div>
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={bookingData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={changeHandler}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-sm mb-1">Time Slot</label>
          <select
            name="timeSlot"
            value={bookingData.timeSlot}
            onChange={changeHandler}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm mb-1">Guests</label>
          <input
            type="number"
            name="guests"
            min="1"
            value={bookingData.guests}
            onChange={changeHandler}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md disabled:bg-green-300"
          >
            {loading ? "Booking..." : "Book Table"}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="w-full bg-gray-400 text-white py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
