const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    barcode: { type: String, required: true },
    itemsPerPackage: { type: Number, required: true, default: 1 },
    imageUrl:{ type: String, required: false },
})

module.exports = mongoose.model('Item', itemSchema);
module.exports.itemSchema = itemSchema;