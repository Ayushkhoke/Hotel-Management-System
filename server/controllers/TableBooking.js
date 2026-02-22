
// const TableBooking=require("../model/TableBooking");
// const Table=require("../model/Table")

// // BOOK TABLE
// exports.bookTable = async (req, res) => {
//   try {
//     const { table_id, date, timeSlot, guests} = req.body;

   
//     // Check table exists
//     const tableExists = await Table.findById(table_id);
//     if (!tableExists)
//       return res.status(404).json({ message: "Table not found" });
// req.table = tableExists;

//     // Prevent double booking (same table, date, slot)
//     const alreadyBooked = await TableBooking.findOne({
//         table: table_id, 
//       date,
//       timeSlot,
//       status:"occupied"
//     });

//     if (alreadyBooked)
//       return res.status(400).json({ 
//     success:false,
//     message: "Table already booked" });

//     const booking = await TableBooking.create({
//       user: req.user.id,
//       table:table_id,
//       date,
//       timeSlot,
//       guests,
//        status:"occupied"
//     });

// const populatedBooking = await booking.populate([
//   { path: "user", select: "name email" },
//   { path: "table", select: "tableNumber capacity" }
// ]);


//   return res.status(200).json({
//     success: true,
//     message: "Table booked successfully",
//     data: populatedBooking
//   })    

//   } catch (err) {
//    return res.status(500).json({
//     success: false,
//     message: "Failed to book table",
//     error: err.message
//   })
//   }
// };



// const TableBooking = require("../model/TableBooking");
// const Table = require("../model/Table");

// // BOOK TABLE
// exports.bookTable = async (req, res) => {
//   try {
//     console.log("table booking api hoit ");
//     const { table_id, date, timeSlot, guests } = req.body;

//     // 1️⃣ Check table exists
//     const tableExists = await Table.findById(table_id);
//     if (!tableExists) {
//       return res.status(404).json({
//         success: false,
//         message: "Table not found",
//       });
//     }

//     // 2️⃣ Prevent double booking (same table, date, slot)
//     const alreadyBooked = await TableBooking.findOne({
//       table: table_id,
//       date,
//       timeSlot,
//       status: "active",   // ✅ FIXED
//     });

//     if (alreadyBooked) {
//       return res.status(400).json({
//         success: false,
//         message: "Table already booked for this slot",
//       });
//     }

//     // 3️⃣ Create booking
//     const booking = await TableBooking.create({
//       user: req.user.id,
//       table: table_id,
//       date,
//       timeSlot,
//       guests,
//       status: "active",  // ✅ FIXED
//     });

//     // 4️⃣ Mark table as occupied
//     await Table.findByIdAndUpdate(table_id, {
//       status: "occupied",
//     });

//     // 5️⃣ Populate data
//     const populatedBooking = await booking.populate([
//       { path: "user", select: "name email" },
//       { path: "table", select: "tableNumber capacity" },
//     ]);

//     return res.status(200).json({
//       success: true,
//       message: "Table booked successfully",
//       data: populatedBooking,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to book table",
//       error: err.message,
//     });
//   }
// };



// const TableBooking = require("../model/TableBooking");
// const Table = require("../model/Table");


// exports.bookTable = async (req, res) => {
//   try {
//     console.log("table booking api has been hit ");
//     const { table_id, date, timeSlot, guests } = req.body;

//     console.log("Received table_id:", table_id);

//     if (!table_id || !date || !timeSlot || !guests) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // 1️⃣ Check table exists
//     const table = await Table.findById(table_id);

//     if (!table) {
//       return res.status(404).json({
//         success: false,
//         message: "Table not found",
//       });
//     }

//     // 2️⃣ Prevent double booking
//     const alreadyBooked = await TableBooking.findOne({
//       table: table_id,
//       date,
//       timeSlot,
//       status: { $in: ["paid", "active"] },
//     });

