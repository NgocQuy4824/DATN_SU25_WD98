const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tạo storage cho avatar
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    return {
      folder: "avatars",
      public_id: `${baseName}-${Date.now()}`,
      transformation: [{ width: 300, height: 300, crop: "limit" }],
      allowed_formats: ["jpg", "jpeg", "png", "gif"],
    };
  },
});

// Kiểm tra loại file upload
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("File không hợp lệ. Chỉ chấp nhận ảnh jpeg, jpg, png, gif."));
  }
};

// Multer middleware
const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = uploadAvatar;
