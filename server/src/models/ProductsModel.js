const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeProduct",
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    variants: [
        {
            color: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            countInStock: {
                type: Number,
                required: true,
                min: 0
            },
        }
    ],
    description: {
        type: String,
        // required: true,
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;