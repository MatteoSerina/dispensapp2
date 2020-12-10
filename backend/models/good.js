const mongoose = require('mongoose');
const itemSchema = require('./item');

const goodSchema = new mongoose.Schema({
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    userId: { type: String, required: false },
    items: [itemSchema.itemSchema]
})

module.exports = mongoose.model('Good', goodSchema);