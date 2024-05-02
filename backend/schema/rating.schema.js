const mongoose = require('mongoose');


const RatingSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    variantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Rating", RatingSchema);