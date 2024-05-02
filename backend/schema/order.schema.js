const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true
    },
    variantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    coupon:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);
