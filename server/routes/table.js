const express=require("express")
const router=express.Router()
const {
  createTable,
  getTables,
  updateTableStatus
} = require("../controllers/Table");
const {
  bookTable,
  cancelTableBooking,
  getMyTableBookings 
} = require("../controllers/TableBooking");

const{
    auth,isAdmin
}=require("../middlewares/auth");

const { upload } = require("../middlewares/upload");


// table creation 

router.post("/createTable", auth,isAdmin,
   (req, res, next) => {
    console.log("BEFORE MULTER");
    next();
  },
    upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ])
  ,createTable);
router.get("/getTables",getTables);
// router.put("/updateTableStatus",auth,isAdmin,updateTableStatus);
router.put(
  "/updateTableStatus",
  auth,
  isAdmin,
  upload.single("image"),
  updateTableStatus
);


//table bookings 
router.post("/bookTable", auth, bookTable);
// Cancel table booking
router.put("/cancelbooking", auth, cancelTableBooking);
router.get("/getmybooking", auth, getMyTableBookings);


module.exports = router;