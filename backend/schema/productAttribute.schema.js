const mongoose = require('mongoose');

const ProductAttributeSchema = new mongoose.Schema({
    variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    },
    templete_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplate',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ProductAttribute", ProductAttributeSchema);
