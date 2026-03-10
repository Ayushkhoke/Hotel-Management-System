// const express = require("express");
// const app = express();

// const dotenv = require("dotenv");
// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const fileupload = require("express-fileupload");
// const os = require("os");
// // Routes import

// const userRoutes=require("./routes/user")
// const roomRoutes=require("./routes/room")
// const tableRoutes=require("./routes/table")
// const bookingRoutes=require("./routes/booking")


// // 🔹 Load environment variables
// dotenv.config();

// // 🔹 Connect to database
// database.connect();

// // 🔹 Port
// const PORT = process.env.PORT || 4000;

// // 🔹 Allowed origins
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
// ];

// // 🔹 CORS configuration
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // 🔹 Middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   fileupload({
//     useTempFiles: true,
//     tempFileDir: os.tmpdir(),
//   })
// );

// //mount app
// app.use("/api/v1/auth",userRoutes);
// app.use("/api/v1/table",tableRoutes);
// app.use("/api/v1/room",roomRoutes);
// app.use("/api/v1/booking",bookingRoutes);
// // 🔹 Routes
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is up and running",
//   });
// });

// // 🔹 Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const fileupload = require("express-fileupload");
const os = require("os");

const database = require("./config/database");

const userRoutes = require("./routes/user");
const tableRoutes = require("./routes/table");
const roomRoutes = require("./routes/room");
const bookingRoutes = require("./routes/booking");
const paymentRoutes=require("./routes/payment");
const aiRoutes = require("./routes/aiRoutes");
const contactRoutes = require("./routes/contact");
dotenv.config();
database.connect();

const PORT = process.env.PORT || 4000;

// app.use(cors({
//   origin: ["http://localhost:3000", "http://localhost:5173","https://hotel-management-system-silk-sigma.vercel.app"],
//   credentials: true
// }));


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://hotel-management-system-silk-sigma.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.options(/.*/, cors());

app.use(express.json());
app.use(cookieParser());

// app.use(fileupload({
//   useTempFiles: true,
//   tempFileDir: os.tmpdir()
// }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/table", tableRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/aireceptionist", aiRoutes);
app.use("/api/v1/contact", contactRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
