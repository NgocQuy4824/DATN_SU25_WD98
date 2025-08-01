const mongoose = require("mongoose");
const ROLE = require("../constants/role");
const bcrypt = require("bcrypt");
const paginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "Chưa cập nhật",
    },
    avatar: {
      type: String,
      default: "https://i.imgur.com/HeIi0wU.png",
    },
    imageUrlRef: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(paginate);

// hashpassword
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
