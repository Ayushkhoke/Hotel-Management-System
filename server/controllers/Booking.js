const Booking = require("../model/Booking");
const Room = require("../model/Room");
const User = require("../model/User");

// exports.bookRoom = async (req, res) => {

// try{
//     const { room, checkIn, checkOut, totalPrice } = req.body;

//   const userId=req.user.id;

//     const roomExists = await Room.findById(room);
//     if (!roomExists) {
//       return res.status(404).json({
//         success: false,
//         message: "Room not found",
//       });
//     }

//      // 1. Check overlapping bookings
//     const alreadyBooked = await Booking.findOne({
//       room:req.body.room,
//       checkIn: { $lt: checkOut },
//       checkOut: { $gt: checkIn }
//     });

//     if (alreadyBooked) {
//       return res.status(400).json({
//         success: false,
//         message: "Room already booked for selected dates"
//       });
//     }

//   const booking = await Booking.create({
//    user:userId,
//     room,
//     checkIn,
//     checkOut,
//     totalPrice
//   });

//   return res.status(200).json({ 
//     success: true, booking }
//   );
// }
// catch(error){
//   return res.status(500).json({
//     success:false,
//     message:"the user was not able to book room"
//   })
// }
// };




exports.bookRoom = async (req, res) => {
  try {
    const { room, checkIn, checkOut, totalPrice } = req.body;
    const userId = req.user.id;

    if (!room || !checkIn || !checkOut || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate date logic
    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).json({
        success: false,
        message: "Check-out must be after check-in",
      });
    }

    // Check room exists
    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Overlapping booking check
    const alreadyBooked = await Booking.findOne({
      room: room,
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },
      status: "booked",
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "Room already booked for selected dates",
      });
    }

    const booking = await Booking.create({
      user: userId,
      room,
      checkIn,
      checkOut,
      totalPrice,
    });

    return res.status(200).json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User was not able to book room",
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate("room")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch bookings",
    });
  }
};

exports.deleteBooking=async(req,res)=>{
  try{
    const{bookingId}=req.body;

    if(!bookingId){
  return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }
    const booking=await Booking.findByIdAndDelete(bookingId);

    if(!booking){
  return res.status(400).json({
    success:false,
    message:"not able to delete the booking"
  })
    }
       return res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });

  }
  catch(error){
   return res.status(500).json({
      success: false,
      message: "unable to delete successfully"
    });
  }
}