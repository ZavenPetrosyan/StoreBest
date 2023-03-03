const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    imageUrl: { type: String, required: true }
});

const CatalogItem = mongoose.model('CatalogItem', catalogItemSchema);

module.exports = { CatalogItem };
