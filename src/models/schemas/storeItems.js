const mongoose = require('mongoose');

const catalogItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableCount: {
        type: Number,
        required: true
    }
});


module.exports = {
    CatalogItem: mongoose.model('CatalogItem', catalogItemSchema),
};
