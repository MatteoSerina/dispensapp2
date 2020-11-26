const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    barcode: { type: String, required: true },
    category: { type: String, required: true },
    itemsPerPackage: { type: Number, required: true, default: 1 }
})

module.exports = mongoose.model('Template', templateSchema);