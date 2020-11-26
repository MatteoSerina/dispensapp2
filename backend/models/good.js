const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    userId: { type: String, required: false }
})

module.exports = mongoose.model('Good', goodSchema);