//     if (alreadyBooked) {
//       return res.status(400).json({
//         success: false,
//         message: "Table already booked for this slot",
//       });
//     }

//     // 3️⃣ Calculate total amount from table price
//     const totalAmount = table.price * Number(guests);

//     // 4️⃣ Create booking with amount
//     const booking = await TableBooking.create({
//       user: req.user.id,
//       table: table_id,
//       date,
//       timeSlot,
//       guests,
//       amount: totalAmount,   // 🔥 ADD THIS
//       status: "pending",
//     });

//     // 5️⃣ Populate table to send full info including price
//     const populatedBooking = await TableBooking.findById(booking._id)
//       .populate("table");


//       console.log("populated booking ",populatedBooking);
//     return res.status(200).json({
//       success: true,
//       message: "Booking created. Please complete payment.",
//       data: populatedBooking,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to book table",
//       error: err.message,
//     });
//   }
// };



const TableBooking = require("../model/TableBooking");
const Table = require("../model/Table");

exports.bookTable = async (req, res) => {
  try {
    console.log("Table booking API hit");

    const { table_id, date, timeSlot, guests } = req.body;

    // 🔍 Basic Validation
    if (!table_id || !date || !timeSlot || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔍 Convert date properly (VERY IMPORTANT FIX)
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // 🔍 Check table exists
    const table = await Table.findById(table_id);

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    // 🔍 Capacity validation
    if (Number(guests) > table.capacity) {
      return res.status(400).json({
        success: false,
        message: `Maximum capacity is ${table.capacity}`,
      });
    }

    // 🔍 Prevent double booking
    const alreadyBooked = await TableBooking.findOne({
      table: table_id,
      date: selectedDate,
      timeSlot,
      status: { $in: ["paid", "active"] },
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Table already booked for this slot",
      });
    }

    // 🔍 Calculate total amount
    const totalAmount = Number(table.price) * Number(guests);

    // 🔍 Create booking
    const booking = await TableBooking.create({
      user: req.user.id,
      table: table_id,
      date: selectedDate,
      timeSlot,
      guests: Number(guests),
      amount: totalAmount,
      status: "pending",
    });

    console.log("Booking created:", booking);

    // 🔍 Populate table details
    const populatedBooking = await TableBooking.findById(booking._id)
      .populate("table");

    console.log("Populated booking:", populatedBooking);

    return res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: populatedBooking,
    });

  } catch (err) {
    console.error("Booking Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to book table",
      error: err.message,
    });
  }
};


// // CANCEL TABLE BOOKING
// exports.cancelTableBooking = async (req, res) => {
//   try {
//     const { tablebooking_id } = req.body;

//     const booking = await TableBooking.findById(tablebooking_id);

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking not found",
//       });
//     }

//     // 🔥 Update booking status
//     booking.status = "available";
//     await booking.save();

//     // 🔥 Update table status
//     await Table.findByIdAndUpdate(
//       booking.table,
//       { status: "available" },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Booking cancelled successfully",
//       booking,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// controllers/tableBooking.js

exports.getMyTableBookings = async (req, res) => {
  try {
    const userId = req.user.id;
  console.log("hit get table api");
    const bookings = await TableBooking.find({ user: userId })
      .populate({
        path: "table",
        select: "tableNumber capacity image",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    console.error("GET MY TABLE BOOKINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch table bookings",
      error: error.message,
    });
  }
};



exports.cancelTableBooking = async (req, res) => {
  try {
    const { tablebooking_id } = req.body;

    const booking = await TableBooking.findById(tablebooking_id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // 🔐 Make sure logged-in user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this booking",
      });
    }

    // ❌ Already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    // ❌ Optional: prevent cancelling after active
    if (booking.status === "active") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel active booking",
      });
    }

    // ✅ Cancel booking
    booking.status = "cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });

  } catch (error) {
    console.error("CANCEL BOOKING ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};
