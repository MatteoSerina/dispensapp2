const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    barcode: { type: String, required: true },
    category: { type: String, required: true },
    itemsPerPackage: { type: Number, required: true, default: 1 },
    imageUrl:{ type: String, required: false }
})

module.exports = mongoose.model('Template', templateSchema);