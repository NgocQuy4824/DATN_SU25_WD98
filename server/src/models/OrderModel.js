const mongoose = require("mongoose");
const ROLE = require("../constants/role");
const STATUS = require("../constants/status");
const paginate = require("mongoose-paginate-v2");

const orderProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    variantId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false, id: false, versionKey: false, timestamps: false }
);

const orderStatusLog = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: Object.values(STATUS),
    },
    updateDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    updateBy: {
      name: String,
      role: {
        type: String,
        enum: Object.values(ROLE),
      },
    },
  },
  {
    timestamp: false,
    versionKey: false,
    _id: false,
  }
);

const orderModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerInfo: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    receiverInfo: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    address: {
      province: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      detail: {
        type: String,
        required: true,
      },
    },
    items: [orderProductSchema],
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    status: {
      type: String,
      trim: true,
      default: STATUS.PENDING,
      enum: Object.values(STATUS),
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    canceled: {
      isCancel: {
        type: Boolean,
        default: false,
      },
      by: {
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.SYSTEM,
      },
      description: {
        type: String,
      },
    },
    orderLog: [orderStatusLog],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

orderModel.plugin(paginate);

const Order = mongoose.model("Order", orderModel);

module.exports = Order;
