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
      // Keep source resolution to avoid blurry room/gallery images.
      // Any display resizing should happen in the frontend UI, not at upload time.
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
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
