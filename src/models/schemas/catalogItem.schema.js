const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: Array },
    imageUrls: { type: Array },
    avaliableCount: { type: Number, default: 0 },
});
const CatalogItem = mongoose.model('CatalogItem', catalogItemSchema);

module.exports = { CatalogItem };
