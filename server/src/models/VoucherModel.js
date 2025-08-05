const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    createdBy: {
      type: String,
      default: 'Admin',
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },
    applicableCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeProduct',
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'used'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Voucher', voucherSchema);
