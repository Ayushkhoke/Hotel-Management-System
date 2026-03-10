const Room=require("../model/Room");
const User = require("../model/User");



// exports.createRoom = async (req, res) => {
//   try {
//     const { roomNumber,type,capacity, pricePerNight,image,isAvailable} = req.body;
   
// const adminId=req.user.id;
  
//     // validation
//     if (!roomNumber || !type || !capacity || !pricePerNight || !image) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // check room exists
//     const roomExists = await Room.findOne({ roomNumber });
//     if (roomExists) {
//       return res.status(409).json({
//         success: false,
//         message: "Room already exists",
//       });
//     }

//    if(!adminId){
//  return res.status(400).json({
//     success:false,
//     message:"the user is not admin"
//    })
//    }
    
//     // create room
//     const room = await Room.create({
     
//       roomNumber,
//       type,
//       capacity,
//       pricePerNight,
//      image,
//   isAvailable,
//        admin:adminId
//     });

//     res.status(201).json({
//       success: true,
//       message: "Room created successfully",
//       room,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create room",
//       error: error.message,
//     });
//   }
// };


exports.createRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      type,
      capacity,
      pricePerNight,
      isAvailable = true,
    } = req.body;

    const adminId = req.user.id;
    const uploadedImages = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];

    if (!roomNumber || !type || !capacity || !pricePerNight || !uploadedImages.length) {
      return res.status(400).json({
        success: false,
        message: "All fields including room images are required",
      });
    }

    // ✅ CHECK ROOM EXISTS
    const roomExists = await Room.findOne({ roomNumber });
    if (roomExists) {
      return res.status(409).json({
        success: false,
        message: "Room already exists",
      });
    }

    const room = await Room.create({
      roomNumber,
      type,
      capacity,
      pricePerNight,
      image: uploadedImages[0],
      images: uploadedImages,
      isAvailable,
      admin: adminId,
    });

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create room",
      error: error.message,
    });
  }
};




/// update room
exports.updateRoom = async (req, res) => {
  try {
    console.log("update roo m hit ");
    const { roomid } = req.body;

    if (!roomid) {
      return res.status(400).json({
        success: false,
        message: "roomid is required",
      });
    }
const existingRoom = await Room.findOne({
  roomNumber: req.body.roomNumber,
  _id: { $ne: roomid }
});

if (existingRoom) {
  return res.status(409).json({
    success: false,
    message: "Room number already exists",
  });
}

    // build update object safely
    const updateData = {};

    if (req.body.roomNumber !== undefined)
      updateData.roomNumber = req.body.roomNumber;

    if (req.body.type !== undefined)
      updateData.type = req.body.type;

    if (req.body.capacity !== undefined)
      updateData.capacity = req.body.capacity;

    if (req.body.pricePerNight !== undefined)
      updateData.pricePerNight = req.body.pricePerNight;

    if (req.body.isAvailable !== undefined)
      updateData.isAvailable = req.body.isAvailable;

    const uploadedImages = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];

    if (uploadedImages.length) {
      updateData.image = uploadedImages[0];
      updateData.images = uploadedImages;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomid,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: updatedRoom,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




//delete room
exports.deleteRoom = async (req, res) => {
  try {
    const { roomid } = req.body;

    const deletedRoom  = await Room.findByIdAndDelete(roomid);
    if (!deletedRoom ) {
      return res.status(400).json({
         success: false,
          message: "Room not found" });
    }



    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message });
  }
};

// PUBLIC → Get all rooms (availability)
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get available rooms for specific date range
exports.getAvailableRooms = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: "Check-in and check-out dates are required",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out must be after check-in",
      });
    }

    // Get all rooms
    const allRooms = await Room.find();

    // Find rooms with overlapping bookings
    const Booking = require("../model/Booking");
    const overlappingBookings = await Booking.find({
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
      status: "booked",
    }).select("room");

    const bookedRoomIds = overlappingBookings.map((booking) => booking.room.toString());

    // Filter out booked rooms
    const availableRooms = allRooms.filter(
      (room) => room.isAvailable && !bookedRoomIds.includes(room._id.toString())
    );

    res.status(200).json({
      success: true,
      rooms: availableRooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


