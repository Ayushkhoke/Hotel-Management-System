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
    // ❌ REMOVE THIS (WRONG)
    // console.log("token", req.body.token);
    console.log("create room hit");

    const {
      roomNumber,
      type,
      capacity,
      pricePerNight,
      isAvailable = true,
    } = req.body;

    const adminId = req.user.id;

    // ✅ VALIDATION (image from req.file)
    if (!roomNumber || !type || !capacity || !pricePerNight || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including image are required",
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

    // ✅ IMAGE URL FROM CLOUDINARY
    const imageUrl = req.file.path;

    const room = await Room.create({
      roomNumber,
      type,
      capacity,
      pricePerNight,
      image: imageUrl,
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

    // ✅ image from multer
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary URL
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


