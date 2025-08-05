const mongoose = require('mongoose');

const myVoucherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'used', 'expired'],
      default: 'active',
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MyVoucher', myVoucherSchema);
