const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary từ biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình nơi lưu trữ là Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product_images", // Thư mục trên Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

// Tạo middleware upload với filter cho ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép file ảnh jpeg, jpg, png, gif"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
