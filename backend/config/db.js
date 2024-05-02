const mongoose = require('mongoose');
const db = mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

module.exports = db