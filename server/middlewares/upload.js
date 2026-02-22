// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isVideo = file.mimetype.startsWith("video");

//     return {
//       folder: isVideo ? "tables/videos" : "tables/images",
//       resource_type: isVideo ? "video" : "image",
//       allowed_formats: isVideo
//         ? ["mp4", "mov", "avi", "mkv"]
//         : ["jpg", "png", "jpeg", "webp"],
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 500,
//   },
// });

// module.exports = { upload };


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "hotel-management/images",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ width: 800, height: 600, crop: "limit" }],
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // ✅ 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

module.exports = { upload };
