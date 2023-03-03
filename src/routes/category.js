const express = require('express');
const { CatalogItem } = require('../models/schemas/catalogItem.schema');

class CategoryRouter {
    constructor() {
        this.router = express.Router();
        this.router.post('/', this.addCategory);
        this.router.put('/:id', this.updateCategory);
        this.router.delete('/:id', this.deleteCategory);
    }

    async addCategory(req, res, next) {
        try {
            const catalogItem = new CatalogItem(req.body);
            const savedCatalogItem = await catalogItem.save();
            res.status(201).json(savedCatalogItem);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req, res, next) {
        try {
            const updatedCatalogItem = await CatalogItem.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedCatalogItem) {
                return res.sendStatus(404);
            }
            res.json(updatedCatalogItem);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const deletedCatalogItem = await CatalogItem.findByIdAndDelete(req.params.id);
            if (!deletedCatalogItem) {
                return res.sendStatus(404);
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryRouter().router;
