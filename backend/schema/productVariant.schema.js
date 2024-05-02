const mongoose = require('mongoose');

const ProductVariantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    standard_price: {
        type: Number,
        required: true
    },
    templateId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductTemplate',
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ProductVariant", ProductVariantSchema);
