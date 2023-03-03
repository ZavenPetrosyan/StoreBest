const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    currency: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: String },
    imageUrls: { type: Number },
    avaliable_count: { type: Number, default: 0 },
});
const CatalogItem = mongoose.model('CatalogItem', catalogItemSchema);

module.exports = { CatalogItem };
