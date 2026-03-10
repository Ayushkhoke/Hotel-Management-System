const Table = require("../model/Table");
const TableBooking = require("../model/TableBooking");




// ADMIN → Create table
// exports.createTable = async (req, res) => {
//   try {
//     const { tableNumber, capacity, status, image } = req.body;

//     // validation
//     if (!tableNumber || !capacity) {
//       return res.status(400).json({
//         success: false,
//         message: "Insert table number and capacity"
//       });
//     }

//     // prevent duplicate table number
//     const exists = await Table.findOne({ tableNumber });
//     if (exists) {
//       return res.status(400).json({
//         success: false,
//         message: "Table already exists"
//       });
//     }

//     const table = await Table.create({
//       tableNumber,
//       capacity,
//       status: status || "available",   // default
//       image: image || null              // optional
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Table created successfully",
//       table
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to create table",
//       error: error.message
//     });
//   }
// };


// create table with image + video
// exports.createTable = async (req, res) => {
//   try {
//     const { tableNumber, capacity, status } = req.body;

//     if (!tableNumber || !capacity || !status ||!req.files?.image) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required",
//       });
//     }

//     const exists = await Table.findOne({ tableNumber });
//     if (exists) {
//       return res.status(400).json({
//         success: false,
//         message: "Table already exists",
//       });
//     }

//     const table = await Table.create({
//       tableNumber,
//       capacity,
//       status: status || "available",
//       image: req.files?.image?.[0]?.path || null,
//       video: req.files?.video?.[0]?.path || null,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Table created",
//       table,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.createTable = async (req, res) => {
  try {
    console.log("CREATE TABLE CONTROLLER HIT");
    const { tableNumber, capacity, status,price } = req.body;
console.log("BODY:", req.body);
console.log("FILES:", req.files);
   if (!req.files || !req.files.image || req.files.image.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
console.log("CONTENT-TYPE:", req.headers["content-type"]);
console.log("FILES:", req.files);

    if (
      !tableNumber ||
      !capacity ||
      !status ||
      !req.files ||
      !req.files.image ||
      req.files.image.length === 0 ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const exists = await Table.findOne({ tableNumber });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Table already exists",
      });
    }

    const table = await Table.create({
      tableNumber,
      capacity,
      status,
      image: req.files.image[0].path,
      video: req.files?.video?.[0]?.path || null,
      price
    });


    return res.status(200).json({
      success: true,
      message: "Table created",
      table,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// PUBLIC → Get all tables (availability)
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();

    res.status(200).json({
      success: true,
      tables
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET AVAILABLE TABLES FOR SPECIFIC DATE AND TIME SLOT
exports.getAvailableTables = async (req, res) => {
  try {
    const { date, timeSlot } = req.query;

    console.log("getAvailableTables called with:", { date, timeSlot });

    if (!date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Date and time slot are required",
      });
    }

    // Validate timeSlot
    const validSlots = ["morning", "afternoon", "evening", "night"];
    if (!validSlots.includes(timeSlot)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time slot. Choose: morning, afternoon, evening, or night",
      });
    }

    // Convert date properly
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    console.log("Searching for date:", selectedDate);

    // Get all tables
    const allTables = await Table.find();
    console.log(`Found ${allTables.length} total tables`);
    console.log("Sample table:", allTables[0]);

    // Find tables with CONFIRMED bookings for this date/slot (exclude pending)
    const TableBooking = require("../model/TableBooking");
    const bookedTables = await TableBooking.find({
      date: selectedDate,
      timeSlot: timeSlot,
      status: { $in: ["paid", "active"] }, // Only confirmed bookings block tables
    }).select("table");

    console.log(`Found ${bookedTables.length} booked tables for this slot`);

    const bookedTableIds = bookedTables.map((booking) => booking.table.toString());

    // Filter out booked tables
    const availableTables = allTables.filter(
      (table) => !bookedTableIds.includes(table._id.toString())
    );

    console.log(`Returning ${availableTables.length} available tables`);

    res.status(200).json({
      success: true,
      tables: availableTables,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ADMIN → Update table status (available / occupied)
// exports.updateTableStatus = async (req, res) => {
//   try {
//     const { table_id, status } = req.body;

//     if (!table_id || !status) {
//       return res.status(400).json({
//         success: false,
//         message: "table_id and status are required"
//       });
//     }

//     if (!["available", "occupied"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status"
//       });
//     }

//     const table = await Table.findByIdAndUpdate(
//       table_id,
//       { status },
//       { new: true }
//     );

//     if (!table) {
//       return res.status(404).json({
//         success: false,
//         message: "Table not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Table status updated",
//       table
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


// ADMIN → Update table (all fields + image)
// ADMIN → Update table (all fields + image)
exports.updateTableStatus = async (req, res) => {
  try {
    console.log("update table hit");
 // ✅ DEBUG LOGS (PUT HERE)
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const { table_id, tableNumber, capacity, status } = req.body;

    // 🔴 required check
    if (!table_id) {
      return res.status(400).json({
        success: false,
        message: "table_id is required",
      });
    }

    // 🔴 status validation
    if (status && !["available", "occupied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // 🔴 table number uniqueness check
    if (tableNumber !== undefined) {
      const existingtable = await Table.findOne({
        tableNumber,
        _id: { $ne: table_id },
      });

      if (existingtable) {
        return res.status(400).json({
          success: false,
          message: "the table already exist",
        });
      }
    }

    // 🔴 build update object
    const updateData = {};
    if (tableNumber !== undefined) updateData.tableNumber = tableNumber;
    if (capacity !== undefined) updateData.capacity = capacity;
    if (status !== undefined) updateData.status = status;

    // ✅ FIXED IMAGE UPDATE
    if (req.file) {
      updateData.image = req.file.path; // 🔥 Cloudinary URL
    }

    const table = await Table.findByIdAndUpdate(
      table_id,
      updateData,
      { new: true }
    );

    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Table updated successfully",
      table,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN → Delete table
exports.deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Table ID is required",
      });
    }

    // Check if table exists
    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }

    // Check for active bookings (paid or confirmed)
    const activeBookings = await TableBooking.find({
      table: id,
      status: { $in: ["paid", "confirmed"] },
    });

    // If there are active bookings and no force flag, return error with booking details
    if (activeBookings.length > 0 && req.query.force !== "true") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete table with active bookings. Please cancel or complete the bookings first.",
        activeBookingsCount: activeBookings.length,
        requiresForce: true,
      });
    }

    // If force delete, cancel all associated bookings
    if (activeBookings.length > 0 && req.query.force === "true") {
      await TableBooking.updateMany(
        { table: id },
        { status: "cancelled" }
      );
      console.log(`Cancelled ${activeBookings.length} bookings for table ${table.tableNumber}`);
    }

    // Delete the table
    await Table.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Table deleted successfully",
      deletedTable: {
        id: table._id,
        tableNumber: table.tableNumber,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

