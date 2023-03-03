const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CatalogItem' }]
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = { Catalog };
