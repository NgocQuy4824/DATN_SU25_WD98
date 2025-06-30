const mongoose = require('mongoose');

const cartModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            variant: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            _id: false,
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

const Cart = mongoose.model('Cart', cartModel);

module.exports = Cart;
