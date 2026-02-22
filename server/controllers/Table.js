const Table = require("../model/Table");




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

