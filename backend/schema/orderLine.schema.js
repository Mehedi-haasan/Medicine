const mongoose = require('mongoose');

const OrderLineSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("OrderLine", OrderLineSchema);
